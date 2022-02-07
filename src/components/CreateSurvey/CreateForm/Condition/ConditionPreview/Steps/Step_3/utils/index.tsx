import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import { ConditionRedux } from "redux/slices/types";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/scientistData";

export const renderInput = (
  selectedCondition: ConditionRedux
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

  switch (target_question?.type) {
    case "select":
      return <Options />;
      break;
    case "slider":
      return (
        <Textarea
          rows="small"
          id="target_value"
          label="Indiquer la valeur numérique"
          placeholder="Ex 5"
          isRequired
        />
      );
      break;
    case "number_input":
      return (
        <Textarea
          rows="small"
          id="target_value"
          label="Indiquer la valeur numérique"
          placeholder="Ex 5"
          isRequired
        />
      );
      break;

    case "radio":
      return <Options />;
      break;
    case "checkbox":
      return <Options />;
      break;

    default:
      return (
        <Textarea
          rows="small"
          id="target_value"
          label="Indiquer la valeur numérique"
          placeholder="Ex 5"
          isRequired
        />
      );
      break;
  }
};
