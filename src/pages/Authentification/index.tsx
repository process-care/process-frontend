import React from "react";
import IRoute from "interfaces/routes/route";
// import {
//   addQuestion,
//   deleteQuestion,
//   updateQuestion,
// } from "api/actions/question";
// import { addPage, deletePage, updatePage } from "api/actions/page";

// import { useMutation } from "react-query";
// import { Button } from "@chakra-ui/react";
// import IPage from "interfaces/form/page";
// import {
//   addSurvey,
//   deleteSurvey,
//   getSurvey,
//   updateOrder,
// } from "api/actions/survey";
// import { addCondition } from "api/actions/condition";

export const Authentification: React.FC<IRoute> = () => {
  // const id = "60deee11434ccc09b71924c6";
  // const new_order = ["999999999"];

  // const { mutate: updateOrders } = updateOrder();
  // const { mutate: addQuestions } = addQuestion();
  // const { mutate: deleteQuestions } = deleteQuestion();
  // const { mutate: updateQuestions } = updateQuestion();
  // const { mutate: addPages } = addPage();
  // const { mutate: updatePages } = updatePage();
  // const { mutate: deletePages } = deletePage();
  // const { mutate: deleteSurveys } = deleteSurvey();
  // const { mutate: addSurveys } = addSurvey();
  // const { mutate: addConditions } = addCondition();

  // const { data: survey } = getSurvey({ id });
  // const { data: questions } = useGetQuestions();

  return (
    <div>
      Authentification
      {/* <p>{survey?.survey?.pages[0]?.name}</p>
      <Button
        onClick={() => {
          addConditions({
            operator: "equal",
            target_value: "plif",
            group: "444444444",
            referer: "60e2f7f77fa4044c102a8830",
          });
        }}
      >
        Add Condition
      </Button>
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
          addSurveys({
            description: "New Survey",
          });
        }}
      >
        Add Survey
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
          deleteSurveys("60deee11434ccc09b71924c6");
        }}
      >
        Delete Survey
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
          addPages({
            name: "Ma super page",
            short_name: "M1",
            survey: id,
          });
        }}
      >
        Add Page
      </Button>
      <Button
        onClick={() => {
          deletePages("60def25a434ccc09b71924c7");
        }}
      >
        Delete Page
      </Button>
      <Button
        onClick={() => {
          updatePages({
            id: "60def25a434ccc09b71924c7",
            data: {
              name: "Youpi",
            },
          });
        }}
      >
        Update Page
      </Button> */}
    </div>
  );
};
