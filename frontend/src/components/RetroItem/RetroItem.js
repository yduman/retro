import React from "react";
import {Draggable} from "react-beautiful-dnd";

import {Card} from "../Card";

const grid = 8;

export default (props) => (
  <Draggable
    key={props.key}
    draggableId={props.draggableId}
    index={props.index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >

        <Card
          cardHeader={props.author}
          cardTitle={props.content}
          cardPoints={props.points}
        />

      </div>
    )}
  </Draggable>
);

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid,
  margin: `0 0 ${grid}px 0`,

  ...draggableStyle
});
