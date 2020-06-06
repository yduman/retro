import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import { reducer } from "../reducers/board.reducer";
import { BACKEND_ENDPOINT } from "../utils";
import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_VOTE_YES,
  CONTINUE_DISCUSSION_VOTE_NO,
  CONTINUE_DISCUSSION_VOTE_ABSTAIN,
} from "../actions/board.actions";
import { BoardContextValues } from "../types/context.types";

type BoardContextProviderProps = {
  children?: React.ReactNode;
};

const initialState = {
  focusedCard: "",
  showContinueDiscussion: false,
  continueDiscussionVotes: {
    yes: 0,
    no: 0,
    abstain: 0,
  },
};

let socket: SocketIOClient.Socket;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const BoardContext = React.createContext<BoardContextValues>(undefined!);

export default function BoardContextProvider(props: BoardContextProviderProps) {
  const { boardId } = useParams();
  const [boardState, dispatch] = useReducer(reducer, initialState);

  if (!socket) {
    socket = io(BACKEND_ENDPOINT, { query: "boardId=" + boardId });
  }

  function setFocusedCard(focusedCard: string) {
    dispatch({ type: SET_FOCUSED_CARD, payload: { focusedCard } });
  }

  function removeFocusedCard() {
    dispatch({ type: REMOVE_FOCUSED_CARD });
  }

  function toggleContinueDiscussion(isToggled: boolean) {
    dispatch({ type: SET_CONTINUE_DISCUSSION, payload: { isToggled } });
  }

  function voteYes() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_YES });
  }

  function voteNo() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_NO });
  }

  function voteAbstain() {
    dispatch({ type: CONTINUE_DISCUSSION_VOTE_ABSTAIN });
  }

  const value = {
    boardId,
    boardState,
    socket,
    setFocusedCard,
    removeFocusedCard,
    toggleContinueDiscussion,
    voteYes,
    voteNo,
    voteAbstain,
  };

  return (
    <BoardContext.Provider value={value}>
      {props.children}
    </BoardContext.Provider>
  );
}
