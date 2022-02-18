import { InputBox } from "components/CreateSurvey/CreateForm/InputsPreview/InputBox";
import { Input } from "components/Fields";
import { ConditionRedux } from "redux/slices/types";
import React from "react";
import { useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/scientistData";
import { Box } from "@chakra-ui/react";

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

export const renderInput = (selectedCondition: ConditionRedux): React.ReactElement | undefined => {
  const dispatch = useAppDispatch();

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actions.updateCondition({
        id: selectedCondition.id,
        changes: {
          attributes: { ...selectedCondition?.attributes, ...changes },
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
