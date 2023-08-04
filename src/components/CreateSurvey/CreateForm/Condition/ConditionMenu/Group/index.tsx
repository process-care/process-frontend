import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import { t } from "@/static/condition";
import { actions, selectors } from "@/redux/slices/scientistData";
import { ConditionRedux } from "@/redux/slices/types";
import { Maybe } from "@/api/graphql/types.generated";
import RemovingConfirmation from "../../../RemovingConfirmation";
import Separator from "../Separator";
import Operator from "./Operator";

import Delete from "@/assets/delete.svg";

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
  const dispatch = useAppDispatch();
  const [isRemoving, setRemoving] = React.useState<State>({ id: "", type: null });

  const isValid = useAppSelector(selectors.conditions.getValidity);
  const currentCondition = currentConditions?.find((c: ConditionRedux) => c.id === selectedCondition.id);
  const clean_groups = groups?.filter((v, i, a) => a.findIndex((t) => t === v) === i);

  const isPageType = currentCondition?.attributes?.type === "page";
  const type = isPageType ? "page" : "question";
  const refererId = isPageType
    ? currentCondition?.attributes?.referer_page?.data?.id
    : currentCondition?.attributes?.referer_question?.data?.id;

  const handleDeleteGroup = useCallback((groupId?: string | null) => {
    if (!groupId) return;
    const conditionsId = currentConditions.map((c) => c.id)
    dispatch(actions.deleteGroupCondition({ groupId, conditionsId }))
  }, [dispatch, currentConditions]);

  const goToFirstStep = useCallback((id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setStep(1));
  }, [dispatch]);

  const createCondition = useCallback(() => {
    dispatch(actions.createCondition({ refererId, type, group: uuidv4() }))
  }, [dispatch, refererId, type])
  
  console.log(currentCondition)

  return (
    <Box className="relative pb-10">
      {clean_groups?.map((groupId, i: number) => {
        const isLast = i === clean_groups.length - 1

        return (
          <>
            { isRemoving.type === "group" && isRemoving.id === groupId &&
              <RemovingConfirmation
                key={groupId}
                content={t.removing_group_confirmation}
                confirm={() => handleDeleteGroup(groupId)}
                close={() => setRemoving({ type: null, id: "" })}
              />
            }

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
                  onClick={createCondition}
                >
                  {t.add_group}
                </Button>
              </Flex>
            )}
          </>
        );
      })}
    </Box>
  );
};

// ---- SUB COMPONENTS

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
  const dispatch = useAppDispatch();

  const handleDelete = useCallback((id: string) => {
    dispatch(actions.deleteCondition(id));
  }, [dispatch])

  const createCondition = useCallback(() => {
    dispatch(actions.createCondition({ refererId, type, group: groupId }))
  }, [dispatch, groupId, refererId, type])

  return (
    <Box className="p-4 my-5 bg-white border border-solid" key={groupId}>
      <Flex alignItems="center" justifyContent="space-around" w="100%">
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

        <Button
          onClick={() => {
            setRemoving({ type: "group", id: groupId });
          }}
          variant="link"
          color="brand.blue"
          fontSize="10"
          pt="2px"
        >
          <Image src={Delete} alt="Delete" />
        </Button>
      </Flex>

      {currentConditions.map((condition: ConditionRedux, index: number) => {
        const isLast = index === currentConditions.length - 1;

        if (condition?.attributes?.group === groupId) {
          if (isRemoving.type === "condition" && isRemoving.id === condition.id) {
            return (
              <RemovingConfirmation
                key={condition.id}
                content={t.removing_condition_confirmation}
                confirm={() => handleDelete(condition.id)}
                close={() => setRemoving({ type: null, id: "" })}
              />
            );
          }

          return (
            <Box textAlign="left" key={condition.id} py={1}>
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

                    <Button
                      onClick={() => {
                        setRemoving({
                          type: "condition",
                          id: condition.id,
                        });
                      }}
                      variant="link"
                      color="brand.blue"
                      fontSize="10"
                      pt="2px"
                    >
                      <Image src={Delete} alt="Delete" />
                    </Button>
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

              {condition?.attributes?.target_value && <Separator value="ET" isLast={isLast} />}

              {
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
              }
            </Box>
          );
        }
      })}
    </Box>
  )
}