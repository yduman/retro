import React from "react";
import { Draggable } from "react-beautiful-dnd";

import RetroItem from "./RetroItem";
import { ItemContainer } from "../../styled-components";
import { RetroCard } from "../../../types/common.types";

type ItemProps = {
  item: RetroCard;
  index: number;
  isVoted: boolean;
};

function Item(props: ItemProps) {
  const { item, index, isVoted } = props;
  const { id, author, content, points, isBlurred, isDiscussed} = item;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ItemContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <RetroItem
            id={id}
            author={author}
            content={content}
            points={points}
            isBlurred={isBlurred}
            isVoted={isVoted}
            isDiscussed={isDiscussed}
          />
        </ItemContainer>
      )}
    </Draggable>
  );
}

export default Item;
