import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import ICondition from "types/form/condition";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/scientistData";
import { Box } from "@chakra-ui/react";

export const renderInput = (
  selectedCondition: ICondition
): React.ReactElement => {
  const dispatch = useAppDispatch();

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actions.updateCondition({
        id: selectedCondition.id,
        changes: {
          ...changes,
        },
      })
    );
  };

  const handleValidity = (bool: boolean) => {
    dispatch(actions.setValidityCondition(bool));
  };

  const target_question = selectedCondition.target;
  const Options = () => {
    const answers =
      target_question?.options !== undefined &&
      Object.values(target_question?.options);
    if (!answers) {
      return <p>Erreur, pas de réponses</p>;
    } else {
      return (
        <ul style={{ width: "100%" }}>
          {answers.map((option) => (
            <InputBox
              isSelected={selectedCondition.target_value === option}
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
  };

  const InputNumber = () => {
    return (
      <Box w="45%" mr="5">
        <Textarea
          rows="small"
          id="target_value"
          label="Indiquer la valeur numérique"
          placeholder="Ex 5"
          isRequired
        />
      </Box>
    );
  };

  switch (target_question?.type) {
    case "select":
      return <Options />;
      break;
    case "slider":
      return <InputNumber />;
      break;
    case "number_input":
      return <InputNumber />;
      break;

    case "radio":
      return <Options />;
      break;
    case "checkbox":
      return <Options />;
      break;

    default:
      return <InputNumber />;
      break;
  }
};
