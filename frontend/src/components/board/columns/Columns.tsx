import React from "react";
import isEmpty from "lodash/isEmpty";

import Column from "./Column";
import { RetroColumn, RetroCard } from "../../../types/common.types";

type ColumnsProps = {
  column: RetroColumn;
  itemMap: {
    [key: string]: RetroCard;
  };
  index: number;
  openSnackbar: () => void;
};

function Columns(props: ColumnsProps) {
  const { column, itemMap, index, openSnackbar } = props;

  function getItems() {
    let items: RetroCard[];

    if (isEmpty(column)) {
      items = [];
    } else {
      items = column.itemIds.map((id) => itemMap[id]);
    }

    return items;
  }

  return (
    <Column
      column={column}
      items={getItems()}
      index={index}
      openSnackbar={openSnackbar}
    />
  );
}

export default Columns;
