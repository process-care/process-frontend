import {
  Box,
  useColorModeValue,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { QuestionRedux } from "@/redux/slices/types";
import { setIsRemoving } from "@/redux/slices/formBuilder";
import { actions as appActions } from "@/redux/slices/application";
import { actions, selectors } from "@/redux/slices/scientistData";
import { actions as formBuilderActions } from "@/redux/slices/formBuilder";
import { t } from "@/static/input";
import RemovingConfirmation from "./../../RemovingConfirmation";
import SvgHover from "@/components/SvgHover";
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon";
import RenderInput from "./utils";

import Delete from "./assets/delete.svg";
import Edit from "./assets/edit.svg";
import Condition from "./assets/condition.svg";

interface Props {
  input: QuestionRedux;
  index: number;
}

export default function Card({ input, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { entityToRemove } = useAppSelector((state) => state.editor.form);
  const { status } = useAppSelector((state) => state.scientistData.survey);

  const getCondition = (input: QuestionRedux) =>
    useAppSelector((state) =>
      selectors.conditions.getConditionsByQuestionId(state, input.id)
    );

  const isRemoving = entityToRemove === input.id;
  const color = useColorModeValue("gray.800", "gray.900");

  const handleEdit = () => {
    dispatch(formBuilderActions.setIsEditing(true));
    dispatch(actions.setSelectedQuestion(input.id));
    dispatch(appActions.toogleDrawer());
  };

  const handleDelete = async () => {
    dispatch(actions.deleteQuestion(input.id));
  };

  const errorsListId = status?.checkSurvey?.errors
    ?.map((e) => e?.errors.map((el) => el?.questionId))
    .flat();

  const editCondition = async () => {
    // TODO: Open the conditions drawer
    dispatch(actions.setSelectedQuestion(input.id));
    const firstCondition = input?.attributes?.conditions?.data[0]?.id;
    if (firstCondition) {
      dispatch(actions.setSelectedCondition(firstCondition));
      dispatch(actions.setValidityCondition(true));
    }
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
        >
          <Box
            onClick={() => dispatch(setIsRemoving(input.id))}
            position="sticky"
            left="-16px"
          >
            <SvgHover>
              <Image src={Delete} alt="Delete" />
            </SvgHover>
          </Box>

          <Box key={input.id} w="100%">
            <Container
              variant="inputContainer"
              padding={isRemoving ? 0 : 4}
              borderColor={
                errorsListId?.includes(input.id) ? "red.500" : "gray.300"
              }
            >
              <Box color={color}>
                {!isRemoving && (
                  <Flex w="100%" justifyContent="space-between" pb={4}>
                    <Text variant="xsMedium">
                      {input?.attributes?.internal_title}
                    </Text>
                    <Box>
                      <InputIcon type={input?.attributes.type} />
                    </Box>
                  </Flex>
                )}

                {isRemoving && (
                  <RemovingConfirmation
                    content={`${t.removing_confirmation} ${input?.attributes.internal_title} ?`}
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
                  <RenderInput input={input} />
                </Box>
              </Box>
            </Container>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box
              onClick={() => handleEdit()}
              position="absolute"
              right="-16px"
              _hover={{ cursor: "pointer" }}
            >
              <SvgHover target="circle">
                <Image src={Edit} alt="Edit" />
              </SvgHover>
            </Box>
            <Box
              _hover={{ cursor: "pointer" }}
              position="absolute"
              top="10px"
              right="4px"
              onClick={() => editCondition()}
            >
              {getCondition(input).length > 0 && (
                <SvgHover target="circle">
                  <Image src={Condition} alt="Condition" />
                </SvgHover>
              )}
            </Box>
          </Box>
        </Flex>
      )}
    </Draggable>
  );
};
