import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { v4 as uuidv4 } from "uuid";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ICondition from "types/form/condition";

import { Separator } from "../Separator";
import { ReactComponent as Delete } from "./../assets/delete.svg";

import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { t } from "static/condition";
import { Operator } from "./Operator";
import { actions, selectors } from "redux/slices/scientistData";

interface Props {
  currentConditions: ICondition[];
  groups: string[] | undefined;
  selectedCondition: ICondition;
}
interface State {
  type: "condition" | "group" | null;
  id: string | number;
}

export const Group: React.FC<Props> = ({
  currentConditions,
  groups,
  selectedCondition,
}) => {
  console.log("currentConditions", currentConditions);
  const dispatch = useAppDispatch();
  const isValid = useAppSelector(selectors.conditions.getValidity);

  const currentCondition = currentConditions?.find(
    (c: ICondition) => c.id === selectedCondition.id
  );

  const clean_groups = groups?.filter(
    (v, i, a) => a.findIndex((t) => t === v) === i
  );

  const [isRemoving, setRemoving] = React.useState<State>({
    type: null,
    id: "",
  });

  const isPageType = currentCondition?.type === "page";
  const refererId = isPageType
    ? currentCondition.referer_page?.id
    : currentCondition?.referer_question?.id;

  const handleDelete = async (id: string) => {
    dispatch(actions.deleteCondition(id));
  };

  const handleDeleteGroup = () => {
    if (!currentCondition) return;
    dispatch(
      actions.deleteGroupCondition({
        groupId: currentCondition?.group,
        conditionsId: currentConditions.map((c) => c.id),
      })
    );
  };

  const goToFirstStep = (id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setStep(1));
  };

  console.log("refererId", refererId);

  const createCondition = (newGroup?: boolean) => {
    if (!currentCondition) return;
    dispatch(
      actions.createCondition({
        refererId,
        type: currentCondition.type,
        group: newGroup ? `group-${uuidv4()}` : currentCondition.group,
      })
    );
  };

  return (
    <Box h="100%">
      {clean_groups?.map((groupId, i: number) => {
        if (isRemoving.type === "group" && isRemoving.id === groupId) {
          return (
            <RemovingConfirmation
              key={groupId}
              content={t.removing_group_confirmation}
              confirm={handleDeleteGroup}
              close={() => setRemoving({ type: null, id: "" })}
            />
          );
        }

        return (
          <Box mt={5} key={groupId}>
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
                {t.group_condition} #{i + 1} {groupId}
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
                <Delete />
              </Button>
            </Flex>

            {currentConditions.map((condition: ICondition, index: number) => {
              const isLast = index === currentConditions.length - 1;

              if (condition.group === groupId) {
                if (
                  isRemoving.type === "condition" &&
                  isRemoving.id === condition.id
                ) {
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
                  <>
                    <Box textAlign="left" key={condition.id} py={1}>
                      {condition?.target?.label && (
                        <>
                          <Text fontSize="10" color="brand.gray.200">
                            Si la question
                          </Text>

                          <Flex
                            alignItems="flex-start"
                            justifyContent="space-between"
                          >
                            <Flex alignItems="flex-start">
                              <Text
                                fontSize="14"
                                fontWeight="bold"
                                color="black"
                              >
                                {condition?.target?.label}
                              </Text>
                              <Button
                                d="flex"
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
                              <Delete />
                            </Button>
                          </Flex>
                        </>
                      )}

                      {condition.operator !== null && (
                        <Flex alignItems="center">
                          <Operator condition={condition} />

                          <Box ml={2}>
                            <Text mt={2} fontSize="10" color="brand.gray.200">
                              {t.response}
                            </Text>
                            <Text fontSize="14" color="black" mb={2}>
                              {condition.target_value}
                            </Text>
                          </Box>
                        </Flex>
                      )}
                      {condition.target_value && (
                        <Separator value="ET" isLast={isLast} />
                      )}
                      {
                        <Flex justifyContent="flex-end">
                          <Button
                            isDisabled={!isValid}
                            variant="link"
                            opacity={0.5}
                            fontSize="10"
                            onClick={() => createCondition()}
                          >
                            {t.add_condition}
                          </Button>
                        </Flex>
                      }
                    </Box>
                  </>
                );
              }
            })}

            <Separator value="OU" isLast={i === clean_groups.length - 1} />
            <Flex justifyContent="flex-end">
              <Button
                isDisabled={!isValid}
                variant="link"
                opacity={0.5}
                fontSize="10"
                onClick={() => createCondition(true)}
              >
                {t.add_group}
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};
