import React, { useContext, useEffect, useState } from "react";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";

import DeleteItemButton from "./DeleteItemButton";
import EditItemButton from "./EditItemButton";
import UpvoteItemButton from "./UpvoteItemButton";
import { UserContext } from "../../../context/UserContext";
import { BoardContext } from "../../../context/BoardContext";
import {
  CardAuthor,
  CardContainer,
  CardWrapper,
} from "../../styled-components";
import {
  FOCUS_CARD,
  REMOVE_FOCUS_CARD,
  VOTE_CARD,
} from "../../../constants/event.constants";
import { ROLE_MODERATOR } from "../../../utils/user.utils";

type RetroItemProps = {
  id: string;
  author: string;
  content: string;
  points: number;
  isBlurred: boolean;
  isVoted: boolean;
  openSnackbar: () => void;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  avatarVoted: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.light,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  card: {
    border: "1px solid lightgrey",
  },
  cardHeader: {
    padding: "8px",
  },
  cardFocused: {
    border: "4px solid red",
  },
  contentBody: {
    whiteSpace: "pre-line",
  },
  downVoteButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  likeButton: {
    marginLeft: "auto",
  },
}));

function RetroItem(props: RetroItemProps) {
  const {
    id,
    author,
    content,
    points,
    isBlurred,
    isVoted,
    openSnackbar,
  } = props;
  const [hasMouseFocus, setMouseFocus] = useState(false);
  const { boardId, boardState, socket } = useContext(BoardContext);
  const { userState, downvoteCard } = useContext(UserContext);
  const classes = useStyles();

  function downVote() {
    const votesLeft = userState.votesLeft;
    socket.emit(VOTE_CARD, id, boardId, false);
    downvoteCard(boardId, id, votesLeft);
    openSnackbar();
  }

  // keycode for "f" is 102
  // keycode for "F" is 70
  function handleFocus(event: KeyboardEvent) {
    const role = userState.role;

    if (role === ROLE_MODERATOR) {
      if (hasMouseFocus && event.keyCode === 102) {
        socket.emit(FOCUS_CARD, id);
      } else if (
        event.shiftKey &&
        event.keyCode === 70 &&
        boardState.focusedCard !== ""
      ) {
        socket.emit(REMOVE_FOCUS_CARD);
      }
    }
  }

  function handleHover(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    isFocused: boolean
  ) {
    setMouseFocus(isFocused);
  }

  useEffect(() => {
    document.addEventListener("keypress", handleFocus);
    return () => {
      document.removeEventListener("keypress", handleFocus);
    };
  });

  return (
    <CardWrapper isBlurred={isBlurred}>
      <CardContainer>
        <Card
          onMouseEnter={(event) => handleHover(event, true)}
          onMouseLeave={(event) => handleHover(event, false)}
          className={
            boardState.focusedCard === id ? classes.cardFocused : classes.card
          }
        >
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Avatar
                className={isVoted ? classes.avatarVoted : classes.avatar}
                aria-label="number of votes"
              >
                {points}
              </Avatar>
            }
            title={
              <Typography variant="body2" component={"span"}>
                <CardAuthor>{author}</CardAuthor>
              </Typography>
            }
          />
          <Divider />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component={"p"}>
              {content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing className={classes.actions}>
            <UpvoteItemButton id={id} openSnackbar={openSnackbar} />
            {isVoted ? (
              <IconButton
                className={classes.downVoteButton}
                size="small"
                color="primary"
                onClick={downVote}
              >
                <ThumbDownIcon fontSize="small" />
              </IconButton>
            ) : null}
            <EditItemButton id={id} author={author} content={content} />
            <DeleteItemButton id={id} />
          </CardActions>
        </Card>
      </CardContainer>
    </CardWrapper>
  );
}

export default React.memo(RetroItem);
