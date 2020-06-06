import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

type EditColumnMenuItemProps = {
  openDialog: () => void;
};

const EditColumnMenuItem = React.forwardRef(
  (props: EditColumnMenuItemProps, ref: any) => {
    return (
      <MenuItem button ref={ref} onClick={props.openDialog}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Edit Name" />
      </MenuItem>
    );
  }
);

export default EditColumnMenuItem;
