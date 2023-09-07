import { Button, ButtonGroup, Flex } from "@chakra-ui/react";

import { t } from "@/static/input.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { toggleCollapseView } from "@/redux/slices/formBuilder/index.ts"
import { selectors, actions } from "@/redux/slices/scientistData.js"

export default function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector((state) => state.editor.form.isCollapseView)
  const order = useAppSelector(selectors.survey.getOrder);
  const questions = useAppSelector(selectors.questions.selectSelectedPageQuestions)
  const conditions = useAppSelector(selectors.conditions.selectAllQuestionsConditionsInSelectedPage)

  const idsToDelete = questions.map((q) => q.id);

  const deleteAll = () => {
    idsToDelete.forEach((id) => {
      dispatch(actions.deleteQuestion(id));
    });
    conditions.forEach((c) => {
      dispatch(actions.deleteCondition(c.id));
    });
  };

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      alignItems="center"
      mt="10px"
      mb="30px"
      pl="50px"
    >
      <ButtonGroup>
        {order.length > 0 && (
          <Button variant="link" fontSize="10px" onClick={deleteAll}>
            {t.delete_all_inputs}
          </Button>
        )}
      </ButtonGroup>
      
      <ButtonGroup>
        <Button variant="ghost" onClick={() => dispatch(toggleCollapseView())}>
          {isCollapse ? "-" : "="}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
