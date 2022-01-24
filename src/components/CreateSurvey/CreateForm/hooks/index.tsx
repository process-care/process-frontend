import { useDeleteCondition } from "call/actions/formBuider/condition";
import { useDeleteQuestion } from "call/actions/formBuider/question";
import { useUpdateOrder } from "call/actions/survey";
import IQuestion from "types/form/question";
import { Survey } from "types/survey";

export const useQuestionChain: any = (
  selectedQuestion: IQuestion,
  survey: Survey
) => {
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const { mutateAsync: deleteCondition } = useDeleteCondition();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const deleteQuestionChain = async () => {
    await deleteQuestion(selectedQuestion.id);
    const new_order = survey?.order.filter((id) => id !== selectedQuestion.id);
    await updateOrder({ id: survey?.id, new_order });

    if (
      selectedQuestion?.conditions &&
      selectedQuestion?.conditions?.length > 0
    ) {
      selectedQuestion.conditions.map((c) => {
        deleteCondition(c.id);
      });
    }
  };
  return {
    deleteQuestionChain,
  };
};
