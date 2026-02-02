"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const poll_controller_1 = require("../controller/poll.controller");
const router = (0, express_1.Router)();
router.get("/active", poll_controller_1.getActivePoll);
// create poll
router.post("/", poll_controller_1.createPoll);
// REST API
router.post("/:pollId/end", poll_controller_1.endPoll);
// hsitory api
router.get("/history", poll_controller_1.getPollHistory);
exports.default = router;
