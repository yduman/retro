import React, { useState, useContext } from "react";
import MenuIcon from "@material-ui/icons/MoreVert";
import { IconButton, Menu } from "@material-ui/core";

import SortColumnButton from "./SortColumnButton";
import EditColumnMenuItem from "./EditColumnMenuItem";
import DeleteColumnMenuItem from "./DeleteColumnMenuItem";
import { UserContext } from "../../../../context/UserContext";
import { DialogsContext } from "../../../../context/DialogContext";
import { RetroCard } from "../../../../types/common.types";
import { ROLE_MODERATOR } from "../../../../utils/user.utils";

type ColumnMenuProps = {
  columnId: string;
  columnTitle: string;
  items: RetroCard[];
};

function ColumnMenu(props: ColumnMenuProps) {
  const { columnId, columnTitle, items } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { userState } = useContext(UserContext);
  const { openDeleteColumnDialog, openEditColumnDialog } = useContext(
    DialogsContext
  );

  const open = Boolean(anchorEl);

  function openMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Column Menu"
        aria-owns={open ? "column-menu" : undefined}
        aria-haspopup="true"
        onClick={openMenu}
        disabled={userState.role !== ROLE_MODERATOR}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Menu
        id="column-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
      >
        <DeleteColumnMenuItem
          openDialog={() => {
            openDeleteColumnDialog(columnId);
            closeMenu();
          }}
        />
        <EditColumnMenuItem
          openDialog={() => {
            openEditColumnDialog(columnId, columnTitle);
            closeMenu();
          }}
        />
        <SortColumnButton columnId={columnId} items={items} />
      </Menu>
    </>
  );
}

export default ColumnMenu;
