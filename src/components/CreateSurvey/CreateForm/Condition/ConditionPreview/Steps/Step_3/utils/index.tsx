import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import ICondition from "types/form/condition";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { actions as actionsCondition } from "redux/slices/formEditor/condition-editor";

export const renderInput = (
  selectedCondition: ICondition
): React.ReactElement => {
  const dispatch = useAppDispatch();

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actionsCondition.update({
        id: selectedCondition.id,
        changes: {
          ...changes,
        },
      })
    );
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
              onClick={() =>
                handleUpdate({
                  target_value: option !== undefined ? option : "",
                  is_valid: true,
                })
              }
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
