import { Poll } from "../modules/poll/poll.model";
import { Vote } from "../modules/poll/vote.model";
import { getRemainingTime } from "../utils/times";
import { isWithinVotingHours } from "../utils/voteWindow";

export class PollService {
  // end the poll
  static async endPoll(pollId: string) {
    const poll = await Poll.findById(pollId);

    if (!poll) {
      throw new Error("Poll not found");
    }

    // delete all votes related to this poll
    await Vote.deleteMany({ pollId });

    // delete the poll itself
    await Poll.findByIdAndDelete(pollId);

    return true;
  }

  // fetches the poll from db using pollid
  static async getPollById(pollId: string) {
    return Poll.findById(pollId);
  }

  // this will accepts ida and index then submit only if it is between time
  static async submitVote(
    pollId: string,
    studentId: string,
    optionIndex: number,
  ) {
    // if he votes between 9 - 6 user allowed
    if (!isWithinVotingHours()) {
      throw new Error("Voting is Allowed only between 9 AM to 6 PM");
    }

    // basic validation
    if (!studentId) {
      throw new Error("Invalid student identity");
    }

    // poll must be active
    const poll = await Poll.findById(pollId);
    if (!poll || poll.status !== "ACTIVE") {
      throw new Error("Poll is not active");
    }

    // data integrity
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      throw new Error("Invalid option selected");
    }

    // save the vote
    await Vote.create({
      pollId,
      studentId,
      optionIndex,
    });

    // increament vote
    await Poll.updateOne(
      { _id: pollId },
      { $inc: { [`options.${optionIndex}.votes`]: 1 } },
    );
  }

  // fetches the active polls
  static async getActivePoll() {
    return Poll.findOne({ status: "ACTIVE" });
  }

  // fetches the active polls with time
  static async getActivePollWithTime() {
    const poll = await Poll.findOne({ status: "ACTIVE" });
    // checks the poll exist or not
    if (!poll) {
      return null;
    }

    // gets the remaining time...
    const remainingTime = getRemainingTime(poll.startedAt, poll.duration);
    return {
      poll,
      remainingTime,
    };
  }

  // create new poll
  static async createPoll(data: {
    question: string;
    options: string[];
    duration: number;
  }) {
    const existingPoll = await Poll.findOne({ status: "ACTIVE" });
    // checks the poll exists or not
    if (existingPoll) {
      throw new Error("Active poll already exists");
    }

    return Poll.create({
      question: data.question,
      options: data.options.map((o) => ({ text: o })),
      duration: data.duration,
      startedAt: new Date(),
    });
  }

  // fetch poll history
  static async getPollHistory() {
    return Poll.find({ status: "COMPLETED" }).sort({ updatedAt: -1 });
  }
}
