const fs = require("fs");

const { Board } = require("../models/board.model");
const { getPath, getBoard, stringify, logError } = require("../utils");
const {
  UPDATE_BOARD,
  JOIN_BOARD,
  UNBLUR_CARDS,
  JOIN_ERROR,
  SET_MAX_VOTES,
  RESET_VOTES,
  SHOW_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_YES,
  CONTINUE_DISCUSSION_NO,
  CONTINUE_DISCUSSION_ABSTAIN,
  BOARD_ERROR,
} = require("./event-names");

const UTF8 = "utf8";

const joinBoard = (io, client) => {
  client.on(JOIN_BOARD, async (boardId) => {
    try {
      const board = await Board.findByBoardId(boardId);
      client.emit(JOIN_BOARD, board);
    } catch (error) {
      client.emit(JOIN_ERROR);
    }
  });
};

const updateBoard = (io, client, roomId) => {
  client.on(UPDATE_BOARD, (board, boardId) => {
    fs.writeFile(getPath(boardId), stringify(board), UTF8, (error) => {
      if (error) logError(UPDATE_BOARD, error);
      io.to(roomId).emit(UPDATE_BOARD, board);
    });
  });
};

const unblurCards = (io, client, roomId) => {
  client.on(UNBLUR_CARDS, (boardId) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(UNBLUR_CARDS, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.isBlurred = !board.isBlurred;
        for (let cardId in board.items) {
          board.items[cardId].isBlurred = board.isBlurred;
        }
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(UNBLUR_CARDS, error);
        io.to(roomId).emit(UPDATE_BOARD, board);
      });
    });
  });
};

const setMaxVotes = (io, client, roomId) => {
  client.on(SET_MAX_VOTES, (voteCount, boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(SET_MAX_VOTES, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.maxVoteCount = voteCount;
        for (let cardId in board.items) {
          board.items[cardId].points = 0;
        }
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(SET_MAX_VOTES, error);
        io.to(roomId).emit(SET_MAX_VOTES, board);
      });
    });
  });
};

const resetVotes = (io, client, roomId) => {
  client.on(RESET_VOTES, (boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(RESET_VOTES, error);
      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        for (let cardId in board.items) {
          board.items[cardId].points = 0;
        }
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(RESET_VOTES, error);
        io.to(roomId).emit(RESET_VOTES, board);
      });
    });
  });
};

const toggleContinueDiscussion = (io, client, roomId) => {
  client.on(SHOW_CONTINUE_DISCUSSION, (boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(SHOW_CONTINUE_DISCUSSION, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.showContinueDiscussion = !board.showContinueDiscussion;
        board.continueDiscussionVotes.yes = 0;
        board.continueDiscussionVotes.no = 0;
        board.continueDiscussionVotes.abstain = 0;
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(SHOW_CONTINUE_DISCUSSION, error);
        io.to(roomId).emit(
          SHOW_CONTINUE_DISCUSSION,
          board.showContinueDiscussion
        );
      });
    });
  });
};

const voteYes = (io, client, roomId) => {
  client.on(CONTINUE_DISCUSSION_YES, (boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(CONTINUE_DISCUSSION_YES, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.yes += 1;
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(CONTINUE_DISCUSSION_YES, error);
        io.to(roomId).emit(CONTINUE_DISCUSSION_YES);
      });
    });
  });
};

const voteNo = (io, client, roomId) => {
  client.on(CONTINUE_DISCUSSION_NO, (boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(CONTINUE_DISCUSSION_NO, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.no += 1;
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(CONTINUE_DISCUSSION_NO, error);
        io.to(roomId).emit(CONTINUE_DISCUSSION_NO);
      });
    });
  });
};

const voteAbstain = (io, client, roomId) => {
  client.on(CONTINUE_DISCUSSION_ABSTAIN, (boardId) => {
    const path = getPath(boardId);

    fs.readFile(path, UTF8, (error, file) => {
      if (error) logError(CONTINUE_DISCUSSION_ABSTAIN, error);

      const board = getBoard(file);
      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        board.continueDiscussionVotes.abstain += 1;
      }

      fs.writeFile(path, stringify(board), UTF8, (error) => {
        if (error) logError(CONTINUE_DISCUSSION_ABSTAIN, error);
        io.to(roomId).emit(CONTINUE_DISCUSSION_ABSTAIN);
      });
    });
  });
};

module.exports = {
  updateBoard,
  joinBoard,
  unblurCards,
  setMaxVotes,
  resetVotes,
  toggleContinueDiscussion,
  voteYes,
  voteNo,
  voteAbstain,
};
