import { Server, Socket } from "socket.io";
import { PollService } from "../services/poll.service";

export const pollSocketHandler = (io: Server, socket: Socket) => {
  // Teachers creates poll
  socket.on("teacher:createPoll", async (data) => {
    try {
      const poll = await PollService.createPoll(data);

      // send the poll to every one teacher and student
      io.emit("poll:started", poll);
    } catch (error: any) {
      socket.emit("poll:error", error.message);
    }
  });

  // teacher end poll
  socket.on("teacher:endPoll", async (pollId) => {
    try {
      const endedPoll = await PollService.endPoll(pollId);
      io.emit("poll:ended", endedPoll);
    } catch (error: any) {
      socket.emit("poll:error", error.message);
    }
  });

  // students vote poll
  socket.on("student:vote", async (data) => {
    try {
      await PollService.submitVote(
        data.pollId,
        data.studentId,
        data.optionIndex,
      );

      // fetches updated poll
      const updatedPoll = await PollService.getPollById(data.pollId);

      // send the latest results
      io.emit("poll:updated", updatedPoll);
    } catch (error: any) {
      socket.emit("vote:error", error.message);
    }
  });
};
