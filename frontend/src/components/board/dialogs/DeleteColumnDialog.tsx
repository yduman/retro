import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { DELETE_COLUMN } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";
import { DialogsContext } from "../../../context/DialogContext";

export default function DeleteColumnDialog() {
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeDeleteColumnDialog } = useContext(DialogsContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  function handleClick() {
    socket.emit(DELETE_COLUMN, dialogsState.columnId, boardId);
    closeDeleteColumnDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isDeleteColumnDialogOpen}
      onClose={closeDeleteColumnDialog}
      aria-labelledby="alert-delete-column-dialog"
      aria-describedby="alert-delete-column-dialog-description"
    >
      <DialogTitle id="alert-delete-column-dialog">
        {"Delete this column?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-column-dialog-description">
          You are about to delete this column!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteColumnDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClick} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
