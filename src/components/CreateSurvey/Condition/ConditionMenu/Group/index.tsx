import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addCondition,
  getSelectedConditionData,
  removeCondition,
  removeConditionGroup,
  selectCondition,
  updateCondition,
} from "redux/slices/formBuilder";
import { v4 as uuidv4 } from "uuid";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ICondition from "interfaces/form/condition";
import { renderOperator } from "./utils";
import { Separator } from "../Separator";
import { ReactComponent as Delete } from "./../assets/delete.svg";

import IFormPage from "interfaces/form/page";
import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { t } from "static/condition";
import IInput from "interfaces/form/input";

interface Props {
  conditions: ICondition[] | [];
  groups: { id: string | number; name: number }[];
  last_group: number;
  currentReferer: IFormPage | IInput | undefined;
}
interface State {
  type: "condition" | "group" | null;
}

export const Group: React.FC<Props> = ({
  conditions,
  groups,
  last_group,
  currentReferer,
}) => {
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();
  const selected_condition = useAppSelector(getSelectedConditionData);
  const clean_groups = groups.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );
  const isDisabled = !selected_condition?.is_valid;
  const [isRemoving, setRemoving] = React.useState<State>({ type: null });

  if (currentReferer === undefined) {
    return <p>Error</p>;
  }

  return (
    <Box p={4} h="100%">
      {clean_groups.map(({ name, id }) => {
        if (isRemoving.type === "group") {
          return (
            <RemovingConfirmation
              content={t.removing_group_confirmation}
              confirm={() =>
                dispatch(
                  removeConditionGroup({
                    id,
                  })
                )
              }
              close={() => setRemoving({ type: null })}
            />
          );
        }
        return (
          <Box mt={10}>
            <Flex alignItems="center" justifyContent="space-around" w="100%">
              <Box
                w="100%"
                fontSize="10px"
                backgroundColor="brand.gray.100"
                p={2}
                textAlign="left"
                textTransform="uppercase"
                mr={2}>
                {t.group_condition} {name}
              </Box>
              <Button
                onClick={() => {
                  setRemoving({ type: "group" });
                }}
                variant="link"
                color="brand.blue"
                fontSize="10"
                pt="2px">
                <Delete />
              </Button>
            </Flex>

            {conditions?.map((condition: ICondition, index: number) => {
              const isLast = index === conditions.length - 1;

              if (isRemoving.type === "condition") {
                return (
                  <RemovingConfirmation
                    content={t.removing_condition_confirmation}
                    confirm={() =>
                      dispatch(
                        removeCondition({
                          id: condition.id,
                        })
                      )
                    }
                    close={() => setRemoving({ type: null })}
                  />
                );
              }

              if (condition.group.id === id) {
                return (
                  <>
                    <Box textAlign="left" key={condition.id} py={1}>
                      {condition.selected_question?.label &&
                        selected_condition !== undefined && (
                          <>
                            <Text fontSize="10" color="brand.gray.200">
                              Si la question
                            </Text>

                            <Flex
                              alignItems="flex-start"
                              justifyContent="space-between">
                              <Flex alignItems="flex-start">
                                <Text
                                  fontSize="14"
                                  fontWeight="bold"
                                  color="black">
                                  {condition.selected_question?.label}
                                </Text>
                                <Button
                                  d="flex"
                                  isDisabled={isDisabled}
                                  onClick={() => {
                                    dispatch(
                                      selectCondition({ id: condition.id })
                                    );
                                    dispatch(
                                      updateCondition({
                                        id: condition.id,
                                        data: {
                                          step: 1,
                                        },
                                      })
                                    );
                                  }}
                                  variant="link"
                                  color="brand.blue"
                                  fontSize="10"
                                  pt={1}
                                  justifyContent="flex-end">
                                  Edit
                                </Button>
                              </Flex>

                              <Button
                                onClick={() => {
                                  setRemoving({ type: "condition" });
                                }}
                                variant="link"
                                color="brand.blue"
                                fontSize="10"
                                pt="2px">
                                <Delete />
                              </Button>
                            </Flex>
                          </>
                        )}

                      {condition.operator?.id && (
                        <Flex>
                          <Text
                            h="8"
                            w="fit-content"
                            minW="25px"
                            mt={2}
                            fontSize="10"
                            color="white"
                            fontWeight="bold"
                            backgroundColor="black"
                            borderRadius="4"
                            textAlign="center"
                            p="2">
                            {renderOperator(condition.operator?.id)}
                          </Text>
                          <Box ml={2}>
                            <Text mt={2} fontSize="10" color="brand.gray.200">
                              {t.response}
                            </Text>
                            <Text fontSize="14" color="black">
                              {condition.target_value}
                            </Text>
                          </Box>
                        </Flex>
                      )}
                      {condition.target_value && (
                        <Separator value="ET" isLast={isLast} />
                      )}
                      <Flex justifyContent="flex-end">
                        {isLast && (
                          <Button
                            isDisabled={isDisabled}
                            variant="link"
                            opacity={0.2}
                            fontSize="10"
                            onClick={() => {
                              dispatch(
                                addCondition({
                                  id: condition_id,
                                  condition_type: "page",
                                  referer_entity_id:
                                    currentReferer?.id !== undefined
                                      ? currentReferer.id
                                      : "",
                                  step: 1,
                                  group: {
                                    id,
                                    name,
                                  },
                                  is_valid: false,
                                })
                              );
                              dispatch(selectCondition({ id: condition_id }));
                            }}>
                            {t.add_condition}
                          </Button>
                        )}
                      </Flex>
                    </Box>
                  </>
                );
              }
            })}
            <Separator value="OU" isLast={last_group === id} />
            <Flex justifyContent="flex-end">
              <Button
                isDisabled={isDisabled}
                variant="link"
                opacity={0.2}
                fontSize="10"
                onClick={() => {
                  dispatch(
                    addCondition({
                      id: condition_id,
                      condition_type: "page",
                      referer_entity_id:
                        currentReferer?.id !== undefined
                          ? currentReferer.id
                          : "",
                      step: 1,
                      group: {
                        id: uuidv4(),
                        name: last_group + 1,
                      },
                      is_valid: false,
                    })
                  );
                  dispatch(selectCondition({ id: condition_id }));
                }}>
                {t.add_group}
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};
