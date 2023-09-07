import { useMemo } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { operators, operatorsForMultiple } from "@/constants/operators.ts"
import { ConditionRedux } from "@/redux/slices/types/index.js"
import { checkIfMultiple } from "@/utils/formBuilder/input.ts"
import { useAppSelector } from "@/redux/hooks/index.js"
import { questionsSelectors } from "@/redux/slices/scientistData/question-editor.ts"
import Error from "@/components/Error/index.tsx"

interface Props {
  selectedCondition: ConditionRedux;
  updateStep: (d: any) => void;
}

export default function Step_2({ selectedCondition, updateStep }: Props): JSX.Element {
  const target_question = useAppSelector((state) => {
    if (!selectedCondition.attributes.target?.data?.id) return null
    return questionsSelectors.selectQuestionById(state, selectedCondition.attributes.target?.data?.id)
  })

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
            borderColor={isSelected ? "brand.blue" : "black"}
            _hover={{
              borderColor: "brand.blue",
              color: isSelected ? "white" : "brand.blue"
            }}
          >
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
