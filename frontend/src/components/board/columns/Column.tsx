import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";

import Items from "../items/Items";
import ColumnHeader from "./column-header/ColumnHeader";
import { RetroColumn, RetroCard } from "../../../types/common.types";
import {
  ColumnContainerStyles,
  ItemsContainerStyles,
} from "../../styled-components";

const ColumnContainer = styled(Card)`
  ${ColumnContainerStyles}
`;

const ItemsContainer = styled.div`
  ${ItemsContainerStyles};
`;

type ColumnProps = {
  column: RetroColumn;
  items: RetroCard[];
  index: number;
  openSnackbar: () => void;
};

function Column(props: ColumnProps) {
  const { column, items, index, openSnackbar } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {(providedDraggable) => (
        <ColumnContainer
          {...providedDraggable.draggableProps}
          {...providedDraggable.dragHandleProps}
          ref={providedDraggable.innerRef}
          raised
        >
          <ColumnHeader
            columnTitle={column.columnTitle}
            columnId={column.id}
            items={items}
          />

          <Droppable
            droppableId={column.id}
            type="item"
            isCombineEnabled={true}
          >
            {(providedDroppable, snapshot) => (
              <ItemsContainer
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Items items={items} openSnackbar={openSnackbar} />
                {providedDroppable.placeholder}
              </ItemsContainer>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
}

export default Column;
