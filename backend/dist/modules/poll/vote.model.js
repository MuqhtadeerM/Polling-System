"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const mongoose_1 = require("mongoose");
// vote structure of mongodb collection
const VoteSchema = new mongoose_1.Schema({
    pollId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Poll",
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    optionIndex: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
// prevent  the multiple votes from same student
VoteSchema.index({ pollId: 1, studentId: 1 }, { unique: true });
exports.Vote = (0, mongoose_1.model)("Vote", VoteSchema);
