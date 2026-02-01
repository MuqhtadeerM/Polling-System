import { model, Schema } from "mongoose";

// vote structure of mongodb collection
const VoteSchema = new Schema(
  {
    pollId: {
      type: Schema.Types.ObjectId,
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
  },

  { timestamps: true },
);

// prevent  the multiple votes from same student
VoteSchema.index({ pollId: 1, studentId: 1 }, { unique: true });

export const Vote = model("Vote", VoteSchema);
