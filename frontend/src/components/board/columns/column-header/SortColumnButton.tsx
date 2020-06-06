import React, { useContext } from "react";
import SortIcon from "@material-ui/icons/Sort";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { BoardContext } from "../../../../context/BoardContext";
import { RetroCard } from "../../../../types/common.types";
import { SORT_COLUMN } from "../../../../constants/event.constants";

type SortColumnButtonProps = {
  columnId: string;
  items: RetroCard[];
};

const SortColumnButton = React.forwardRef(
  (props: SortColumnButtonProps, ref: any) => {
    const { columnId, items } = props;
    const { boardId, socket } = useContext(BoardContext);

    function sort() {
      socket.emit(SORT_COLUMN, columnId, items, boardId);
    }

    return (
      <>
        <MenuItem button ref={ref} onClick={sort}>
          <ListItemIcon>
            <SortIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sort Column" />
        </MenuItem>
      </>
    );
  }
);

export default SortColumnButton;
