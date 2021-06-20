import React from "react";
import {
  Box,
  useColorModeValue,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { ItemTypes } from "./itemTypes";
import { XYCoord } from "dnd-core";
import { renderInput } from "./utils";
import IQuestion from "interfaces/form/question";
import {
  removeInput,
  selectInput,
  setIsEditing,
  setIsRemoving,
} from "redux/slices/formBuilder";

import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { ReactComponent as Condition } from "./assets/condition.svg";

import { RemovingConfirmation } from "./../../RemovingConfirmation";
import { toogleDrawer } from "redux/slices/application";
import { t } from "static/input";
import { hadValidCondition } from "utils/formBuilder/condition";
import { SvgHover } from "components/SvgHover";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";

interface CardProps {
  input: IQuestion;
  index: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
}

const Card: React.FC<CardProps> = ({ input, index, moveCard }) => {
  // const [isRemoving, setRemoving] = React.useState(false);
  const dispatch = useAppDispatch();
  const { is_removing } = useAppSelector(state => state.formBuilder)
  const isRemoving = is_removing === input.id
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
      if (moveCard) {
        moveCard(dragIndex, hoverIndex);
      }
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
      <Box onClick={() => dispatch(setIsRemoving(input.id))} position="sticky" left="-16px">
        <SvgHover>
          <Delete />
        </SvgHover>
      </Box>

      <Box
        _hover={{ cursor: "grab" }}
        ref={ref}
        key={input.id}
        w="100%"
        opacity={opacity}
        data-handler-id={handlerId}>
        <Container variant="inputContainer" padding={isRemoving ? 0 : 4}>
          <Box color={color}>
            {!isRemoving && (
              <Flex w="100%" justifyContent="space-between" pb={4}>
                <Text variant="xsMedium">{input.internal_title}</Text>
                <Box>
                  <InputIcon input_type={input.input_type} />
                </Box>
              </Flex>
            )}

            {isRemoving && (
              <RemovingConfirmation
                content={`${t.removing_confirmation} ${input.label} ?`}
                confirm={() => dispatch(removeInput(input))}
                close={() => dispatch(setIsRemoving(""))}
              />
            )}

            <Box
              position="relative"
              top="-7px"
              mb="10px"
              display={isRemoving ? "none" : ""}>
              {renderInput(input)}
            </Box>
          </Box>
        </Container>
      </Box>
      <Box onClick={() => handleEdit()} position="absolute" right="-16px">
        <SvgHover target="circle">
          <Edit />
        </SvgHover>
        {hadValidCondition(input.id).length > 0 ? <Condition /> : ""}
      </Box>
    </Flex>
  );
};

export default Card;
