import { Box, Text } from "@chakra-ui/react";
import { Footer } from "components/CreateSurvey/CreateLanding/ToolBox/Footer";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { t } from "static/condition";

import { selectCondition } from "redux/slices/formBuilder";
import { Group } from "./Group";
import ICondition from "types/form/condition";
import {
  useDeleteCondition,
  useGetConditions,
} from "call/actions/formBuider/condition";
import { selectors } from "redux/slices/formEditor/condition-editor";

interface Props {
  selectedCondition: ICondition;
}
export const ConditionMenu: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  const isValid = useAppSelector(selectors.getValidity);

  const { data } = useGetConditions({
    id: "iei",
    type: selectedCondition?.type,
  });
  const { mutateAsync: deleteCondition } = useDeleteCondition();

  const groups = data?.conditions.map((c: ICondition) => c.group);

  // TODO:
  const last_group = 0;
  // data && data?.conditions.length > 0
  //   ? Math.max(...data?.conditions.map((c: ICondition) => c.group))
  //   : 1;

  const isConditionTypePage = data?.conditions[0]?.type === "page";

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
        {!isValid && (
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
          disabled={!isValid}
          onSubmit={() => dispatch(selectCondition({}))}
          onCancel={() => {
            if (!isValid) {
              deleteCondition(selectedCondition.id);
            }
            dispatch(selectCondition({}));
          }}
        />
      </Box>
    </Box>
  );
};
