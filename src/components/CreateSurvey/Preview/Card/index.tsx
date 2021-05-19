import React from "react";
import { Box, useColorModeValue, Container, Badge } from "@chakra-ui/react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./itemTypes";
import { XYCoord } from "dnd-core";
import { renderInput } from "./utils";
import Inputs from "interfaces/inputs";

interface CardProps {
  input: Inputs;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
}

const Card: React.FC<CardProps> = ({ input, index, moveCard }) => {
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
      return { id: input.id, name: input.name, index };
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
      key={input.id}
      w="100%"
      opacity={opacity}
      data-handler-id={handlerId}>
      <Container variant="inputContainer">
        <Box color={color}>
          <Box mt="-26px">
            <Badge
              mb={7}
              minW="120px"
              float="right"
              borderRadius="50px"
              px={5}
              py={1}
              bgColor="blackAlpha.800"
              border="1px"
              color="white"
              fontSize="7px">
              {input.name}
            </Badge>
            {input.internal_title && (
              <Badge
                minW="120px"
                float="right"
                borderRadius="50px"
                px={5}
                py={1}
                border="1px"
                bgColor="white"
                borderColor="blackAlpha.800"
                color="blackAlpha.800"
                fontSize="7px"
                mr={3}>
                {input.internal_title}
              </Badge>
            )}
          </Box>

          <Box style={{ clear: "both" }} />
          {renderInput(input)}
        </Box>
      </Container>
    </Box>
  );
};

export default Card;
