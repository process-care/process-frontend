import {
  Box,
  useColorModeValue,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd"
import { EditIcon, DeleteIcon, SplitIcon } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { setIsRemoving } from "@/redux/slices/formBuilder/index.ts"
import { actions as appActions } from "@/redux/slices/application/index.js"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { actions as formBuilderActions } from "@/redux/slices/formBuilder/index.ts"
import { t } from "@/static/input.ts"
import RemovingConfirmation from "./../../RemovingConfirmation/index.tsx"
import SvgHover from "@/components/SvgHover/index.tsx"
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon/index.tsx"
import RenderInput from "./utils/index.tsx"

interface Props {
  input: QuestionRedux;
  index: number;
}

export default function Card({ input, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const { entityToRemove } = useAppSelector((state) => state.editor.form);
  const { status } = useAppSelector((state) => state.scientistData.survey);
  const hasConditions = useAppSelector(
    (state) =>selectors.conditions.selectConditionsByQuestionId(state, { questionId: input.id })
  ).length > 0

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
              <DeleteIcon />
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
                <EditIcon />
              </SvgHover>
            </Box>
            <Box
              _hover={{ cursor: "pointer" }}
              position="absolute"
              top="10px"
              right="4px"
              onClick={() => editCondition()}
            >
              {hasConditions && (
                <SvgHover target="circle">
                  <SplitIcon />
                </SvgHover>
              )}
            </Box>
          </Box>
        </Flex>
      )}
    </Draggable>
  );
};
