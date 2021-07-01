import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import ICondition from "interfaces/form/condition";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { updateCondition } from "redux/slices/formBuilder";
import { getInputById } from "utils/formBuilder/input";

export const renderInput = (
  selectedCondition: ICondition
): React.ReactElement => {
  const target_question = getInputById(selectedCondition.target_id);
  const Options = () => {
    const dispatch = useAppDispatch();

    const options =
      target_question?.options !== undefined &&
      Object.values(target_question?.options);
    if (!options) {
      return <p>Erreur, pas de réponses</p>;
    } else {
      return (
        <ul style={{ width: "100%" }}>
          {options.map((option) => (
            <InputBox
              isSelected={selectedCondition.target_value === option}
              isOptionMode
              option={option}
              onClick={() =>
                dispatch(
                  updateCondition({
                    id: selectedCondition.id,
                    data: {
                      target_value: option !== undefined ? option : "",
                      is_valid: true,
                    },
                  })
                )
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
    case "number-input":
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
