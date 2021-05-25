import React from "react";
import {
  Box,
  useColorModeValue,
  Container,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useAppDispatch } from "redux/hooks";

import { ItemTypes } from "./itemTypes";
import { XYCoord } from "dnd-core";
import { renderInput } from "./utils";
import Inputs from "interfaces/inputs";
import {
  removeInput,
  selectInput,
  setIsEditing,
} from "redux/slices/formBuilder";

import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";

import { RemovingConfirmation } from "./Status";
import { toogleDrawer } from "redux/slices/application";

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
  const [isRemoving, setRemoving] = React.useState(false);
  const dispatch = useAppDispatch();

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

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
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

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    dispatch(selectInput(input));
    dispatch(toogleDrawer());
  };
  return (
    <Flex w="100%" alignItems="center" position="relative">
      <Box
        onClick={() => setRemoving(true)}
        position="absolute"
        left="-16px"
        _hover={{ cursor: "pointer", opacity: "0.7", transition: "all 400ms" }}>
        <Delete />
      </Box>
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
              {
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
              }
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
            {isRemoving ? (
              <RemovingConfirmation
                confirm={() => dispatch(removeInput(input))}
                close={() => setRemoving(false)}
              />
            ) : (
              <Box position="relative" top="-7px" mb="10px">
                {renderInput(input)}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
      <Box
        onClick={() => handleEdit()}
        position="absolute"
        right="-16px"
        _hover={{ cursor: "pointer", opacity: "0.7", transition: "all 400ms" }}>
        <Edit />
      </Box>
    </Flex>
  );
};

export default Card;
