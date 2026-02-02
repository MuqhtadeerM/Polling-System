import { useState, useEffect } from "react";
import { Poll } from "../types";
import { socketService } from "../services/socket.service";
import { pollApi } from "../services/api.service";
import { getRemainingTime } from "../utils/helpers";

export const usePoll = () => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Fetch initial active poll
    const fetchActivePoll = async () => {
      const activePoll = await pollApi.getActivePoll();
      if (activePoll) {
        setPoll(activePoll);
        setTimeRemaining(
          getRemainingTime(activePoll.startedAt, activePoll.duration),
        );
      }
    };

    fetchActivePoll();

    // Socket listeners
    const handlePollStarted = (newPoll: Poll) => {
      setPoll(newPoll);
      setTimeRemaining(getRemainingTime(newPoll.startedAt, newPoll.duration));
      setError("");
    };

    const handlePollUpdated = (updatedPoll: Poll) => {
      setPoll(updatedPoll);
    };

    const handlePollEnded = (endedPoll: Poll) => {
      setPoll(endedPoll);
      setTimeRemaining(0);
    };

    const handlePollError = (errorMsg: string) => {
      setError(errorMsg);
    };

    const handleVoteError = (errorMsg: string) => {
      setError(errorMsg);
    };

    socketService.on("poll:started", handlePollStarted);
    socketService.on("poll:updated", handlePollUpdated);
    socketService.on("poll:ended", handlePollEnded);
    socketService.on("poll:error", handlePollError);
    socketService.on("vote:error", handleVoteError);

    return () => {
      socketService.off("poll:started", handlePollStarted);
      socketService.off("poll:updated", handlePollUpdated);
      socketService.off("poll:ended", handlePollEnded);
      socketService.off("poll:error", handlePollError);
      socketService.off("vote:error", handleVoteError);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!poll || poll.status !== "ACTIVE") return;

    const interval = setInterval(() => {
      const remaining = getRemainingTime(poll.startedAt, poll.duration);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [poll]);

  return {
    poll,
    timeRemaining,
    error,
    setError,
  };
};
