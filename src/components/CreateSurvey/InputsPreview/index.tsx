import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "./Card";

import IInput from "interfaces/form/input";
import { useAppSelector, useAppDispatch } from "redux/hooks";

import { Formik, Form } from "formik";
import { Header } from "./Header";
import { selectInputsInCurrentPage, updateInputsOrder } from "redux/slices/formBuilder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

const InputsPreview: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputs = useAppSelector(selectInputsInCurrentPage);
  const { selected_page, input_order } = useAppSelector((state) => state.formBuilder);
  const [cards, setCards] = React.useState(inputs);

  React.useEffect(() => {
    setCards(inputs);
  }, [inputs]);


  const renderCard = (input: IInput, index: number) => {
    return (
      <Card key={input.id} input={input} index={index} />
    );
  };


  const onDragStart = () => {
    console.log("")
  }

  const onDragUpdate = () => {
    console.log("")
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

    const new_input_order = Array.from(input_order);
    new_input_order.splice(source.index, 1);
    new_input_order.splice(destination.index, 0, draggableId);
    dispatch(updateInputsOrder(new_input_order))
  };


  const Container: React.FC<ContainerProps> = ({ children, isDraggingOver }) => {
    return (
      <Box

        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        h="90%"
        pb={10}
        backgroundColor={isDraggingOver ? "brand.gray.100" : "transparent"}
        overflowY="auto">
        <Formik
          initialValues={{}}
          onSubmit={(data) => {
            console.log("DATA :", data);
          }}>
          {() => {
            return (
              <Form style={{ width: "100%" }}>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  fontSize="30"
                  flexDirection="column"
                  px={10}>
                  {children}
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Box>
    );
  };

  return (


    <DragDropContext onDragStart={() => onDragStart()}
      onDragUpdate={() => onDragUpdate()}
      onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId={selected_page.id}>
        {(provided, snapshot) => (
          <Container isDraggingOver={snapshot.isDraggingOver}>
            <Text fontSize="14px" mt={3} textTransform="uppercase">
              {selected_page.name}
            </Text>
            {cards.length > 0 && <Header />}

            <Box w="100%" ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              {input_order.map((inputId, i) => {
                const current = cards.find(c => c.id === inputId)
                if (current !== undefined) {
                  return renderCard(current, i)
                } else return

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
