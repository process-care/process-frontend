import { InputBox } from "components/CreateSurvey/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import ICondition from "interfaces/form/condition";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { updateCondition } from "redux/slices/formBuilder";

export const renderInput = (
  selectedCondition: ICondition
): React.ReactElement => {
  const Input = () => (
    <Textarea
      rows="small"
      id="target_value"
      label="Indiquer la valeur numérique"
      placeholder="Ex 5"
      isRequired
    />
  );

  const Options = () => {
    const dispatch = useAppDispatch();

    const options =
      selectedCondition.selected_question?.options !== undefined &&
      Object.values(selectedCondition.selected_question?.options);
    if (!options) {
      return <p>Erreur, pas de réponses</p>;
    } else {
      return (
        <ul>
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

  switch (selectedCondition.selected_question?.input_type) {
    case "select":
      return <Options />;
      break;
    case "slider":
      return <Input />;
      break;
    case "number-input":
      return <Input />;
      break;

    case "radio":
      return <Options />;
      break;
    case "checkbox":
      return <Options />;
      break;

    default:
      return <Input />;
      break;
  }
};
