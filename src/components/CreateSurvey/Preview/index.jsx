import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { formStore } from "stores/inputs";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./Card/itemTypes";
import update from "immutability-helper";

export interface Item {
  id: number;
  name: string;
  slug: string;
  uid: number;
}
export interface PreviewState {
  cards: Item[];
}

const Preview: React.FC = () => {
  const inputsState = formStore((state) => state.formState.inputs);
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

  const renderCard = (input: { id: number, name: string }, index: number) => {
    return (
      <Card
        key={input.id}
        id={input.id}
        name={input.name}
        index={index}
        moveCard={moveCard}
      />
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const Container: React.FC<> = ({ children }) => {
    return (
      <Box
        _hover={{ cursor: "grab" }}
        ref={drop}
        bg={isOver ? "gray.200" : ""}
        w="100%"
        d="flex"
        flexDirection="column"
        alignItems="center"
        h="100%"
        overflowY="scroll"
        p="10">
        {children}
      </Box>
    );
  };

  if (cards.length === 0) {
    return (
      <Container>
        <p>No Inputs</p>
      </Container>
    );
  }

  return (
    <Container>
      <Button variant="outline" onClick={removeAllInputs} mb={8}>
        Clear all fields
      </Button>

      {cards.map((input, i) => renderCard(input, i))}
    </Container>
  );
};

export default Preview;
