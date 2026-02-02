"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPollHistory = exports.endPoll = exports.createPoll = exports.getActivePoll = void 0;
const poll_service_1 = require("../services/poll.service");
const poll_model_1 = require("../modules/poll/poll.model");
// this will fetch the active polls
const getActivePoll = async (req, res) => {
    try {
        const poll = await poll_service_1.PollService.getActivePoll();
        res.json({
            poll,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch" });
    }
};
exports.getActivePoll = getActivePoll;
// create the active poll
const createPoll = async (req, res) => {
    try {
        // Check if an active poll already exists BEFORE creating
        const existingPoll = await poll_model_1.Poll.findOne({ status: "ACTIVE" });
        if (existingPoll) {
            return res.status(400).json({
                message: "Active Poll Already Exists",
            });
        }
        // If no active poll exists, create a new one
        const poll = await poll_service_1.PollService.createPoll(req.body);
        res.status(201).json(poll);
    }
    catch (error) {
        console.error("Error creating poll:", error); // Add logging to see actual error
        res.status(500).json({
            message: error.message || "Failed to create poll",
        });
    }
};
exports.createPoll = createPoll;
// end poll
const endPoll = async (req, res) => {
    try {
        const pollId = req.params.pollId;
        const poll = await poll_service_1.PollService.endPoll(pollId);
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }
        res.json({
            message: "Poll ended successfully",
            poll,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.endPoll = endPoll;
// fetch Poll history
const getPollHistory = async (req, res) => {
    try {
        const polls = await poll_service_1.PollService.getPollHistory();
        res.json({ polls });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch poll history",
        });
    }
};
exports.getPollHistory = getPollHistory;
