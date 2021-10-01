import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "./Card";

import IQuestion from "types/form/question";
import { useAppSelector } from "redux/hooks";

import { Formik, Form } from "formik";
import { Header } from "./Header";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useGetQuestions } from "call/actions/formBuider/question";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { useGetSurvey, useUpdateOrder } from "call/actions/survey";
import { selectors } from "redux/slices/page-editor";

export interface Item {
  id: number;
  name: string;
  type: string;
}
export interface PreviewState {
  cards: Item[];
}
export interface ContainerProps {
  children: any;
  isDraggingOver: boolean;
}

interface Props {
  order: IQuestion["id"][];
  surveyId: string;
}

const InputsPreview: React.FC<Props> = ({ surveyId, order }) => {
  const selectedPage = useAppSelector(selectors.getSelectedPage);

  const {
    data: questions,
    isLoading,
    error,
  } = useGetQuestions(selectedPage?.id);
  const { data: survey } = useGetSurvey(surveyId);
  const { mutateAsync: updateOrder } = useUpdateOrder("updateOrder");

  const renderCard = (input: IQuestion, index: number) => {
    if (!survey) return null;
    return (
      <Card
        key={input.id}
        input={input}
        index={index}
        survey={survey?.survey}
      />
    );
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (order) {
      const new_input_order: string[] = Array.from(order);
      new_input_order.splice(source.index, 1);
      new_input_order.splice(destination.index, 0, draggableId);

      updateOrder({
        id: survey?.survey.id,
        new_order: new_input_order,
      });
    }
  };

  const Container: React.FC<ContainerProps> = ({
    children,
    isDraggingOver,
  }) => {
    return (
      <Box
        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        h="90%"
        pb={10}
        backgroundColor={isDraggingOver ? "brand.gray.100" : "transparent"}
        overflowY="auto"
      >
        <Formik
          // initialValues={
          //   questions?.questions
          //     ? questions?.questions.map((q) => {
          //         return {
          //           [q.id]: "",
          //         };
          //       })
          //     : {}
          // }
          initialValues={{}}
          onSubmit={(data) => {
            console.log("DATA :", data);
          }}
        >
          {() => {
            return (
              <Form style={{ width: "100%" }}>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  fontSize="30"
                  flexDirection="column"
                  px={10}
                >
                  {children}
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  };

  if (isLoading || order === undefined) {
    return (
      <Box pt="400px">
        <Loader />
      </Box>
    );
  }
  if (error) {
    return <Error error={error} />;
  }

  if (!selectedPage) {
    return <p>no selected page</p>;
  }
  if (!questions?.questions) {
    return <div>No Questions ...</div>;
  }
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId={selectedPage.id}>
        {(provided, snapshot) => (
          <Container isDraggingOver={snapshot.isDraggingOver}>
            <Text fontSize="14px" mt={3} textTransform="uppercase">
              {selectedPage?.name}
            </Text>
            {questions?.questions?.length > 0 && <Header />}

            <Box w="100%" ref={provided.innerRef} {...provided.droppableProps}>
              {order?.map((inputId: string, i: number) => {
                const current = questions?.questions?.find(
                  (c: any) => c.id === inputId
                );
                if (current !== undefined) {
                  return renderCard(current, i);
                } else return;
              })}

              {provided.placeholder}
            </Box>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default InputsPreview;
