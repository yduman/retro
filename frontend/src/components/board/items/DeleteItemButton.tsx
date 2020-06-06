import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, makeStyles } from "@material-ui/core";

import { DialogsContext } from "../../../context/DialogContext";

type DeleteItemButtonProps = {
  id: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.error.main,
  },
}));

export default function DeleteItemButton(props: DeleteItemButtonProps) {
  const { id } = props;
  const { openDeleteItemDialog } = useContext(DialogsContext);
  const classes = useStyles();

  return (
    <IconButton
      size="small"
      className={classes.button}
      onClick={() => openDeleteItemDialog(id)}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
}
