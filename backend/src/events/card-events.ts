import { Server, Socket } from "socket.io";
import fs from "fs";
import unset from "lodash/unset";
import forIn from "lodash/forIn";
import pull from "lodash/pull";

import { RetroItem } from "../models/RetroItem";
import { getPath, getRetroBoard, stringify, logError } from "../utils";
import {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  VOTE_CARD,
  FOCUS_CARD,
  REMOVE_FOCUS_CARD,
  UPDATE_BOARD,
  BOARD_ERROR,
  MARK_CARD_DISCUSSED,
} from "./event-names";

const UTF8 = "utf8";

export function createCard(io: Server, client: Socket, roomId: string): void {
  client.on(
    CREATE_CARD,
    (card: RetroItem, columnId: string, boardId: string) => {
      const path = getPath(boardId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(CREATE_CARD, error);
        const board = getRetroBoard(file);

        if (board === null) {
          client.emit(BOARD_ERROR);
        } else {
          const { author, content } = card;

          card.isBlurred = board.isBlurred;
          card.author = author.trim();
          card.content = content.trim();
          board.items[card.id] = card;
          board.columns[columnId].itemIds.push(card.id);

          fs.writeFile(path, stringify(board), UTF8, error => {
            if (error) logError(CREATE_CARD, error);
            io.to(roomId).emit(UPDATE_BOARD, board);
          });
        }
      });
    }
  );
}

export function deleteCard(io: Server, client: Socket, roomId: string): void {
  client.on(DELETE_CARD, (cardId: string, boardId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(DELETE_CARD, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        unset(board.items, cardId);
        forIn(board.columns, col => pull(col.itemIds, cardId));

        fs.writeFile(path, stringify(board), UTF8, error => {
          if (error) logError(DELETE_CARD, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function editCard(io: Server, client: Socket, roomId: string): void {
  client.on(
    EDIT_CARD,
    (author: string, content: string, cardId: string, boardId: string) => {
      const path = getPath(boardId);
      fs.readFile(path, UTF8, (error, file: string) => {
        if (error) logError(EDIT_CARD, error);
        const board = getRetroBoard(file);

        if (board === null) {
          client.emit(BOARD_ERROR);
        } else {
          const card = board.items[cardId];

          card.author = author.trim();
          card.content = content.trim();

          fs.writeFile(path, stringify(board), UTF8, error => {
            if (error) logError(EDIT_CARD, error);
            io.to(roomId).emit(UPDATE_BOARD, board);
          });
        }
      });
    }
  );
}

export function voteCard(io: Server, client: Socket, roomId: string): void {
  client.on(VOTE_CARD, (cardId: string, boardId: string, isUpvote: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(VOTE_CARD, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        if (isUpvote) board.items[cardId].points += 1;
        else board.items[cardId].points -= 1;

        fs.writeFile(path, stringify(board), UTF8, error => {
          if (error) logError(VOTE_CARD, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function markAsDiscussedCard(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(MARK_CARD_DISCUSSED, (cardId: string, boardId: string) => {
    const path = getPath(boardId);
    fs.readFile(path, UTF8, (error, file: string) => {
      if (error) logError(MARK_CARD_DISCUSSED, error);
      const board = getRetroBoard(file);

      if (board === null) {
        client.emit(BOARD_ERROR);
      } else {
        const card = board.items[cardId];

        card.isDiscussed = !card.isDiscussed;

        fs.writeFile(path, stringify(board), UTF8, error => {
          if (error) logError(MARK_CARD_DISCUSSED, error);
          io.to(roomId).emit(UPDATE_BOARD, board);
        });
      }
    });
  });
}

export function focusCard(io: Server, client: Socket, roomId: string): void {
  client.on(FOCUS_CARD, (cardId: string) => {
    io.to(roomId).emit(FOCUS_CARD, cardId);
  });
}

export function removeFocusCard(
  io: Server,
  client: Socket,
  roomId: string
): void {
  client.on(REMOVE_FOCUS_CARD, () => {
    io.to(roomId).emit(REMOVE_FOCUS_CARD);
  });
}
