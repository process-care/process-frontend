import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./itemTypes";
import { XYCoord } from "dnd-core";

interface CardProps {
  id: string;
  name: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card: React.FC<CardProps> = ({ id, name, index, moveCard }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const color = useColorModeValue("gray.800", "gray.900");

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%

      // // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: () => {
      return { id, name, index };
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Box
      _hover={{ cursor: "grab" }}
      ref={ref}
      bg="white"
      key={id}
      m="2"
      w="50%"
      p="5"
      opacity={opacity}
      data-handler-id={handlerId}>
      <Text color={color}>{name}</Text>
    </Box>
  );
};

export default Card;
