import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

type Question = {
  id: number;
  text: string;
};

function ConnectDraggableColumn({
  questions,
  handleDrag,
}: {
  questions: Question[];
  handleDrag: (result: DropResult) => void;
}) {
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="my-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: "20vh",
                        width: "40vw",
                        border: "3px solid black",
                        maxWidth: "250px",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ConnectDraggableColumn;
