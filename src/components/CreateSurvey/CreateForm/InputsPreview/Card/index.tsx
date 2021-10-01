import React from "react";
import {
  Box,
  useColorModeValue,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { renderInput } from "./utils";
import IQuestion from "types/form/question";
import {
  selectInput,
  setIsEditing,
  setIsRemoving,
} from "redux/slices/formBuilder";
import { Draggable } from "react-beautiful-dnd";

import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { ReactComponent as Condition } from "./assets/condition.svg";

import { RemovingConfirmation } from "./../../RemovingConfirmation";
import { actions } from "redux/slices/application";
import { t } from "static/input";
import { SvgHover } from "components/SvgHover";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";

import ISurvey from "types/survey";
import { useQuestionChain } from "../../hooks";

interface CardProps {
  input: IQuestion;
  index: number;
  survey: ISurvey;
}

const Card: React.FC<CardProps> = ({ input, index, survey }) => {
  const dispatch = useAppDispatch();
  const { is_removing } = useAppSelector((state) => state.formBuilder);
  const isRemoving = is_removing === input.id;

  const { deleteQuestionChain } = useQuestionChain(input, survey);

  const color = useColorModeValue("gray.800", "gray.900");

  const handleEdit = () => {
    dispatch(setIsEditing(true));
    dispatch(selectInput(input));
    dispatch(actions.toogleDrawer());
  };

  const handleDelete = async () => {
    deleteQuestionChain();
  };

  return (
    <Draggable draggableId={input.id} index={index}>
      {/* {(provided, snapshot) => ( */}
      {(provided) => (
        <Flex
          w="100%"
          alignItems="center"
          position="relative"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <Box
            onClick={() => dispatch(setIsRemoving(input.id))}
            position="sticky"
            left="-16px"
          >
            <SvgHover>
              <Delete />
            </SvgHover>
          </Box>

          <Box _hover={{ cursor: "grab" }} key={input.id} w="100%">
            <Container variant="inputContainer" padding={isRemoving ? 0 : 4}>
              <Box color={color}>
                {!isRemoving && (
                  <Flex w="100%" justifyContent="space-between" pb={4}>
                    <Text variant="xsMedium">{input.internal_title}</Text>
                    <Box>
                      <InputIcon type={input.type} />
                    </Box>
                  </Flex>
                )}

                {isRemoving && (
                  <RemovingConfirmation
                    content={`${t.removing_confirmation} ${input.internal_title} ?`}
                    confirm={handleDelete}
                    close={() => dispatch(setIsRemoving(""))}
                  />
                )}

                <Box
                  position="relative"
                  top="-7px"
                  mb="10px"
                  display={isRemoving ? "none" : ""}
                >
                  {renderInput(input)}
                </Box>
              </Box>
            </Container>
          </Box>
          <Box onClick={() => handleEdit()} position="absolute" right="-16px">
            <SvgHover target="circle">
              <Edit />
            </SvgHover>

            {input?.conditions !== undefined &&
              input?.conditions?.length > 0 && <Condition />}
          </Box>
        </Flex>
      )}
    </Draggable>
  );
};

export default Card;
