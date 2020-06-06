import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import AddIcon from "@material-ui/icons/Add";
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
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import RetroFormatSelect from "./RetroFormatSelect";
import { defaultBoard, validateInput, postData } from "../../utils";
import { BOARD_NAME_TOO_LONG_MSG } from "../../constants/error.constants";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    minWidth: "11rem",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function CreateBoardDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const history = useHistory();

  const input = validateInput(title.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
  function navigateToBoard(response: Response, boardId: string) {
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
        size="large"
        variant="extended"
        color="primary"
        onClick={openDialog}
        className={classes.button}
      >
        <AddIcon className={classes.icon} />
        Create Board
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
          <DialogContentText>
            Please provide a name for your new board.
          </DialogContentText>
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
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={!input.isValid}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
