"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollSocketHandler = void 0;
const poll_service_1 = require("../services/poll.service");
const pollSocketHandler = (io, socket) => {
    // Teachers creates poll
    socket.on("teacher:createPoll", async (data) => {
        try {
            const poll = await poll_service_1.PollService.createPoll(data);
            // send the poll to every one teacher and student
            io.emit("poll:started", poll);
        }
        catch (error) {
            socket.emit("poll:error", error.message);
        }
    });
    // teacher end poll
    socket.on("teacher:endPoll", async (pollId) => {
        try {
            const endedPoll = await poll_service_1.PollService.endPoll(pollId);
            io.emit("poll:ended", endedPoll);
        }
        catch (error) {
            socket.emit("poll:error", error.message);
        }
    });
    // students vote poll
    socket.on("student:vote", async (data) => {
        try {
            await poll_service_1.PollService.submitVote(data.pollId, data.studentId, data.optionIndex);
            // fetches updated poll
            const updatedPoll = await poll_service_1.PollService.getPollById(data.pollId);
            // send the latest results
            io.emit("poll:updated", updatedPoll);
        }
        catch (error) {
            socket.emit("vote:error", error.message);
        }
    });
};
exports.pollSocketHandler = pollSocketHandler;
