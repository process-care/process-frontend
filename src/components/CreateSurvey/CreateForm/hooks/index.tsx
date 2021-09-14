import { useDeleteCondition } from "call/actions/formBuider/condition";
import { useDeleteQuestion } from "call/actions/formBuider/question";
import { useUpdateOrder } from "call/actions/survey";
import IQuestion from "types/form/question";
import ISurvey from "types/survey";

export const useQuestionChain: any = (input: IQuestion, survey: ISurvey) => {
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();
  const { mutateAsync: deleteCondition } = useDeleteCondition();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const deleteQuestionChain = async () => {
    await deleteQuestion(input.id);
    const new_order = survey?.order.filter((id) => id !== input.id);
    await updateOrder({ id: survey?.id, new_order });

    if (input?.conditions && input?.conditions?.length > 0) {
      input.conditions.map((c) => {
        deleteCondition(c.id);
      });
    }
  };
  return {
    deleteQuestionChain,
  };
};
