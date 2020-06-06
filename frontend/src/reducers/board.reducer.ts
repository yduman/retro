import {
  SET_FOCUSED_CARD,
  REMOVE_FOCUSED_CARD,
  SET_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_VOTE_YES,
  CONTINUE_DISCUSSION_VOTE_NO,
  CONTINUE_DISCUSSION_VOTE_ABSTAIN,
} from "../actions/board.actions";
import { BoardState, BoardAction } from "../types/context.types";

export const reducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case SET_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: action.payload?.focusedCard as string,
      };
    case REMOVE_FOCUSED_CARD:
      return {
        ...state,
        focusedCard: "",
      };
    case SET_CONTINUE_DISCUSSION:
      return {
        ...state,
        showContinueDiscussion: action.payload?.isToggled as boolean,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          yes: 0,
          no: 0,
          abstain: 0,
        },
      };
    case CONTINUE_DISCUSSION_VOTE_YES:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          yes: state.continueDiscussionVotes.yes += 1,
        },
      };
    case CONTINUE_DISCUSSION_VOTE_NO:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          no: state.continueDiscussionVotes.no += 1,
        },
      };
    case CONTINUE_DISCUSSION_VOTE_ABSTAIN:
      return {
        ...state,
        continueDiscussionVotes: {
          ...state.continueDiscussionVotes,
          abstain: state.continueDiscussionVotes.abstain += 1,
        },
      };
    default:
      return state;
  }
};
