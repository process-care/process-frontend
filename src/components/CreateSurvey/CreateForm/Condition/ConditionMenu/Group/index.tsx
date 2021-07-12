import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectCondition } from "redux/slices/formBuilder";
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
import {
  useAddCondition,
  useDeleteCondition,
  useGetConditions,
  useUpdateCondition,
} from "api/actions/condition";

export const Group: React.FC<Props> = ({ conditions, groups, last_group }) => {
  const dispatch = useAppDispatch();
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const { data } = useGetConditions({
    id:
      selected_condition.type === "page"
        ? selected_condition?.referer_page?.id
        : selected_condition?.referer_question?.id,
    type: selected_condition.type,
  });
  const { mutateAsync: deleteCondition } = useDeleteCondition();
  const { mutateAsync: addCondition } = useAddCondition();

  const currentCondition = data?.conditions.find(
    (c: ICondition) => c.id === selected_condition.id
  );
  const { mutateAsync: updateCondition } = useUpdateCondition(
    currentCondition?.id
  );
  const clean_groups = groups?.filter(
    (v, i, a) => a.findIndex((t) => t.id === v.id) === i
  );
  const isDisabled = !currentCondition?.is_valid;
  const [isRemoving, setRemoving] = React.useState<State>({
    type: null,
    id: "",
  });
  const is_page_type = currentCondition?.type === "page";

  const handleDelete = (id: string) => {
    deleteCondition(id).then(() => {
      // Si on supprime la selected_condition, il faut selectionner la premiere condition s'il y en a une ou reset la selected_condition
      if (id === selected_condition.id) {
        if (conditions.length > 1) {
          dispatch(selectCondition(conditions[0]));
        } else {
          dispatch(selectCondition({}));
        }
      }
    });
  };

  return (
    <Box h="100%">
      {clean_groups?.map(({ name, id }) => {
        if (isRemoving.type === "group" && isRemoving.id === id) {
          return (
            <RemovingConfirmation
              key={id}
              content={t.removing_group_confirmation}
              confirm={() =>
                // Implement group deletion
                console.log("remove condition group")
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

              if (condition.group.id === id) {
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
                      {condition?.target?.label &&
                        currentCondition !== undefined && (
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
                                  isDisabled={isDisabled}
                                  onClick={() => {
                                    updateCondition({
                                      id: condition.id,
                                      data: {
                                        step: 1,
                                      },
                                    }).then((data: any) =>
                                      dispatch(
                                        selectCondition(
                                          data.updateCondition.condition
                                        )
                                      )
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
                      <Flex justifyContent="flex-end">
                        <Button
                          isDisabled={isDisabled}
                          variant="link"
                          opacity={0.5}
                          fontSize="10"
                          onClick={() => {
                            addCondition({
                              type: condition?.type,
                              [condition?.type === "page"
                                ? "referer_page"
                                : "referer_question"]: is_page_type
                                ? condition?.referer_page?.id
                                : condition?.referer_question?.id,
                              step: 1,
                              group: {
                                id: condition?.group.id,
                                name: condition?.group.name,
                              },
                              is_valid: false,
                            }).then((data: any) =>
                              dispatch(
                                selectCondition(data.createCondition.condition)
                              )
                            );
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
                opacity={0.5}
                fontSize="10"
                onClick={() => {
                  addCondition({
                    type: currentCondition?.type,
                    step: 1,
                    [currentCondition?.type === "page"
                      ? "referer_page"
                      : "referer_question"]: is_page_type
                      ? currentCondition?.referer_page?.id
                      : currentCondition?.referer_question?.id,
                    group: {
                      id: uuidv4(),
                      name: last_group + 1,
                    },
                    is_valid: false,
                  }).then((data: any) =>
                    dispatch(selectCondition(data.createCondition.condition))
                  );
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
