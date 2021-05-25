import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Card/itemTypes";

import update from "immutability-helper";
import Inputs from "interfaces/inputs";
import { useAppSelector } from "redux/hooks";
import { selectInputs } from "redux/slices/formBuilder";

import { Formik, Form } from "formik";
import { Header } from "./Header";

export interface Item {
  id: number;
  name: string;
  type: string;
}
export interface PreviewState {
  cards: Item[];
}

const Preview: React.FC = () => {
  const { inputs } = useAppSelector(selectInputs);

  const [cards, setCards] = React.useState(inputs);

  React.useEffect(() => {
    setCards(inputs);
  }, [inputs]);

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

  // if (cards.length === 0) {
  //   return (
  //     <Container>
  //       <p>{t.no_inputs}</p>
  //     </Container>
  //   );
  // }

  return (
    <Container>
      {cards.length > 0 && <Header />}

      {cards.map((input, i) => renderCard(input, i))}
    </Container>
  );
};

export default Preview;
