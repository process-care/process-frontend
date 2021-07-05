import React from "react";
import IRoute from "interfaces/routes/route";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "api/actions/question";
import { useAddPage } from "api/actions/page";

import { useMutation } from "react-query";
import { Button } from "@chakra-ui/react";
import IPage from "interfaces/form/page";
import { getSurveyById, updateOrder } from "api/actions/survey";

export const Authentification: React.FC<IRoute> = () => {
  const id = "60deee11434ccc09b71924c6";
  const new_order = ["999999999"];

  const { mutate: updateOrders } = updateOrder();
  const { mutate: addQuestions } = addQuestion();
  const { mutate: deleteQuestions } = deleteQuestion();
  const { mutate: updateQuestions } = updateQuestion();
  const { data: survey } = getSurveyById({ id });
  // const { data: questions } = useGetQuestions();
  const addPage = useMutation((values: Partial<IPage>) => useAddPage(values));

  return (
    <div>
      <p>{survey?.survey.pages[1]?.questions.length}</p>

      <Button
        onClick={() => {
          addQuestions({
            label: "Nouvelle Question",
            internal_title: "DDDD",
            placeholder: "DDDD",
            help_text: "DDDD",
            answers: ["oui", "non"],
            page: "60df00ac434ccc09b71924c9",
          });
        }}
      >
        Add Question
      </Button>
      <Button
        onClick={() => {
          deleteQuestions("60df1945434ccc09b71924d8");
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
          updateQuestions({
            id: "60df4fc56f32562c11e78df3",
            data: {
              label: "Nouvelle Question de oufffff !!!!",
              internal_title: "DDDD",
              placeholder: "DDDD",
              help_text: "DDDD",
              answers: ["oui", "non"],
              page: "60df00ac434ccc09b71924c9",
            },
          });
        }}
      >
        Update Question
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
