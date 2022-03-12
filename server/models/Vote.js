import { model, Schema, Types } from "mongoose";

const Vote = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    idPost: { type: Types.ObjectId, required: true },
    vote: {
      type: String,
      enum: ["UP", "DOWN"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);
Vote.index({ author: 1, post: 1 });

module.exports = model("Vote", Vote);
