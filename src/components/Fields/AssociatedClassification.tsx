import React, { useState, useEffect } from "react";
import { Box, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { v4 as uuidv4 } from "uuid";
import { useField } from "formik";
import { useAppSelector } from "redux/hooks";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: IQuestion["factors"];
  maxLoop: string | undefined;
}

interface State {
  variations: number[][][];
  isMounted: boolean;
}

const TOTAL_CARDS = 2;

export const AssociatedClassification: React.FC<Props> = ({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop = "5",
  name,
}) => {
  const { generate, handleClick, state, filteredFactors, count } =
    useAssociatedLogic(factors, name);
  const drawerIsOpen = useAppSelector(
    (state) => state.application.drawerIsOpen
  );

  const isFinished = count === (maxLoop && parseInt(maxLoop));

  const Card = ({ index }: { index: number }) => {
    if (filteredFactors === undefined) {
      return <></>;
    }

    return (
      <Box
        border="1px solid #E5E5E5"
        borderRadius="5px"
        mt="30px"
        w="40%"
        _hover={{ border: "1px solid black", cursor: "pointer" }}
        onClick={() => handleClick(index)}
      >
        {filteredFactors.map((factor, idx) => {
          const random =
            state.variations.length > 0
              ? state.variations[state.variations.length - 1][index][idx]
              : 0;

          return (
            <Box
              key={uuidv4()}
              p="20px"
              backgroundColor={idx % 2 == 0 ? "transparent" : "gray.100"}
            >
              {filteredFactors.length > 1 && (
                <Text variant="currentBold" textTransform="uppercase" mt="10px">
                  {factor?.title}
                </Text>
              )}

              {!factor.modalities ? (
                <Spinner size="xs" bottom="5px" pos="relative" />
              ) : (
                <Box>
                  {factor?.modalities[random]?.file && (
                    <img
                      src={factor?.modalities[random]?.file}
                      alt={factor?.modalities[random]?.description}
                      style={{ maxWidth: "30px", margin: "0 auto" }}
                    />
                  )}
                  <Text variant="xs">
                    {factor?.modalities[random]?.description}
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    );
  };

  useEffect(() => {
    // Generate only if drawer is close (mean no adding new factors /modalities)
    !drawerIsOpen && generate();
  }, [drawerIsOpen]);

  if (isFinished) {
    return <Text variant="smallTitle">Merci !</Text>;
  }
  console.log(maxLoop);
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      {maxLoop && (
        <Text mt="15px" fontSize="xs">
          {`${count} / ${maxLoop}`}
        </Text>
      )}
      {!isCollapsed && (
        <Flex flexDir="column">
          <Box>
            <Box d="flex" justifyContent="space-around" w="100%">
              {[...Array(TOTAL_CARDS)].map((_, i) => (
                <Card index={i} key={i} />
              ))}
            </Box>
            <Text mt="15px" fontSize="xs">
              {helpText}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssociatedLogic = (
  factors: IQuestion["factors"],
  name: string
) => {
  const [field, , helpers] = useField(name);

  const [state, setState] = useState<State>({
    variations: [],
    isMounted: false,
  });
  const [count, setCount] = useState(0);
  const filteredFactors = factors?.filter((f) => f !== null);
  const modalitiesPerFactorCount = filteredFactors?.map(
    (f) => f.modalities?.length
  );

  const generate = () => {
    if (!modalitiesPerFactorCount) {
      return;
    }

    const varA = modalitiesPerFactorCount?.map((m) =>
      Math.floor(Math.random() * m)
    );
    const varB = modalitiesPerFactorCount?.map((m) =>
      Math.floor(Math.random() * m)
    );
    const pair = [varA, varB];

    // if variation A === variation B, generate again
    if (JSON.stringify(varA) === JSON.stringify(varB)) {
      console.log("GENERATE AGAIN");
      // generate();
    }

    if (pair) {
      // if variation exist, generate again
      if (
        state.variations.some(
          (_v) => JSON.stringify(_v) === JSON.stringify(pair)
        )
      ) {
        console.log("IS SAME");
        generate();
      } else
        setState({
          ...state,
          variations: [...state.variations, pair],
          isMounted: true,
        });
    }
  };
  const handleClick = (index: number) => {
    generate();
    setCount(count + 1);

    const formatPayload = () => {
      return {
        variations: filteredFactors?.map((f, idx) => {
          const _t = state.variations[state.variations.length - 1][index][idx];
          return {
            [f.title]: f?.modalities[_t]?.description,
          };
        }),
        choice: index,
      };
    };
    if (!field.value) {
      helpers.setValue([formatPayload()]);
    } else {
      helpers.setValue([...field.value, formatPayload()]);
    }
  };

  return {
    generate,
    handleClick,
    setState,
    state,
    filteredFactors,
    count,
  };
};
