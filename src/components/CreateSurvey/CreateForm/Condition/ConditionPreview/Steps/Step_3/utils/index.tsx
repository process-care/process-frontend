import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Textarea } from "components/Fields";
import { ConditionRedux } from "redux/slices/types";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/scientistData";
import { Enum_Question_Rows } from "api/graphql/types.generated";

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

  const target_question = selectedCondition?.attributes.target;
  const Options = () => {
    const answers =
      target_question?.data?.attributes?.options !== undefined &&
      Object.values(target_question?.data?.attributes?.options);
    if (!answers) {
      return <p>Erreur, pas de réponses</p>;
    } else {
      return (
        <ul style={{ width: "100%" }}>
          {answers.map((option) => (
            <InputBox
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
  };

  switch (target_question?.data?.attributes?.type) {
    case "select":
      return <Options />;
      break;
    case "slider":
      return (
        <Textarea
          rows={Enum_Question_Rows.Small}
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
          rows={Enum_Question_Rows.Small}
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
          rows={Enum_Question_Rows.Small}
          id="target_value"
          label="Indiquer la valeur numérique"
          placeholder="Ex 5"
          isRequired
        />
      );
      break;
  }
};
