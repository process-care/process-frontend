import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { removeAllInputs, toggleCollapseView } from "redux/slices/formBuilder";
import { t } from "static/input";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(
    (state) => state.formBuilder.is_collapse_view
  );
  return (
    <Flex justifyContent="space-between" w="100%" alignItems="center" my="50px">
      <ButtonGroup>
        <Button variant="rounded" mr={5}>
          {t.verify}
        </Button>
        <Button
          variant="link"
          fontSize="10px"
          onClick={() => dispatch(removeAllInputs())}>
          {t.delete_all_inputs}
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="ghost" onClick={() => dispatch(toggleCollapseView())}>
          {isCollapse ? "-" : "="}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
