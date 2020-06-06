import React, { useReducer } from "react";
import { useParams } from "react-router-dom";

import { reducer } from "../reducers/user.reducer";
import {
  getUser,
  setVotedItem,
  setUser,
  setMaxVoteCountAndReset,
  createRole,
  ROLE_MODERATOR,
  ROLE_PARTICIPANT,
} from "../utils/user.utils";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET,
  SET_NAME,
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
} from "../actions/user.actions";
import { UserContextValues } from "../types/context.types";

type UserContextProviderProps = {
  children?: React.ReactNode;
};

function getInitialState(boardId: string) {
  const userObject = getUser(boardId);

  if (userObject !== null) {
    return userObject;
  }

  return {};
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = React.createContext<UserContextValues>(undefined!);

export default function UserContextProvider(props: UserContextProviderProps) {
  const { boardId } = useParams();
  const [userState, dispatch] = useReducer(reducer, getInitialState(boardId));

  function upvoteCard(boardId: string, cardId: string, votesLeft: number) {
    dispatch({ type: UPVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, true);
    setUser("votesLeft", votesLeft - 1, boardId);
  }

  function downvoteCard(boardId: string, cardId: string, votesLeft: number) {
    dispatch({ type: DOWNVOTE, payload: { cardId } });
    setVotedItem(cardId, boardId, false);
    setUser("votesLeft", votesLeft + 1, boardId);
  }

  function setMaxVote(boardId: string, maxVoteCount: number) {
    dispatch({ type: SET_MAX_VOTE, payload: { maxVoteCount } });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  }

  function resetVotes(boardId: string, maxVoteCount: number) {
    dispatch({ type: RESET });
    setMaxVoteCountAndReset(maxVoteCount, boardId);
  }

  function setUsername(boardId: string, name: string) {
    dispatch({ type: SET_NAME, payload: { name } });
    setUser("name", name, boardId);
  }

  function createModerator(
    boardId: string,
    role: string,
    maxVoteCount: number
  ) {
    dispatch({ type: CREATE_MODERATOR, payload: { role, maxVoteCount } });
    createRole(ROLE_MODERATOR, boardId, maxVoteCount);
  }

  function createParticipant(
    boardId: string,
    role: string,
    maxVoteCount: number
  ) {
    dispatch({ type: CREATE_PARTICIPANT, payload: { role, maxVoteCount } });
    createRole(ROLE_PARTICIPANT, boardId, maxVoteCount);
  }

  const value = {
    userState,
    upvoteCard,
    downvoteCard,
    setMaxVote,
    resetVotes,
    setUsername,
    createModerator,
    createParticipant,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
