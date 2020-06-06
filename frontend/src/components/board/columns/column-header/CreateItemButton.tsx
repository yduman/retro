import React, { useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

import { UserContext } from "../../../../context/UserContext";
import { DialogsContext } from "../../../../context/DialogContext";

type CreateItemButton = {
  columnId: string;
};

export default function CreateItemButton({ columnId }: CreateItemButton) {
  const { userState } = useContext(UserContext);
  const { openCreateItemDialog } = useContext(DialogsContext);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => openCreateItemDialog(columnId, userState.name)}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </>
  );
}
