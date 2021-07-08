import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addCondition,
  removeCondition,
  removeConditionGroup,
  selectCondition,
  updateCondition,
} from "redux/slices/formBuilder";
import { v4 as uuidv4 } from "uuid";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ICondition from "interfaces/form/condition";

import { Separator } from "../Separator";
import { ReactComponent as Delete } from "./../assets/delete.svg";

import { RemovingConfirmation } from "../../../RemovingConfirmation";
import { t } from "static/condition";

interface Props {
  conditions: ICondition[] | [];
  groups: { id: string | number; name: number }[];
  last_group: number;
}
interface State {
  type: "condition" | "group" | null;
  id: string | number;
}

import { Operator } from "./Operator";
import { useGetConditions } from "api/actions/condition";

export const Group: React.FC<Props> = ({ conditions, groups, last_group }) => {
  const dispatch = useAppDispatch();
  const condition_id = uuidv4();
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const { data } = useGetConditions({
    id: selected_condition?.referer_page?.id,
    type: selected_condition.type,
  });

  const current_condition = data?.conditions.find(
    (c: ICondition) => c.id === selected_condition.id
  );
  const clean_groups = groups.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );
  const isDisabled = !current_condition?.is_valid;
  const [isRemoving, setRemoving] = React.useState<State>({
    type: null,
    id: "",
  });

  return (
    <Box h="100%">
      {clean_groups.map(({ name, id }) => {
        if (isRemoving.type === "group" && isRemoving.id === id) {
          return (
            <RemovingConfirmation
              key={id}
              content={t.removing_group_confirmation}
              confirm={() =>
                dispatch(
                  removeConditionGroup({
                    id,
                  })
                )
              }
              close={() => setRemoving({ type: null, id: "" })}
            />
          );
        }

        return (
          <Box mt={5} key={id}>
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
                {t.group_condition} {name}
              </Box>
              <Button
                onClick={() => {
                  setRemoving({ type: "group", id });
                }}
                variant="link"
                color="brand.blue"
                fontSize="10"
                pt="2px"
              >
                <Delete />
              </Button>
            </Flex>

            {conditions?.map((condition: ICondition, index: number) => {
              const isLast = index === conditions.length - 1;
              const target_question = current_condition?.target;

              if (condition.group.id === id) {
                if (
                  isRemoving.type === "condition" &&
                  isRemoving.id === condition.id
                ) {
                  return (
                    <RemovingConfirmation
                      key={condition.id}
                      content={t.removing_condition_confirmation}
                      confirm={() =>
                        dispatch(
                          removeCondition({
                            id: condition.id,
                          })
                        )
                      }
                      close={() => setRemoving({ type: null, id: "" })}
                    />
                  );
                }
                return (
                  <>
                    <Box textAlign="left" key={condition.id} py={1}>
                      {target_question?.label &&
                        current_condition !== undefined && (
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
                                  {target_question?.label}
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

                      {condition.operator !== undefined && (
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
                                type:
                                  selected_condition?.type !== undefined
                                    ? selected_condition.type
                                    : "page",

                                step: 1,
                                group: {
                                  id,
                                  name,
                                },
                                is_valid: false,
                              })
                            );
                            dispatch(selectCondition({ id: condition_id }));
                          }}
                        >
                          {t.add_condition}
                        </Button>
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
                      type:
                        selected_condition?.type !== undefined
                          ? selected_condition.type
                          : "page",
                      step: 1,
                      group: {
                        id: uuidv4(),
                        name: last_group + 1,
                      },
                      is_valid: false,
                    })
                  );
                  dispatch(selectCondition({ id: condition_id }));
                }}
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
