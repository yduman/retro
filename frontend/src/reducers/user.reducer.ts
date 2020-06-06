import { removeFirstOccurenceFromArray } from "../utils";
import { UserState, UserAction } from "../types/context.types";
import {
  UPVOTE,
  DOWNVOTE,
  SET_MAX_VOTE,
  RESET,
  SET_NAME,
  CREATE_MODERATOR,
  CREATE_PARTICIPANT,
} from "../actions/user.actions";

export const reducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case UPVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft - 1,
        votedItems: [...state.votedItems, action.payload?.cardId] as string[],
      };
    case DOWNVOTE:
      return {
        ...state,
        votesLeft: state.votesLeft + 1,
        votedItems: removeFirstOccurenceFromArray(
          state.votedItems,
          action.payload?.cardId as string
        ),
      };
    case SET_MAX_VOTE:
      return {
        ...state,
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
        votedItems: [],
      };
    case RESET:
      return {
        ...state,
        votesLeft: state.maxVoteCount,
        votedItems: [],
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload?.name as string,
      };
    case CREATE_MODERATOR:
      return {
        role: action.payload?.role as string,
        name: "",
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
        votedItems: [],
      };
    case CREATE_PARTICIPANT:
      return {
        role: action.payload?.role as string,
        name: "",
        maxVoteCount: action.payload?.maxVoteCount as number,
        votesLeft: action.payload?.maxVoteCount as number,
        votedItems: [],
      };
    default:
      return state;
  }
};
