import { useCallback } from "react";
import { Box } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions } from "@/redux/slices/scientistData";
import { ConditionRedux } from "@/redux/slices/types";
import { questionsSelectors } from "@/redux/slices/scientistData/question-editor";
import { Input } from "@/components/Fields";
import InputBox from "@/components/CreateSurvey/CreateForm/InputsPreview/InputBox";

// ---- TYPES

interface Props {
  selectedCondition: ConditionRedux
}

// ---- MAIN COMPONENT

export function RenderedInput ({ selectedCondition }: Props): React.ReactElement | undefined {
  const target_question = useAppSelector((state) =>
    questionsSelectors.selectQuestionById(state, selectedCondition.attributes.target?.data?.id)
  );

  switch (target_question?.attributes?.type) {
    case "radio": // Same as select
    case "checkbox": // Same as select
    case "select": return <Options target_question={target_question} selectedCondition={selectedCondition} />

    case "slider": // Same as number_input
    case "number_input": return <InputNumber />

    default:
      return <InputNumber />

  }
};

// ---- SUB COMPONENTS

// -- Options

interface OptionsProps {
  target_question?: any
  selectedCondition: ConditionRedux
}

function Options({ target_question , selectedCondition }: OptionsProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleUpdate = useCallback((changes: Record<string, any>) => {
    dispatch(
      actions.updateCondition({
        id: selectedCondition.id,
        changes: {
          attributes: {
            ...selectedCondition?.attributes,
            ...changes
          },
        },
      })
    );
  }, [dispatch, selectedCondition])

  const handleValidity = useCallback((bool: boolean) => {
    dispatch(actions.setValidityCondition(bool));
  }, [dispatch])

  const answers =
    target_question?.attributes?.options !== undefined
    && Object.values(target_question?.attributes?.options)

  if (!answers) return <p>Erreur, pas de réponses</p>

  return (
    <ul style={{ width: "100%" }}>
      {answers.map((option, idx) => (
        <InputBox
          key={idx}
          isSelected={selectedCondition?.attributes.target_value === option}
          isOptionMode
          option={option}
          onClick={() => {
            handleUpdate({
              target_value: option !== undefined ? option : "",
            });
            handleValidity(true);
          }}
        />
      ))}
    </ul>
  );
}

// -- InputNumber

const InputNumber = () => {
  return (
    <Box w="100%" mr="5">
      <Input
        type="number"
        appearance="big"
        name="target_value"
        label="Indiquer la valeur numérique"
        placeholder="Ex 5"
        isRequired
      />
    </Box>
  );
};