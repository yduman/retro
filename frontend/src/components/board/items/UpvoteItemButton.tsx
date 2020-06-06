import React, { useContext } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton, makeStyles } from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { VOTE_CARD } from "../../../constants/event.constants";

type UpvoteItemButtonProps = {
  id: string;
  openSnackbar: () => void;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function UpvoteItemButton(props: UpvoteItemButtonProps) {
  const { id, openSnackbar } = props;
  const { boardId, socket } = useContext(BoardContext);
  const { userState, upvoteCard } = useContext(UserContext);
  const classes = useStyles();

  function upVote() {
    const votesLeft = userState.votesLeft;

    if (votesLeft > 0) {
      socket.emit(VOTE_CARD, id, boardId, true);
      upvoteCard(boardId, id, votesLeft);
      openSnackbar();
    }
  }

  return (
    <IconButton className={classes.button} size="small" onClick={upVote}>
      <ThumbUpIcon fontSize="small" />
    </IconButton>
  );
}
