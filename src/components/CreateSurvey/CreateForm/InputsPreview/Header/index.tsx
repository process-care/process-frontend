import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { toggleCollapseView } from "redux/slices/formBuilder";
import { t } from "static/input";
import {
  selectors as selectorsQuestion,
  actions as actionsQuestion,
} from "redux/slices/formEditor/question-editor";
export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(
    (state) => state.formBuilder.is_collapse_view
  );

  const questions = useAppSelector(selectorsQuestion.getSelectedPageQuestions);
  const idsToDelete = questions.map((q) => q.id);
  const deleteAll = () => {
    idsToDelete.forEach((id) => {
      dispatch(actionsQuestion.delete(id));
    });
  };

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      alignItems="center"
      my="50px"
      pl="50px"
    >
      <ButtonGroup>
        <Button variant="link" fontSize="10px" onClick={deleteAll}>
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
