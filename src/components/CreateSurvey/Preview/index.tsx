import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { formStore } from "stores/inputs";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Card/itemTypes";
import t from "static/preview.json";
import update from "immutability-helper";
import Inputs from "interfaces/inputs";

import { Formik, Form } from "formik";

export interface Item {
  id: number;
  name: string;
  type: string;
}
export interface PreviewState {
  cards: Item[];
}

const Preview: React.FC = () => {
  const inputsState = formStore((state) => state.form.inputs);
  const removeAllInputs = formStore((state) => state.removeAllInputs);
  const [cards, setCards] = React.useState(inputsState);

  React.useEffect(() => {
    setCards(inputsState);
  }, [inputsState]);

  const moveCard = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = (input: Inputs, index: number) => {
    return (
      <Card key={input.id} input={input} index={index} moveCard={moveCard} />
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const Container: React.FC = ({ children }) => {
    return (
      <Box
        ref={drop}
        bg={isOver ? "gray.200" : ""}
        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        h="100%"
        overflowY="auto"
        py={10}>
        <Formik
          initialValues={{}}
          onSubmit={(data) => {
            console.log(data);
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

  if (cards.length === 0) {
    return (
      <Container>
        <p>{t.no_inputs}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Button variant="box" onClick={removeAllInputs} mb={8}>
        {t.clear_all_fields}
      </Button>
      {cards.map((input, i) => renderCard(input, i))}
    </Container>
  );
};

export default Preview;