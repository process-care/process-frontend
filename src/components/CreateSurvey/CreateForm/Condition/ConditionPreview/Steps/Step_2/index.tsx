import { useMemo } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { operators, operatorsForMultiple } from "@/constants/operators";
import { ConditionRedux } from "@/redux/slices/types";
import { checkIfMultiple } from "@/utils/formBuilder/input";
import { useAppSelector } from "@/redux/hooks";
import { questionsSelectors } from "@/redux/slices/scientistData/question-editor";
import Error from "@/components/Error";

interface Props {
  selectedCondition: ConditionRedux;
  updateStep: (d: any) => void;
}

export default function Step_2({ selectedCondition, updateStep }: Props): JSX.Element {
  const target_question = useAppSelector((state) =>
    questionsSelectors.getQuestionById(state, selectedCondition.attributes.target?.data?.id)
  );

  const authorizedOperators = useMemo(() => {
    if (!target_question) return [];
    return checkIfMultiple(target_question) ? operatorsForMultiple : operators
    }, [target_question]
  );

  if (!target_question) {
    return <Error message="Une erreur s'est produite: cette condition ne possède pas de question cible... !" />;
  }

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
