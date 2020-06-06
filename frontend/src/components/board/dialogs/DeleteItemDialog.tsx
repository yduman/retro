import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { DialogsContext } from "../../../context/DialogContext";
import { DELETE_CARD } from "../../../constants/event.constants";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

export default function DeleteItemDialog() {
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeDeleteItemDialog } = useContext(DialogsContext);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function handleClick() {
    socket.emit(DELETE_CARD, dialogsState.itemId, boardId);
    closeDeleteItemDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isDeleteItemDialogOpen}
      onClose={closeDeleteItemDialog}
      aria-labelledby="alert-delete-card-dialog"
      aria-describedby="alert-delete-card-dialog-description"
    >
      <DialogTitle id="alert-delete-card-dialog">
        {"Delete this card?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-card-dialog-description">
          You are about to delete this card!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteItemDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          className={classes.deleteButton}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
