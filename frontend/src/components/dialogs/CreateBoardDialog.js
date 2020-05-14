import React, { useState } from "react";
import { nanoid } from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  withMobileDialog,
  withStyles,
} from "@material-ui/core";

import RetroFormatSelect from "./RetroFormatSelect";
import { defaultBoard, validateInput, postData } from "../../utils";
import { CREATE_BOARD_BUTTON } from "../../constants/testIds";
import { BOARD_NAME_TOO_LONG_MSG } from "../../constants/errorMessages";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

function CreateBoardDialog(props) {
  const { classes, fullScreen, history } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const input = validateInput(title.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function resetState() {
    setOpen(false);
    setTitle("");
  }

  function renderError() {
    if (input.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {BOARD_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  // TODO: handle else case
  function navigateToBoard(response, boardId) {
    if (response.ok) {
      history.push({
        pathname: `/boards/${boardId}`,
        state: { isModerator: true },
      });
    }
  }

  async function handleSubmit() {
    const boardId = nanoid();
    const newBoard = { ...defaultBoard, boardId, title, format };
    const response = await postData("/api/boards/", newBoard);
    resetState();
    navigateToBoard(response, boardId);
  }

  return (
    <>
      <Fab
        size="medium"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
        data-testid={CREATE_BOARD_BUTTON}
      >
        <AddIcon className={classes.icon} />
        New Board
      </Fab>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide a name for your new board.</DialogContentText>
          <TextField
            required
            autoFocus
            fullWidth
            value={title}
            onChange={handleTitleChange}
            error={input.isTooLong}
            helperText={renderError()}
            id="board-name"
            label="Board Name"
            type="text"
            margin="dense"
            autoComplete="off"
          />
          <RetroFormatSelect onFormatChange={setFormat} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!input.isValid}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default compose(withRouter, withMobileDialog(), withStyles(styles))(CreateBoardDialog);
