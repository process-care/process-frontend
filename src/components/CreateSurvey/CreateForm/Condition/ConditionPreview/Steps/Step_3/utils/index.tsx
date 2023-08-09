import { Box } from "@chakra-ui/react";

import { ConditionRedux } from "@/redux/slices/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { actions } from "@/redux/slices/scientistData";
import { questionsSelectors } from "@/redux/slices/scientistData/question-editor";
import { Input } from "@/components/Fields";
import InputBox from "@/components/CreateSurvey/CreateForm/InputsPreview/InputBox";

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

  const target_question = useAppSelector((state) =>
    questionsSelectors.selectQuestionById(state, selectedCondition.attributes.target?.data?.id)
  );

  const Options = () => {
    const answers =
      target_question?.attributes?.options !== undefined && Object.values(target_question?.attributes?.options);
    if (!answers) {
      return <p>Erreur, pas de réponses</p>;
    } else {
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
  };

  switch (target_question?.attributes?.type) {
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
