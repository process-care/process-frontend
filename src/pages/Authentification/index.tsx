import React from "react";
import IRoute from "interfaces/routes/route";
import { useGetQuestions, useAddQuestion } from "api/actions/question";
import { useAddPage } from "api/actions/page";

import { useMutation, useQuery } from "react-query";
import { Button } from "@chakra-ui/react";
import IQuestion from "interfaces/form/question";
import IPage from "interfaces/form/page";
import { useGetSurveyById } from "api/actions/survey";

export const Authentification: React.FC<IRoute> = () => {
  const [id] = React.useState("60deee11434ccc09b71924c6");
  const { data } = useGetQuestions();

  const { data: survey } = useQuery(["getSurveyById", id], () =>
    useGetSurveyById(id)
  );

  const addQuestion = useMutation((values: Partial<IQuestion>) =>
    useAddQuestion(values)
  );
  const addPage = useMutation((values: Partial<IPage>) => useAddPage(values));

  console.log("SURVEY", survey);
  return (
    <div>
      {data?.questions.map((d: any) => (
        <>
          <p>{d.label}</p>
          <p>{d.id}</p>
        </>
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
