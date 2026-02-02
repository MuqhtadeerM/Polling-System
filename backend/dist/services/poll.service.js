"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollService = void 0;
const poll_model_1 = require("../modules/poll/poll.model");
const vote_model_1 = require("../modules/poll/vote.model");
const times_1 = require("../utils/times");
const voteWindow_1 = require("../utils/voteWindow");
class PollService {
    // end the poll
    static async endPoll(pollId) {
        const poll = await poll_model_1.Poll.findById(pollId);
        if (!poll) {
            throw new Error("Poll not found");
        }
        // delete all votes related to this poll
        await vote_model_1.Vote.deleteMany({ pollId });
        // delete the poll itself
        await poll_model_1.Poll.findByIdAndDelete(pollId);
        return true;
    }
    // fetches the poll from db using pollid
    static async getPollById(pollId) {
        return poll_model_1.Poll.findById(pollId);
    }
    // this will accepts ida and index then submit only if it is between time
    static async submitVote(pollId, studentId, optionIndex) {
        // if he votes between 9 - 6 user allowed
        if (!(0, voteWindow_1.isWithinVotingHours)()) {
            throw new Error("Voting is Allowed only between 9 AM to 6 PM");
        }
        // basic validation
        if (!studentId) {
            throw new Error("Invalid student identity");
        }
        // poll must be active
        const poll = await poll_model_1.Poll.findById(pollId);
        if (!poll || poll.status !== "ACTIVE") {
            throw new Error("Poll is not active");
        }
        // data integrity
        if (optionIndex < 0 || optionIndex >= poll.options.length) {
            throw new Error("Invalid option selected");
        }
        // save the vote
        await vote_model_1.Vote.create({
            pollId,
            studentId,
            optionIndex,
        });
        // increament vote
        await poll_model_1.Poll.updateOne({ _id: pollId }, { $inc: { [`options.${optionIndex}.votes`]: 1 } });
    }
    // fetches the active polls
    static async getActivePoll() {
        return poll_model_1.Poll.findOne({ status: "ACTIVE" });
    }
    // fetches the active polls with time
    static async getActivePollWithTime() {
        const poll = await poll_model_1.Poll.findOne({ status: "ACTIVE" });
        // checks the poll exist or not
        if (!poll) {
            return null;
        }
        // gets the remaining time...
        const remainingTime = (0, times_1.getRemainingTime)(poll.startedAt, poll.duration);
        return {
            poll,
            remainingTime,
        };
    }
    // create new poll
    static async createPoll(data) {
        const existingPoll = await poll_model_1.Poll.findOne({ status: "ACTIVE" });
        // checks the poll exists or not
        if (existingPoll) {
            throw new Error("Active poll already exists");
        }
        return poll_model_1.Poll.create({
            question: data.question,
            options: data.options.map((o) => ({ text: o })),
            duration: data.duration,
            startedAt: new Date(),
        });
    }
    // fetch poll history
    static async getPollHistory() {
        return poll_model_1.Poll.find({ status: "COMPLETED" }).sort({ updatedAt: -1 });
    }
}
exports.PollService = PollService;
