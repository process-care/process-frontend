import { useCallback, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MinusIcon } from "lucide-react"

import { t } from "@/static/condition.ts"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { ConditionRedux } from "@/redux/slices/types/index.js"
import { Maybe } from "@/api/graphql/types.generated.ts"
import RemovingConfirmation from "../../../RemovingConfirmation/index.tsx"
import Separator from "../Separator/index.tsx"
import Operator from "./Operator/index.tsx"
import ButtonIcon from "@/components/ButtonIcon.tsx"

interface Props {
  currentConditions: ConditionRedux[];
  groups: (Maybe<string> | undefined)[] | undefined;
  selectedCondition: ConditionRedux;
}
interface State {
  type: "condition" | "group" | null;
  id: Maybe<string> | undefined | number;
}

export default function Group({ currentConditions, groups, selectedCondition }: Props): JSX.Element {
  const dispatch = useAppDispatch()
  const [isRemoving, setRemoving] = useState<State>({ id: "", type: null })

  const isValid = useAppSelector(selectors.conditions.getValidity)
  const currentCondition = currentConditions?.find((c: ConditionRedux) => c.id === selectedCondition.id)
  const clean_groups = groups?.filter((v, i, a) => a.findIndex((t) => t === v) === i)

  const isPageType = currentCondition?.attributes?.type === "page"
  const type = isPageType ? "page" : "question"
  const refererId = isPageType
    ? currentCondition?.attributes?.referer_page?.data?.id
    : currentCondition?.attributes?.referer_question?.data?.id

  const goToFirstStep = useCallback((id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setStep(1));
  }, [dispatch])

  const createGroup = useCallback(() => {
    dispatch(actions.createCondition({ refererId, type, group: uuidv4() }))
  }, [dispatch, refererId, type])

  return (
    <Box className="relative pb-10">
      {clean_groups?.map((groupId, i: number) => {
        const isLast = i === clean_groups.length - 1

        return (
          <div key={groupId}>
            <GroupContent
              idx={i}
              groupId={groupId}
              type={type}
              isValid={isValid}
              isRemoving={isRemoving}
              refererId={refererId}
              currentConditions={currentConditions}
              goToFirstStep={goToFirstStep}
              setRemoving={setRemoving}
            />

            <Separator value="OU" isLast={isLast} />

            { isLast && (
              <Flex justifyContent="flex-end">
                <Button
                  isDisabled={!isValid}
                  variant="link"
                  opacity={0.5}
                  fontSize="10"
                  onClick={createGroup}
                >
                  {t.add_group}
                </Button>
              </Flex>
            )}
          </div>
        );
      })}
    </Box>
  );
};

// ---- SUB COMPONENTS

// -- GROUP

type GroupContentProps = {
  idx: number
  groupId: string | null | undefined
  type: "question" | "page"
  isValid: boolean
  isRemoving: State
  refererId?: string | null
  currentConditions: ConditionRedux[]
  setRemoving: React.Dispatch<React.SetStateAction<State>>
  goToFirstStep: (id: string) => void
};

