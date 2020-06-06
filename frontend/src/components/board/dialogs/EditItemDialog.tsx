import React, { useState, useContext, useEffect } from "react";
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
import { EDIT_CARD } from "../../../constants/event.constants";
import {
  CARD_AUTHOR_NAME_TOO_LONG_MSG,
  CARD_CONTENT_TOO_LONG_MSG,
} from "../../../constants/error.constants";

export default function EditItemDialog() {
  const [itemAuthor, setAuthor] = useState("");
  const [itemContent, setContent] = useState("");
  const { boardId, socket } = useContext(BoardContext);
  const { dialogsState, closeEditItemDialog } = useContext(DialogsContext);
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  useEffect(() => {
    setAuthor(dialogsState.itemAuthor);
    setContent(dialogsState.itemContent);
  }, [dialogsState.itemAuthor, dialogsState.itemContent]);

  const authorInput = validateInput(itemAuthor.length, 0, 40);
  const contentInput = validateInput(itemContent.length, 0, 100000);

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

  function handleClick() {
    socket.emit(
      EDIT_CARD,
      itemAuthor,
      itemContent,
      dialogsState.itemId,
      boardId
    );
    closeEditItemDialog();
  }

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      open={dialogsState.isEditItemDialogOpen}
      onClose={closeEditItemDialog}
      aria-labelledby="edit-card-dialog"
    >
      <DialogTitle id="edit-card-dialog">Edit Card</DialogTitle>
      <DialogContent>
        <TextField
          required
          fullWidth
          value={itemAuthor}
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
          value={itemContent}
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
        <Button onClick={closeEditItemDialog} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          color="primary"
          disabled={!authorInput.isValid || !contentInput.isValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
