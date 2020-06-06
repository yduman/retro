import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { CREATE_COLUMN } from "../../../constants/event.constants";
import { COLUMN_NAME_TOO_LONG_MSG } from "../../../constants/error.constants";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import { validateInput } from "../../../utils";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
    textTransform: "none",
  },
}));

export default function CreateColumnButton() {
  const [open, setOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
  const input = validateInput(columnTitle.length, 0, 40);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setColumnTitle(event.target.value);
  }

  function resetState() {
    setOpen(false);
    setColumnTitle("");
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const id = nanoid();
    const column = { id, columnTitle, itemIds: [] };

    socket.emit(CREATE_COLUMN, column, boardId);
    resetState();
  }

  function renderError() {
    if (input.isTooLong) {
      return (
        <Typography variant="caption" color="error">
          {COLUMN_NAME_TOO_LONG_MSG}
        </Typography>
      );
    }

    return null;
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        aria-label="Add Column"
        onClick={openDialog}
        disabled={userState.role !== ROLE_MODERATOR}
        className={classes.button}
        startIcon={<AddIcon />}
      >
        <Typography color="inherit">Add Column</Typography>
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        fullScreen={fullScreen}
        open={open}
        onClose={closeDialog}
        aria-labelledby="new-column-dialog"
      >
        <DialogTitle id="new-column-dialog">Create New Column</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            value={columnTitle}
            onChange={handleChange}
            error={input.isTooLong}
            helperText={renderError()}
            id="column-name"
            label="Column Name"
            margin="dense"
            type="text"
            autoComplete="off"
          />
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
    </div>
  );
}
