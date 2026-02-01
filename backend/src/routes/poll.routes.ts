import { Router } from "express";
import {
  createPoll,
  endPoll,
  getActivePoll,
  getPollHistory,
} from "../controller/poll.controller";

const router = Router();

router.get("/active", getActivePoll);

// create poll
router.post("/", createPoll);

// REST API
router.post("/:pollId/end", endPoll);

// hsitory api
router.get("/history", getPollHistory);

export default router;
