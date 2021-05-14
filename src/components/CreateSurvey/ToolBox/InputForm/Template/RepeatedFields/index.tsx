import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Input } from "components/Fields";
import { Button, Flex, Text, Box } from "@chakra-ui/react";

interface State {
  id: string;
  value: string;
}

const firstFieldId = uuidv4();
export const RepeatedFields: React.FC = () => {
  const initialResponse = [
    {
      id: firstFieldId,
      value: "",
    },
  ];

  const [state, setState] = React.useState<State[]>(initialResponse);

  const addInput = () => {
    setState([...state, { id: uuidv4(), value: "" }]);
  };

  const removeInput = (currentId: string) => {
    setState(state.filter((el) => el.id !== currentId));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      const { target } = event;
      const { value, name } = target;

      setState([
        ...state.map((el) => {
          return name === el.id ? { ...el, id: name, value } : { ...el };
        }),
      ]);
    }
  };

  return (
    <Flex flexDirection="column" w="100%">
      <Text mb={4} variant="label">
        Indiquez les choix de réponse
      </Text>
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Box w="85%">
          <Input
            label="Réponse 1"
            placeholder="Renseignez la réponse 1"
            type="text"
            name={firstFieldId}
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Button mt={6} onClick={() => addInput()} variant="solid">
          +
        </Button>
      </Flex>

      {state
        .filter((el) => el.id !== state[0].id)
        .map(({ id }, i) => {
          return (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              key={id}
              w="100%">
              <Box w="85%">
                <Input
                  label={`Réponse ${i + 2}`}
                  placeholder={`Renseigner la réponse ${i + 2}`}
                  type="text"
                  name={id}
                  onChange={(e) => handleChange(e)}
                />
              </Box>

              <Button mt={6} variant="solid" onClick={() => removeInput(id)}>
                -
              </Button>
            </Flex>
          );
        })}
    </Flex>
  );
};
