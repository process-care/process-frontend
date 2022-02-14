import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "./Card";

import { QuestionRedux } from "redux/slices/types";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Formik, Form } from "formik";
import { Header } from "./Header";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { selectors, actions } from "redux/slices/scientistData";

import { NoData } from "components/SurveyGrid/noData";

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
  order: QuestionRedux["id"][];
  surveyId: string;
}

const InputsPreview: React.FC<Props> = ({ order }) => {
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector(selectors.pages.getSelectedPage);

  const questions = useAppSelector(selectors.questions.getSelectedPageQuestions);
  const isLoading = useAppSelector(selectors.questions.isLoading);

  const error = useAppSelector(selectors.questions.error);

  const renderCard = (input: QuestionRedux, index: number) => {
    return <Card key={input.id} input={input} index={index} />;
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (order) {
      const new_input_order: string[] = Array.from(order);
      new_input_order.splice(source.index, 1);
      new_input_order.splice(destination.index, 0, draggableId);

      dispatch(actions.updateOrder(new_input_order));
    }
  };

  const Container: React.FC<ContainerProps> = ({ children, isDraggingOver }) => {
    return (
      <Box
        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        // h="90%"

        backgroundColor={isDraggingOver ? "brand.gray.100" : "transparent"}
        // overflowY="auto"
      >
        <Formik
          initialValues={{}}
          onSubmit={(data) => {
            console.log("DATA :", data);
          }}
        >
          {() => {
            return (
              <Form style={{ width: "100%" }}>
                <Flex alignItems="center" justifyContent="center" fontSize="30" flexDirection="column" px={10}>
                  {children}
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  };
  console.log("selectedPage", selectedPage);

  if (isLoading || order === undefined) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!selectedPage) {
    return <p>Une erreur est survenue (pas de page séléctionnée)</p>;
  }
  if ((!isLoading && order?.length === 0) || !order) {
    return <NoData content="Il n'y a pas encore de questions" />;
  }

  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId={selectedPage.id}>
          {(provided, snapshot) => (
            <>
              <Container isDraggingOver={snapshot.isDraggingOver}>
                <Text fontSize="14px" mt={3} textTransform="uppercase">
                  {selectedPage?.attributes?.name}
                </Text>
                {questions.length > 0 && <Header />}

                <Box w="100%" ref={provided.innerRef} {...provided.droppableProps}>
                  {order?.map((inputId: string, i: number) => {
                    const current = questions.find((c: any) => c.id === inputId);
                    if (current !== undefined) {
                      return renderCard(current, i);
                    } else return;
                  })}

                  {provided.placeholder}
                </Box>
              </Container>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default InputsPreview;
