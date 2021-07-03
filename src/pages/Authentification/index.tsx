import React from "react";
import IRoute from "interfaces/routes/route";
import { useGetQuestions, useAddQuestion } from "queries/call";
import { useMutation } from "react-query";
import { Button } from "@chakra-ui/react";
import { queryClient } from "App";

export const Authentification: React.FC<IRoute> = () => {
  const { data } = useGetQuestions();
  const addQuestion = useMutation(useAddQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("getQuestions");
    },
  });

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
          addQuestion.mutate();
        }}
      >
        Add
      </Button>
    </div>
  );
};
