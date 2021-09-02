import { useUpdateCondition } from "call/actions/formBuider/condition";
import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import ICondition from "types/form/condition";
import React from "react";

export const renderInput = (
  currentCondition: Partial<ICondition>
): React.ReactElement => {
  const { mutateAsync: updateCondition } = useUpdateCondition();
  const target_question = currentCondition.target;
  const Options = () => {
    const answers =
      target_question?.answers !== undefined &&
      Object.values(target_question?.answers);
    if (!answers) {
      return <p>Erreur, pas de réponses</p>;
    } else {
      return (
        <ul style={{ width: "100%" }}>
          {answers.map((option) => (
            <InputBox
              isSelected={currentCondition.target_value === option}
              isOptionMode
              option={option}
              onClick={() =>
                updateCondition({
                  id: currentCondition.id,
                  data: {
                    target_value: option !== undefined ? option : "",
                    is_valid: true,
                  },
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
