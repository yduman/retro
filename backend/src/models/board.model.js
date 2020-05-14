const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  boardId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
  },
  format: String,
  items: [
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      author: {
        type: String,
        trim: true,
      },
      content: {
        type: String,
        trim: true,
      },
      points: {
        type: Number,
        min: 0,
      },
      isBlurred: Boolean,
    },
  ],
  columns: [
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      columnTitle: {
        type: String,
        trim: true,
      },
      itemIds: [String],
    },
  ],
  columnOrder: [String],
  error: Boolean,
  isBlurred: Boolean,
  maxVoteCount: Number,
  showContinueDiscussion: Boolean,
  continueDiscussionVotes: {
    yes: Number,
    no: Number,
    abstain: Number,
  },
});

const Board = mongoose.model("Board", BoardSchema);
module.exports = { Board };
