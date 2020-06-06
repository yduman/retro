import React from "react";
import { Draggable } from "react-beautiful-dnd";

import RetroItem from "./RetroItem";
import { ItemContainer } from "../../styled-components";
import { RetroCard } from "../../../types/common.types";

type ItemProps = {
  item: RetroCard;
  index: number;
  openSnackbar: () => void;
  isVoted: boolean;
};

// TODO: check if isDragging is needed
function Item(props: ItemProps) {
  const { item, index, openSnackbar, isVoted } = props;
  const { id, author, content, points, isBlurred } = item;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided /*, snapshot*/) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <RetroItem
            id={id}
            author={author}
            content={content}
            points={points}
            isBlurred={isBlurred}
            isVoted={isVoted}
            openSnackbar={openSnackbar}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
}

export default Item;
