import { Button, ButtonGroup, Flex, Tooltip } from "@chakra-ui/react";

import { t } from "@/static/input.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { toggleCollapseView } from "@/redux/slices/formBuilder/index.ts"
import { selectors, actions } from "@/redux/slices/scientistData.js"
import { GanttChartSquareIcon, SquareIcon } from "lucide-react";

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
      pl="30px"
      pr="14px"
    >
      {order.length > 0 && (
        <Button variant="link" fontSize="10px" onClick={deleteAll}>
          {t.delete_all_inputs}
        </Button>
      )}
      
      <Tooltip placement="top" label={isCollapse ? t.expand_view : t.collapse_view}>
        <Button variant="ghost" onClick={() => dispatch(toggleCollapseView())}>
          { isCollapse
            ? <SquareIcon size={20} />
            : <GanttChartSquareIcon size={20} />
          }
        </Button>
      </Tooltip>
    </Flex>
  );
};
