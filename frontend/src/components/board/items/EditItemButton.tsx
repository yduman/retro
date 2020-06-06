import React, { useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, makeStyles } from "@material-ui/core";

import { DialogsContext } from "../../../context/DialogContext";

type EditItemButtonProps = {
  id: string;
  author: string;
  content: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.light,
  },
}));

export default function EditItemButton(props: EditItemButtonProps) {
  const { id, author, content } = props;
  const { openEditItemDialog } = useContext(DialogsContext);
  const classes = useStyles();

  return (
    <IconButton
      className={classes.button}
      size="small"
      onClick={() => openEditItemDialog(id, author, content)}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
}
