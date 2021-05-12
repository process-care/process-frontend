import { Input } from "components/Fields";
import React from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import CommonFields from "./CommonFields";

export const CheckboxFields: React.FC = () => {
  interface Response {
    id: string;
    value: string;
  }

  const initialResponse: Response = {
    id: "response0",
    value: "",
  };
  const [response, setResponse] = React.useState<Response[]>([initialResponse]);

  const addInput = (index: string) => {
    setResponse([...response, { id: `response${index}`, value: "" }]);
  };

  const removeInput = (index) => {
    const newResult = response.filter((el) => el.id !== index);
    console.log(index, newResult);
    setResponse(newResult);
  };

  console.log(response);

  return (
    <>
      <CommonFields />
      <Text variant="label">Indiquez les choix de réponse</Text>

      <Flex alignItems="center" justifyContent="space-between">
        <Box w="80%">
          <Input
            label=""
            placeholder="Renseignez la réponse 1"
            type="text"
            name="response0"
            id="response0"
            onChange={(e) => console.log(e.target.value)}
          />
        </Box>

        <Button
          onClick={() => addInput(response.length.toString())}
          variant="ghost">
          +
        </Button>
      </Flex>

      {response
        .filter((el) => el.id !== response[0].id)
        .map((el, i) => {
          return (
            <Flex alignItems="center" justifyContent="space-between" key={i}>
              <Box w="80%">
                <Input
                  label=""
                  placeholder={`Renseignez la réponse ${i + 2}`}
                  type="text"
                  name={Date.now().toString()}
                  id={`response${i}`}
                />
              </Box>

              <Button
                onClick={() => removeInput(`response${i}`)}
                variant="ghost">
                -
              </Button>
            </Flex>
          );
        })}
    </>
  );
};
