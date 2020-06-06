import React from "react";
import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ColumnName from "../ColumnName";
import ColumnMenu from "./ColumnMenu";
import CreateItemButton from "./CreateItemButton";
import { RetroCard } from "../../../../types/common.types";

type ColumnHeaderProps = {
  columnTitle: string;
  columnId: string;
  items: RetroCard[];
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ColumnHeader(props: ColumnHeaderProps) {
  const { columnTitle, columnId, items } = props;
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.header}
      title={<ColumnName columnTitle={columnTitle} />}
      action={
        <div>
          <CreateItemButton columnId={columnId} />
          <ColumnMenu
            columnId={columnId}
            columnTitle={columnTitle}
            items={items}
          />
        </div>
      }
    />
  );
}
