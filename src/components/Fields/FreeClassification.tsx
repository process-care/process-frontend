import { useEffect, useState } from "react";
import { useField } from "formik";
import { Container, Text, Box } from "@chakra-ui/react";

import { Textarea } from "@/components/Fields";
import { Enum_Question_Rows, Maybe } from "@/api/graphql/types.generated";

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

export default function FreeClassification({
  id,
  label,
  helpText,
  placeholder,
  samples,
  nbSamples,
  rows,
  isRequired,
  isCollapsed,
}: Props): JSX.Element {
  const [field, , helpers] = useField(id);
  const [subTextarea] = useField(`${id}_textarea`);
  // Maintain an internal state as a Set (easy manipulation to avoid duplication)
  const [choices] = useState<Set<number>>(new Set(field?.value?.choices ?? []));

  // Update the textarea value when the something is typed
  useEffect(() => {
    if (subTextarea.value === undefined) return;
    helpers.setValue({ ...field.value, answer: subTextarea.value });
  }, [field.value, helpers, subTextarea.value]);

  // Use samples initialization to init the field with all default values
  useEffect(() => {
    const newValue = { ...field.value, variations: samples };
    if (!field?.value?.choices) newValue.choices = [];
    if (!field?.value?.answer) newValue.answer = "";
    helpers.setValue({ ...newValue });
  }, [field.value, helpers, samples]);

  // Update the internal state on clicks, then update the field with raw values
  const onClickChoice = (idx: number) => {
    if (choices.has(idx)) choices.delete(idx);
    else choices.add(idx);
    helpers.setValue({ ...field.value, choices: [...choices] });
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
      {!isCollapsed && (
        <Options choices={choices} samples={samples} nbSamples={nbSamples} onClickChoice={onClickChoice} />
      )}
    </>
  );
};

// ---- SUB COMPONENTS

type OptionsProps = {
  samples: string[] | undefined;
  nbSamples: number | undefined | null;
  choices: Set<number>;
  onClickChoice: (idx: number) => void;
};

const Options: React.FC<OptionsProps> = ({ choices, samples, nbSamples, onClickChoice }) => {
  // If not enough samples, display nothing special
  if (!samples || samples.length < (nbSamples ?? DEFAULT_NB_SAMPLES)) {
    return <></>;
  }

  return (
    <Box>
      <Text pt="5" textAlign="left" variant="currentBold">
        Voici les réponses d&apos;autres participants à cette question. Parmi celles-ci, lesquelles considérez-vous comme
        similaire à votre propre réponse ?
      </Text>
      {samples.map((item: string, idx: number) => {
        const isSelected = choices.has(idx);

        return (
          <Container
            key={idx}
            _hover={{ cursor: "pointer" }}
            borderColor={isSelected ? "brand.blue" : "inherit"}
            variant="inputContainer"
            onClick={() => onClickChoice(idx)}
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
