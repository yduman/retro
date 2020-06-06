import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

type DeleteColumnMenuItemProps = {
  openDialog: () => void;
};

const DeleteColumnMenuItem = React.forwardRef(
  (props: DeleteColumnMenuItemProps, ref: any) => {
    return (
      <MenuItem button ref={ref} onClick={props.openDialog}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Delete Column" />
      </MenuItem>
    );
  }
);

export default DeleteColumnMenuItem;