function GroupContent({
  idx,
  groupId,
  type,
  isValid,
  isRemoving,
  refererId,
  currentConditions,
  setRemoving,
  goToFirstStep,
}: GroupContentProps): JSX.Element {
  const dispatch = useAppDispatch()

  const createCondition = useCallback(() => {
    dispatch(actions.createCondition({ refererId, type, group: groupId }))
  }, [dispatch, groupId, refererId, type])

  const removeGroup = useCallback(() => {
    setRemoving({ type: "group", id: groupId })
  }, [setRemoving, groupId])

  const handleDeleteGroup = useCallback((groupId?: string | null) => {
    if (!groupId) return;
    const conditionsId = currentConditions.filter((c) => c.attributes.group === groupId).map((c) => c.id)
    dispatch(actions.deleteGroupCondition({ groupId, conditionsId }))
  }, [dispatch, currentConditions]);

  const conditionsInGroup = useMemo(() =>
    currentConditions.filter((c) => c.attributes.group === groupId)
  , [currentConditions, groupId])

  return (
    <Box className="relative p-4 my-5 bg-white border border-solid" key={groupId}>
      {/* Title */}
      <Flex className="mb-2" alignItems="center" justifyContent="space-around" w="100%">
        <Box
          w="100%"
          fontSize="10px"
          backgroundColor="brand.gray.100"
          p={2}
          textAlign="left"
          textTransform="uppercase"
          mr={2}
        >
          <strong>{t.group_condition} #{idx + 1}</strong> - {groupId}
        </Box>

        <ButtonIcon
          icon={MinusIcon}
          type="delete"
          size={10}
          onClick={removeGroup}
        />
      </Flex>

      {/* Conditions */}
      { conditionsInGroup.map((condition: ConditionRedux, index: number) => {
        const isLast = index === conditionsInGroup.length - 1
        return (
          <Condition
            key={condition.id}
            condition={condition}
            isLast={isLast}
            isRemoving={isRemoving}
            setRemoving={setRemoving}
            isValid={isValid}
            goToFirstStep={goToFirstStep}
          />
        )
      })}

      {/* Add condition button */}
      <Flex justifyContent="flex-end">
        <Button
          isDisabled={!isValid}
          variant="link"
          opacity={0.5}
          fontSize="10"
          onClick={createCondition}
        >
          {t.add_condition}
        </Button>
      </Flex>

      {/* Confirmation group deletion overlay */}
      { isRemoving.type === "group" && isRemoving.id === groupId &&
        <RemovingConfirmation
          key={groupId}
          content={t.removing_group_confirmation}
          confirm={() => handleDeleteGroup(groupId)}
          close={() => setRemoving({ type: null, id: "" })}
        />
      }
    </Box>
  )
}

// -- CONDITION

interface ConditionProps {
  condition: ConditionRedux
  isRemoving: State
  setRemoving: React.Dispatch<React.SetStateAction<State>>
  isValid: boolean
  goToFirstStep: (id: string) => void
  isLast: boolean
}

function Condition({
  condition,
  isRemoving,
  setRemoving,
  isValid,
  goToFirstStep,
  isLast
}: ConditionProps): JSX.Element {
  const dispatch = useAppDispatch()

  const handleDelete = useCallback(() => {
    dispatch(actions.deleteCondition(condition.id))
  }, [condition.id, dispatch])

  const showDeletion = isRemoving.type === "condition" && isRemoving.id === condition.id

  return (
    <Box className="relative" textAlign="left" key={condition.id} my={2}>
      {condition?.attributes?.target?.data?.attributes?.label && (
        <>
          <Text fontSize="10" color="brand.gray.200">
            Pour la question
          </Text>

          <Flex alignItems="flex-start" justifyContent="space-between">
            <Flex alignItems="flex-start">
              <Text fontSize="14" fontWeight="bold" color="black">
                {condition?.attributes?.target.data?.attributes?.label}
              </Text>

              <Button
                display="flex"
                isDisabled={!isValid}
                onClick={() => goToFirstStep(condition.id)}
                variant="link"
                color="brand.blue"
                fontSize="10"
                pt={1}
                justifyContent="flex-end"
              >
                Edit
              </Button>
            </Flex>

            <ButtonIcon
              icon={MinusIcon}
              size={10}
              type="delete"
              onClick={() => setRemoving({ type: "condition", id: condition.id })}
            />
          </Flex>
        </>
      )}

      {condition?.attributes?.operator !== null && (
        <Flex alignItems="center">
          <Operator condition={condition} />

          <Box ml={2}>
            <Text mt={2} fontSize="10" color="brand.gray.200">
              {t.response}
            </Text>
            <Text fontSize="14" color="black" mb={2}>
              {condition?.attributes?.target_value}
            </Text>
          </Box>
        </Flex>
      )}

      {/* Confirmation condition deletion overlay */}
      {showDeletion && (
        <RemovingConfirmation
          key={condition.id}
          content={t.removing_condition_confirmation}
          confirm={handleDelete}
          close={() => setRemoving({ type: null, id: "" })}
        />
      )}

      {condition?.attributes?.target_value &&
        <Separator value="ET" isLast={isLast} />
      }
    </Box>
  )
}