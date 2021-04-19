import { Server, Socket } from "socket.io";
import {
  updateBoard,
  joinBoard,
  unblurCards,
  setMaxVotes,
  resetVotes,
  toggleContinueDiscussion,
  voteYes,
  voteNo,
  voteAbstain,
} from "./board-events";
import {
  toggleColumnBlur,
  createColumn,
  deleteColumn,
  sortColumn,
  editColumn,
} from "./column-events";
import {
  createCard,
  editCard,
  deleteCard,
  voteCard,
  focusCard,
  removeFocusCard,
  markAsDiscussedCard,
} from "./card-events";
import {
  joinPoker,
  joinPokerSession,
  showPokerResults,
  setPokerStory,
  setPokerVote,
  resetPoker,
  setPokerUnit,
} from "./poker-events";

export function boardEvents(io: Server, client: Socket, roomId: string): void {
  joinBoard(io, client);
  updateBoard(io, client, roomId);
  unblurCards(io, client, roomId);
  setMaxVotes(io, client, roomId);
  resetVotes(io, client, roomId);
  toggleContinueDiscussion(io, client, roomId);
  voteYes(io, client, roomId);
  voteNo(io, client, roomId);
  voteAbstain(io, client, roomId);
}

export function columnEvents(io: Server, client: Socket, roomId: string): void {
  createColumn(io, client, roomId);
  toggleColumnBlur(io, client, roomId);
  deleteColumn(io, client, roomId);
  sortColumn(io, client, roomId);
  editColumn(io, client, roomId);
}

export function cardEvents(io: Server, client: Socket, roomId: string): void {
  createCard(io, client, roomId);
  editCard(io, client, roomId);
  deleteCard(io, client, roomId);
  markAsDiscussedCard(io, client, roomId);
  voteCard(io, client, roomId);
  focusCard(io, client, roomId);
  removeFocusCard(io, client, roomId);
}

export function pokerEvents(io: Server, client: Socket, roomId: string): void {
  joinPoker(io, client);
  joinPokerSession(io, client, roomId);
  showPokerResults(io, client, roomId);
  setPokerStory(io, client, roomId);
  setPokerVote(io, client, roomId);
  resetPoker(io, client, roomId);
  setPokerUnit(io, client, roomId);
}
