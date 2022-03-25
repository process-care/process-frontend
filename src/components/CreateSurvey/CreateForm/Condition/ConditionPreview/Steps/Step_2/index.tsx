import React, { useMemo } from "react";

import { Button, Flex } from "@chakra-ui/react";
import { Error } from "components/Error";
import { operators, operatorsForMultiple } from "constants/operators";
import { ConditionRedux } from "redux/slices/types";
import { checkIfMultiple } from "utils/formBuilder/input";
import { useAppSelector } from "redux/hooks";
import { questionsSelectors } from "redux/slices/scientistData/question-editor";

interface Props {
  selectedCondition: ConditionRedux;
  updateStep: (d: any) => void;
}

export const Step_2: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const target_question = useAppSelector((state) =>
    questionsSelectors.getQuestionById(state, selectedCondition.attributes.target?.data?.id)
  );

  if (!target_question) {
    return <Error message="Une erreur s'est produite: cette condition ne possède pas de question cible... !" />;
  }

  const authorizedOperators = useMemo(
    () => (checkIfMultiple(target_question) ? operatorsForMultiple : operators),
    [target_question]
  );

  return (
    <Flex flexWrap="wrap" w="100%" justifyContent="center" alignItems="center">
      {authorizedOperators.map(({ id, name }) => {
        const isSelected = id === selectedCondition?.attributes?.operator;

        return (
          <Button
            onClick={() => updateStep({ operator: id })}
            key={id}
            variant="box"
            minW="200px"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Pb with props in theme ...
            isSelected={isSelected}
            _hover={{ borderColor: "brand.blue", color: "brand.blue" }}
          >
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
