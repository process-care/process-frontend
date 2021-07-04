import React from "react";
import IRoute from "interfaces/routes/route";
import {
  useGetQuestions,
  useAddQuestion,
  useDeleteQuestion,
} from "api/actions/question";
import { useAddPage } from "api/actions/page";

import { useMutation } from "react-query";
import { Button } from "@chakra-ui/react";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";
// import { useGetSurveyById } from "api/actions/survey";
import { updateOrder } from "api/actions/survey";
import { queryClient } from "App";
import ISurvey from "interfaces/survey";

export interface INewOrder {
  id: string;
  new_order: string[];
}

export const Authentification: React.FC<IRoute> = () => {
  const [id] = React.useState("60deee11434ccc09b71924c6");
  const { mutate: updateOrders } = updateOrder();
  const [new_order] = React.useState(["999999999"]);

  const { data: questions } = useGetQuestions();

  // const { data: survey } = useQuery(["getSurveyById", id], () =>
  //   useGetSurveyById(id)
  // );

  const deleteQuestion = useMutation(
    ({ question_id }: { question_id: string }) =>
      useDeleteQuestion({ question_id }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries("getQuestions");
        const previousOrder: any | undefined =
          queryClient.getQueryData("getQuestions");
        if (previousOrder) {
          queryClient.setQueryData("getQuestions", {
            ...previousOrder,
            questions: [...previousOrder.questions, { questions }],
          });
        }
        return { previousOrder };
      },
      onError: (err, variables, context: any) => {
        if (context?.previousOrder) {
          queryClient.setQueryData<ISurvey>(
            "getQuestions",
            context.previousOrder
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("getQuestions");
      },
    }
  );

  const addQuestion = useMutation((values: Partial<IQuestion>) =>
    useAddQuestion(values)
  );
  const addPage = useMutation((values: Partial<IPage>) => useAddPage(values));

  const [question_id] = React.useState(
    questions?.questions[questions?.questions.length - 1].id
  );

  return (
    <div>
      {questions?.questions.map((el: any) => (
        <p>{el.id}</p>
      ))}

      <Button
        onClick={() => {
          addQuestion.mutate({
            label: "super label ",
            internal_title: "de ouf de ouf",
            placeholder: "dsds",
            help_text: "dsd",
            answers: ["oui", "non"],
            required: true,
          });
        }}
      >
        Add Question
      </Button>
      <Button
        onClick={() => {
          deleteQuestion.mutate({
            question_id,
          });
        }}
      >
        Delete Question
      </Button>
      <Button
        onClick={() => {
          updateOrders({
            id,
            new_order,
          });
        }}
      >
        Update Order
      </Button>
      <Button
        onClick={() => {
          addPage.mutate({
            name: "Ma super page",
            short_name: "M1",
          });
        }}
      >
        Add Page
      </Button>
    </div>
  );
};
