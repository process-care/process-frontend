import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/CreateLanding/ToolBox/Footer";
import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { t } from "static/condition";

import { selectCondition } from "redux/slices/formBuilder";
import { Group } from "./Group";
import ICondition from "types/form/condition";
import {
  useDeleteCondition,
  useGetConditions,
} from "call/actions/formBuider/condition";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";

export const ConditionMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selected_condition } = useAppSelector((state) => state.formBuilder);
  const { data, isLoading, error } = useGetConditions({
    id:
      selected_condition.type === "page"
        ? selected_condition?.referer_page?.id
        : selected_condition?.referer_question?.id,
    type: selected_condition.type,
  });
  const { mutateAsync: deleteCondition } = useDeleteCondition();

  const current_condition = data?.conditions.find(
    (c: ICondition) => c.id === selected_condition.id
  );

  const isDisabled = !current_condition?.is_valid;
  const groups = data?.conditions.map((c: ICondition) => c.group);

  const last_group =
    data && data?.conditions.length > 0
      ? Math.max(...data?.conditions.map((c: ICondition) => c.group.name))
      : 1;

  const isConditionTypePage = data?.conditions[0]?.type === "page";

  if (isLoading || current_condition === undefined) {
    return (
      <Box pt="400px">
        <Loader />
      </Box>
    );
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <Box h="100%" pos="relative">
      <Box px={4} pt={4} mb="100px">
        <Text variant="current" textTransform="uppercase">
          {isConditionTypePage ? t.show_page : t.show_input}
        </Text>
        <Text variant="xsMedium">
          {isConditionTypePage
            ? data?.conditions[0]?.referer_page?.name
            : data?.conditions[0]?.referer_question?.label}
        </Text>
        {isDisabled && (
          <Text variant="xs" mt={5} textAlign="left" color="brand.gray.200">
            {t.cant_edit}
          </Text>
        )}
        <Group
          conditions={data?.conditions}
          groups={groups}
          last_group={last_group}
        />
      </Box>

      <Box pos="sticky" bottom="0px" top="0px" w="100%">
        <Footer
          disabled={isDisabled}
          onSubmit={() => dispatch(selectCondition({}))}
          onCancel={() => {
            if (!current_condition.is_valid) {
              deleteCondition(current_condition.id);
            }
            dispatch(selectCondition({}));
          }}
        />
      </Box>
    </Box>
  );
};
