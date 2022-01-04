import React from "react";
import { Textarea } from "components/Fields";
import { useField } from "formik";
import { Container, Text, Box } from "@chakra-ui/react";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  rows: "small" | "medium" | "large" | undefined;
  isRequired?: any;
  id: string;
  isCollapsed?: boolean;
  autoComplete?: string;
}

interface Mock {
  id: number;
  value: string;
}
const mock: Mock[] = [
  {
    id: 1,
    value: "Réponse aléatoire 1",
  },
  {
    id: 2,
    value: "Réponse aléatoire 2",
  },
  {
    id: 3,
    value: "Réponse aléatoire 3",
  },
  {
    id: 4,
    value: "Réponse aléatoire 4",
  },
];

export const FreeClassification: React.FC<Props> = ({
  label,
  helpText,
  placeholder,
  rows,
  isRequired,
  id,
  isCollapsed,
}) => {
  const [field, , helpers] = useField(id);
  const Options = () => {
    const post = (item: Mock) => {
      if (field.value) {
        if (field.value.includes(item.value)) {
          const newValues = field.value.filter(
            (value: string) => value !== item.value
          );

          helpers.setValue(newValues);
          return;
        }
        helpers.setValue([...field.value, item.value]);
      } else helpers.setValue([item.value]);
    };

    return (
      <Box>
        <Text pt="5" textAlign="left" variant="currentBold">
          Choississez une proposition qui vous semble être la plus proche de
          votre réponse
        </Text>
        {mock.map((item) => {
          const isSelected = field.value
            ? field.value.includes(item.value)
            : false;
          return (
            <Container
              _hover={{ cursor: "pointer" }}
              borderColor={isSelected ? "brand.blue" : "inherit"}
              variant="inputContainer"
              key={item.id}
              onClick={() => post(item)}
              border="1px solid black"
            >
              <Text variant="current" textAlign="left">
                {item.value}
              </Text>
            </Container>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <Textarea
        isCollapsed={isCollapsed}
        rows={rows}
        label={label}
        placeholder={placeholder}
        id={id}
        isRequired={isRequired === "true"}
        helpText={helpText}
        {...field}
      />
      {!isCollapsed && <Options />}
    </>
  );
};
