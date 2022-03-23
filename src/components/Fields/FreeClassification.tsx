import React, { useEffect } from "react";
import { Textarea } from "components/Fields";
import { useField } from "formik";
import { Container, Text, Box } from "@chakra-ui/react";
import { Enum_Question_Rows, Maybe } from "api/graphql/types.generated";

interface Props {
  label: string;
  helpText?: string;
  placeholder: string;
  rows: Maybe<Enum_Question_Rows> | undefined;
  samples?: string[];
  nbSamples?: Maybe<number>;
  isRequired?: any;
  id: string;
  isCollapsed?: boolean;
  autoComplete?: string;
}

const DEFAULT_NB_SAMPLES = 4;

// ---- COMPONENT

export const FreeClassification: React.FC<Props> = ({
  id,
  label,
  helpText,
  placeholder,
  samples,
  nbSamples,
  rows,
  isRequired,
  isCollapsed,
}) => {
  const [field, , helpers] = useField(id);
  const [subTextarea] = useField(`${id}_textarea`);

  useEffect(() => {
    if (subTextarea.value === undefined) return;
    helpers.setValue({ ...field.value, answer: subTextarea.value });
  }, [subTextarea.value]);

  const choose = (idx: number) => {
    helpers.setValue({ ...field.value, choice: idx, variations: samples });
  };

  const Options = ({ choice }: { choice: number }) => {
    // If not enough samples, display nothing special
    if (!samples || samples.length < (nbSamples ?? DEFAULT_NB_SAMPLES)) {
      return null;
    }

    return (
      <Box>
        <Text pt="5" textAlign="left" variant="currentBold">
          Voici les réponses d'autres participants à cette question. Parmi celles-ci, lesquelles considérez-vous comme
          similaire à votre propre réponse ?
        </Text>
        {samples.map((item: string, idx: number) => {
          const isSelected = choice === idx;

          return (
            <Container
              key={idx}
              _hover={{ cursor: "pointer" }}
              borderColor={isSelected ? "brand.blue" : "inherit"}
              variant="inputContainer"
              onClick={() => choose(idx)}
              border="1px solid black"
            >
              <Text variant="current" textAlign="left">
                {item}
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
        id={`${id}_textarea`}
        isCollapsed={isCollapsed}
        rows={rows}
        label={label}
        placeholder={placeholder}
        isRequired={isRequired}
        helpText={helpText}
        defaultValue={field?.value?.answer}
      />
      {!isCollapsed && <Options choice={field?.value?.choice} />}
    </>
  );
};
