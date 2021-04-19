import React, { useContext } from "react";
import ForumIcon from "@material-ui/icons/Forum";
import { IconButton } from "@material-ui/core";
import { MARK_CARD_DISCUSSED } from "../../../constants/event.constants";
import { BoardContext } from "../../../context/BoardContext";

type MarkItemAsDiscussedButtonProps = {
  id: string;
};

export default function MarkAsDiscussedButton(
  props: MarkItemAsDiscussedButtonProps
) {
  const { id } = props;
  const { boardId, socket } = useContext(BoardContext);

  function handleClick() {
    socket.emit(MARK_CARD_DISCUSSED, id, boardId);
  }

  return (
    <IconButton size="small" color="inherit" onClick={() => handleClick()}>
      <ForumIcon fontSize="small" />
    </IconButton>
  );
}
