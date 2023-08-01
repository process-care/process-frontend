import React from "react";
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
  const isValid = useAppSelector(selectors.conditions.getValidity);

  const currentCondition = currentConditions?.find((c: ConditionRedux) => c.id === selectedCondition.id);

  const clean_groups = groups?.filter((v, i, a) => a.findIndex((t) => t === v) === i);

  const [isRemoving, setRemoving] = React.useState<State>({
    type: null,
    id: "",
  });

  const isPageType = currentCondition?.attributes?.type === "page";
  const refererId = isPageType
    ? currentCondition?.attributes?.referer_page?.data?.id
    : currentCondition?.attributes?.referer_question?.data?.id;

  const handleDelete = async (id: string) => {
    dispatch(actions.deleteCondition(id));
  };

  const handleDeleteGroup = () => {
    if (!currentCondition) return;
    dispatch(
      actions.deleteGroupCondition({
        groupId: currentCondition?.attributes?.group,
        conditionsId: currentConditions.map((c) => c.id),
      })
    );
  };

  const goToFirstStep = (id: string) => {
    dispatch(actions.setSelectedCondition(id));
    dispatch(actions.setStep(1));
  };

  const createCondition = (newGroup?: boolean) => {
    if (!currentCondition) return;
    dispatch(
      actions.createCondition({
        refererId,
        type: currentCondition?.attributes?.type,
        group: newGroup ? uuidv4() : currentCondition?.attributes?.group,
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
                          Si la question
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
                          onClick={() => createCondition()}
                        >
                          {t.add_condition}
                        </Button>
                      </Flex>
                    }
                  </Box>
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
