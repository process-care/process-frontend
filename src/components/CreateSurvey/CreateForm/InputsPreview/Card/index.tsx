import {
  Box,
  useColorModeValue,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd"
import { SlidersIcon, MinusIcon, SplitIcon } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { setIsRemoving } from "@/redux/slices/formBuilder/index.ts"
import { actions as appActions } from "@/redux/slices/application/index.js"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { actions as formBuilderActions } from "@/redux/slices/formBuilder/index.ts"
import { t } from "@/static/input.ts"
import RemovingConfirmation from "./../../RemovingConfirmation/index.tsx"
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon/index.tsx"
import RenderInput from "./utils/index.tsx"
import ButtonIcon from "@/components/ButtonIcon.tsx";
import { cn } from "@/utils/ui.ts";

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
          {/* Left action buttons */}
          <ButtonIcon
            icon={MinusIcon}
            type="delete"
            onClick={() => dispatch(setIsRemoving(input.id))}
          />

          {/* Middle card */}
          <div
            key={input.id}
            className={cn(
              "relative mx-2 my-5 border rounded-[5px] bg-white w-full max-w-[unset] cursor-grab border-gray-300",
              errorsListId?.includes(input.id) ? "border-red-500" : ""
            )}
          >
            {/* Input card content */}
            <Box className="m-4" color={color}>
              <Flex w="100%" justifyContent="space-between" pb={4}>
                <Text variant="xsMedium">
                  {input?.attributes?.internal_title}
                </Text>
                <InputIcon type={input?.attributes.type} />
              </Flex>

              <Box position="relative" top="-7px" mb="10px">
                <RenderInput input={input} />
              </Box>
            </Box>

            {/* Confirmation card overlay when deleting */}
            {isRemoving && (
              <RemovingConfirmation
                content={`${t.removing_confirmation} ${input?.attributes.internal_title} ?`}
                confirm={handleDelete}
                close={() => dispatch(setIsRemoving(""))}
              />
            )}
          </div>
          
          {/* Right action buttons */}
          <ButtonIcon
            icon={SlidersIcon}
            onClick={handleEdit}
          />

          {hasConditions && (
            <ButtonIcon
              className="absolute top-[8px] right-[19px]"
              icon={SplitIcon}
              onClick={editCondition}
            />
          )}
        </Flex>
      )}
    </Draggable>
  );
};
