import React, { useContext } from "react";
import UnblurIcon from "@material-ui/icons/BlurOff";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BoardContext } from "../../../context/BoardContext";
import { UserContext } from "../../../context/UserContext";
import { UNBLUR_CARDS } from "../../../constants/event.constants";
import { ROLE_MODERATOR } from "../../../utils/user.utils";

function UnblurCardsButton() {
  const { boardId, socket } = useContext(BoardContext);
  const { userState } = useContext(UserContext);

  function unblur() {
    socket.emit(UNBLUR_CARDS, boardId);
  }

  return (
    <MenuItem
      aria-label="Unblur Cards"
      color="primary"
      onClick={unblur}
      disabled={userState.role !== ROLE_MODERATOR}
    >
      <ListItemIcon>
        <UnblurIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Toggle Blur" />
    </MenuItem>
  );
}

export default UnblurCardsButton;
