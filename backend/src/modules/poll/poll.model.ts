import { Schema, model } from "mongoose";

const PollSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

export const Poll = model("Poll", PollSchema);
