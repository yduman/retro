const mongoose = require("mongoose");

let BoardSchema = new mongoose.Schema({
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

BoardSchema.statics.findByBoardId = function (boardId) {
  let Board = this;
  return Board.findOne({ boardId }).then((board) => {
    if (!board) {
      return Promise.reject(
        new Error(`Could not find board by the provided ID=${boardId}"`)
      );
    }
    return new Promise((resolve) => {
      resolve(board);
    });
  });
};

const Board = mongoose.model("Board", BoardSchema);
module.exports = { Board };
