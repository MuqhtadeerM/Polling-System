import { Request, Response } from "express";
import { PollService } from "../services/poll.service";
import { Poll } from "../modules/poll/poll.model";

// this will fetch the active polls
export const getActivePoll = async (req: Request, res: Response) => {
  try {
    const poll = await PollService.getActivePoll();

    res.json({
      poll,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

// create the active poll
export const createPoll = async (req: Request, res: Response) => {
  try {
    // Check if an active poll already exists BEFORE creating
    const existingPoll = await Poll.findOne({ status: "ACTIVE" });
    if (existingPoll) {
      return res.status(400).json({
        message: "Active Poll Already Exists",
      });
    }

    // If no active poll exists, create a new one
    const poll = await PollService.createPoll(req.body);
    res.status(201).json(poll);
  } catch (error: any) {
    console.error("Error creating poll:", error); // Add logging to see actual error
    res.status(500).json({
      message: error.message || "Failed to create poll",
    });
  }
};

// end poll
export const endPoll = async (req: Request, res: Response) => {
  try {
    const pollId = req.params.pollId as string;

    const poll = await PollService.endPoll(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.json({
      message: "Poll ended successfully",
      poll,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// fetch Poll history
export const getPollHistory = async (req: Request, res: Response) => {
  try {
    const polls = await PollService.getPollHistory();
    res.json({ polls });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch poll history",
    });
  }
};
