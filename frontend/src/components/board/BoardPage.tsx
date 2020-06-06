import React, { useState, useEffect, useContext } from "react";
import isEqual from "lodash/isEqual";
import { Grid, makeStyles } from "@material-ui/core";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Redirect, useLocation, useRouteMatch } from "react-router-dom";

import AppHeader from "./header/AppHeader";
import BoardHeader from "./BoardHeader";
import Columns from "./columns/Columns";
import VoteCountSnackbar from "./VoteCountSnackbar";
import Dialogs from "./dialogs/Dialogs";
import CreateItemDialog from "./dialogs/CreateItemDialog";
import DeleteItemDialog from "./dialogs/DeleteItemDialog";
import DeleteColumnDialog from "./dialogs/DeleteColumnDialog";
import EditItemDialog from "./dialogs/EditItemDialog";
import EditColumnDialog from "./dialogs/EditColumnDialog";
import MergeCardsDialog from "./dialogs/MergeCardsDialog";

import { FlexContainer } from "../styled-components";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";
import { RetroBoard } from "../../types/common.types";
import { defaultBoard, isSameColumn, isSamePosition } from "../../utils";
import {
  ROLE_MODERATOR,
  ROLE_PARTICIPANT,
  getUser,
} from "../../utils/user.utils";
import {
  handleCombine,
  handleColumnDrag,
  handleInsideColumnDrag,
  handleNormalDrag,
} from "../../utils/dnd-handler.utils";
import {
  CONNECT,
  UPDATE_BOARD,
  JOIN_BOARD,
  JOIN_ERROR,
  SET_MAX_VOTES,
  RESET_VOTES,
  FOCUS_CARD,
  REMOVE_FOCUS_CARD,
  SHOW_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_YES,
  CONTINUE_DISCUSSION_ABSTAIN,
  CONTINUE_DISCUSSION_NO,
  BOARD_ERROR,
} from "../../constants/event.constants";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

// stores the current result of a combine
let combineResult: DropResult;

export default function BoardPage() {
  const [board, setBoard] = useState(defaultBoard as RetroBoard);
  const [isSnackbarOpen, setSnackbar] = useState(false);
  const [isMergeDialogOpen, setMergeDialog] = useState(false);
  const [merge, setMerge] = useState(false);
  const {
    boardId,
    socket,
    setFocusedCard,
    removeFocusedCard,
    toggleContinueDiscussion,
    voteYes,
    voteNo,
    voteAbstain,
  } = useContext(BoardContext);
  const {
    createModerator,
    createParticipant,
    setMaxVote,
    resetVotes,
  } = useContext(UserContext);
  const classes = useStyles();
  const location = useLocation();
  const match = useRouteMatch();

  // set tab name
  useEffect(() => {
    document.title = `Retro | ${board.title}`;

    return () => {
      document.title = "Retro";
    };
  }, [board.title]);

  useEffect(() => {
    // pull state, when navigating back and forth
    if (isEqual(board, defaultBoard) && match.isExact) {
      socket.emit(JOIN_BOARD, boardId);
    }

    socket.on(CONNECT, () => {
      socket.emit(JOIN_BOARD, boardId);
    });

    socket.on(BOARD_ERROR, () => {
      setBoard({ ...board, error: true });
    });

    socket.on(JOIN_BOARD, (boardData: RetroBoard) => {
      const { boardId, maxVoteCount } = boardData;
      if (location.state && getUser(boardId) === null) {
        createModerator(boardId, ROLE_MODERATOR, maxVoteCount);
      } else if (getUser(boardId) === null) {
        createParticipant(boardId, ROLE_PARTICIPANT, maxVoteCount);
      }

      setBoard(boardData);
    });

    socket.on(JOIN_ERROR, () => {
      setBoard({ ...board, error: true });
    });

    socket.on(UPDATE_BOARD, (newBoard: RetroBoard) => {
      setBoard(newBoard);
    });

    socket.on(SET_MAX_VOTES, (newBoard: RetroBoard) => {
      setMaxVote(boardId, newBoard.maxVoteCount);
      setBoard(newBoard);
      openSnackbar();
    });

    socket.on(RESET_VOTES, (newBoard: RetroBoard) => {
      resetVotes(boardId, newBoard.maxVoteCount);
      setBoard(newBoard);
      openSnackbar();
    });

    socket.on(FOCUS_CARD, (focusedCard: string) => {
      setFocusedCard(focusedCard);
    });

    socket.on(REMOVE_FOCUS_CARD, () => {
      removeFocusedCard();
    });

    socket.on(SHOW_CONTINUE_DISCUSSION, (isToggled: boolean) => {
      toggleContinueDiscussion(isToggled);
    });

    socket.on(CONTINUE_DISCUSSION_YES, () => {
      voteYes();
    });

    socket.on(CONTINUE_DISCUSSION_NO, () => {
      voteNo();
    });

    socket.on(CONTINUE_DISCUSSION_ABSTAIN, () => {
      voteAbstain();
    });

    return () => {
      // Pass nothing to remove all listeners on all events.
      socket.removeAllListeners();
    };

    // eslint-disable-next-line
  }, []);

  function openSnackbar() {
    setSnackbar(true);
  }

  function closeSnackbar() {
    setSnackbar(false);
  }

  function openMergeDialog() {
    setMergeDialog(true);
  }

  function closeMergeDialog() {
    setMergeDialog(false);
  }

  function startMerge() {
    setMerge(true);
  }

  function stopMerge() {
    setMerge(false);
  }

  if (merge) {
    handleCombine(board, combineResult, stopMerge, setBoard, socket);
  }

  function onDragEnd(dragResult: DropResult) {
    const { source, destination, type, combine } = dragResult;
    const { columns } = board;

    // store current dragResult and ask the user if he wants to merge
    if (combine) {
      combineResult = dragResult;
      openMergeDialog();
      return;
    }

    if (!destination) return;
    if (isSamePosition(source, destination)) return;
    if (type === "column") {
      handleColumnDrag(board, dragResult, setBoard, socket);
      return;
    }

    if (isSameColumn(columns, source, destination)) {
      handleInsideColumnDrag(board, dragResult, setBoard, socket);
      return;
    }

    handleNormalDrag(board, dragResult, setBoard, socket);
  }

  function renderBoard(board: RetroBoard) {
    const { columns, items, columnOrder } = board;
    return columnOrder.map((columnId, index) => {
      const column = columns[columnId];
      return (
        <Columns
          key={column.id}
          column={column}
          itemMap={items}
          index={index}
          openSnackbar={openSnackbar}
        />
      );
    });
  }

  if (board.error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <>
      <AppHeader />
      <Grid container className={classes.root} direction="column">
        <BoardHeader title={board.title} />
        <Grid item xs={12}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="allColumns"
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <FlexContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {renderBoard(board)}
                  {provided.placeholder}
                </FlexContainer>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <VoteCountSnackbar
          id="vote-count-snackbar"
          open={isSnackbarOpen}
          handleClose={closeSnackbar}
          autoHideDuration={1000}
        />
        <MergeCardsDialog
          open={isMergeDialogOpen}
          closeDialog={closeMergeDialog}
          startMerge={startMerge}
          stopMerge={stopMerge}
        />
        <Dialogs>
          <DeleteItemDialog />
          <DeleteColumnDialog />
          <EditItemDialog />
          <EditColumnDialog />
          <CreateItemDialog />
        </Dialogs>
      </Grid>
    </>
  );
}
