"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = void 0;
const mongoose_1 = require("mongoose");
const PollSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [
        {
            text: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
    duration: {
        type: Number,
        required: true,
    },
    startedAt: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED"],
        default: "ACTIVE",
    },
}, { timestamps: true });
exports.Poll = (0, mongoose_1.model)("Poll", PollSchema);
