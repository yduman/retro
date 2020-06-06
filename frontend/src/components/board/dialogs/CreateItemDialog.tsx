import React, { useState, useContext, useEffect } from "react";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { validateInput } from "../../../utils";
import { BoardContext } from "../../../context/BoardContext";
import { DialogsContext } from "../../../context/DialogContext";
import { CREATE_CARD } from "../../../constants/event.constants";
import {
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_TOO_LONG_MSG,
} from "../../../constants/error.constants";

export default function CreateItemDialog() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeCreateItemDialog } = useContext(DialogsContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  // get the username from localStorage, if set
  useEffect(() => {
    setAuthor(dialogsState.itemAuthor);
  }, [dialogsState.itemAuthor]);

  const authorInput = validateInput(author.length, 0, 40);
  const contentInput = validateInput(content.length, 0, 100000);

  function handleAuthorChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function renderAuthorError() {
    if (authorInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_AUTHOR_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  function renderContentError() {
    if (contentInput.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {CARD_CONTENT_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  function handleClose() {
    setContent("");
    closeCreateItemDialog();
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const id = nanoid();
    const newCard = { id, author, content, points: 0 };

    socket.emit(CREATE_CARD, newCard, dialogsState.columnId, boardId);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isCreateItemDialogOpen}
      onClose={handleClose}
      aria-labelledby="new-card-dialog"
    >
      <DialogTitle id="new-card-dialog">New Card</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          value={author}
          onChange={handleAuthorChange}
          error={authorInput.isTooLong}
          helperText={renderAuthorError()}
          id="author-name"
          label="Author"
          type="text"
          margin="dense"
          autoComplete="off"
        />
        <TextField
          required
          fullWidth
          multiline
          value={content}
          onChange={handleContentChange}
          error={contentInput.isTooLong}
          helperText={renderContentError()}
          rowsMax={Infinity}
          id="content-name"
          label="Content"
          type="text"
          margin="dense"
          autoComplete="off"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!authorInput.isValid || !contentInput.isValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
