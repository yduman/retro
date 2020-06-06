import React, { useContext, useState, useEffect } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { ROLE_MODERATOR } from "../../../utils/user.utils";
import {
  SHOW_CONTINUE_DISCUSSION,
  CONTINUE_DISCUSSION_YES,
  CONTINUE_DISCUSSION_NO,
  CONTINUE_DISCUSSION_ABSTAIN,
} from "../../../constants/event.constants";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function ContinueDiscussionButton() {
  const [isDisabled, setDisabled] = useState(false);
  const { userState } = useContext(UserContext);
  const { boardId, socket, boardState } = useContext(BoardContext);
  const classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("sm"));

  useEffect(() => {
    setDisabled(!boardState.showContinueDiscussion);
  }, [boardState.showContinueDiscussion]);

  function toggleDiscussion() {
    if (userState.role === ROLE_MODERATOR) {
      socket.emit(SHOW_CONTINUE_DISCUSSION, boardId);
    }
  }

  function disableVoting() {
    setDisabled(true);
  }

  function handleYesClick() {
    socket.emit(CONTINUE_DISCUSSION_YES, boardId);
    disableVoting();
  }

  function handleNoClick() {
    socket.emit(CONTINUE_DISCUSSION_NO, boardId);
    disableVoting();
  }

  function handleAbstainClick() {
    socket.emit(CONTINUE_DISCUSSION_ABSTAIN, boardId);
    disableVoting();
  }

  return (
    <div>
      <MenuItem
        aria-label="Continue Discussion"
        color="primary"
        className={classes.button}
        onClick={toggleDiscussion}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <ListItemIcon>
          <ThumbsUpDownIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Start Roman Voting" />
      </MenuItem>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={boardState.showContinueDiscussion}
        aria-labelledby="continue-discussion-dialog"
        aria-describedby="continue-discussion-description"
      >
        <DialogTitle id="continue-discussion-dialog">
          Continue with the current discussion?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="continue-discussion-description">
            Select your choice below
          </DialogContentText>
          <ButtonGroup
            variant="text"
            color="primary"
            size="large"
            aria-label="vertical button group with the buttons yes, no and abstain"
          >
            <Button
              fullWidth
              className={classes.button}
              aria-label="Yes I want to continue with the discussion"
              onClick={handleYesClick}
              disabled={isDisabled}
              startIcon={<ThumbUpIcon />}
            >
              <Typography variant="body1">
                Yes ({boardState.continueDiscussionVotes.yes})
              </Typography>
            </Button>
            <Button
              fullWidth
              className={classes.button}
              aria-label="No I do not want to continue with the discussion"
              onClick={handleNoClick}
              disabled={isDisabled}
              startIcon={<ThumbDownIcon />}
            >
              <Typography variant="body1">
                No ({boardState.continueDiscussionVotes.no})
              </Typography>
            </Button>
            <Button
              fullWidth
              className={classes.button}
              aria-label="I abstain from voting"
              onClick={handleAbstainClick}
              disabled={isDisabled}
              startIcon={<ThumbsUpDownIcon />}
            >
              <Typography variant="body1">
                Abstain ({boardState.continueDiscussionVotes.abstain})
              </Typography>
            </Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={toggleDiscussion}
            disabled={userState.role !== ROLE_MODERATOR}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
