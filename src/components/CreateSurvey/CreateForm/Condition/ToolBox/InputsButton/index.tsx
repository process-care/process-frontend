import { v4 as uuidv4 } from "uuid";
import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";

import { inputs } from "@/constants/inputs.ts"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon/index.tsx"

interface Props {
  group?: "other" | "simple" | "complex";
  onSelect: (
    type: QuestionRedux["attributes"]["type"],
    id: string,
    internal_title: string | undefined
  ) => void;
}

const Category: React.FC<Props> = ({ onSelect, group }) => {
  const id = uuidv4();
  return (
    <ButtonGroup display="flex" spacing="2" w="100%" flexWrap="wrap">
      {inputs.map(({ type, name, category }, i) => {
        if (category === group) {
          return (
            <Button
              flex={["100%", "100%", "30%"]}
              display="flex"
              justifyContent="flex-start"
              variant="box"
              whiteSpace="normal"
              textAlign="left"
              key={i}
              py="25px"
              pl={2}
              onClick={() => onSelect(type, `${type}-${id}`, `${type}-${id}`)}
              fontSize="14px"
              maxWidth={["10px", "100%", "150px"]}
              // maxWidth="160px"
              // minWidth="160px"
            >
              <Box mr={2}>
                <InputIcon type={type} />
              </Box>
              {name}
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
};

export default function ToolBox({ onSelect }: Props): JSX.Element {
  const Title = ({ children }: { children: React.ReactNode }) => {
    return (
      <Text
        variant="xxs"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="normal"
        textAlign="left"
        mb="2"
        mt="2"
      >
        {children}
      </Text>
    );
  };
  return (
    <>
      <Title>Contenu statique</Title>
      <Category onSelect={onSelect} group="other" />
      <Title>Questions standards</Title>
      <Category onSelect={onSelect} group="simple" />
      <Title>Questions complexes</Title>
      <Category onSelect={onSelect} group="complex" />
    </>
  );
};
