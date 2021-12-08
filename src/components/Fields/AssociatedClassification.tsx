import React, { useState, useEffect } from "react";
import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { v4 as uuidv4 } from "uuid";
import { Loader } from "components/Spinner";
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
  maxLoop,
}) => {
  const [state, setState] = useState<State>({
    variations: [],
    isMounted: false,
  });

  const totalClicked = state.variations.length - 1;
  const isFinished = totalClicked === (maxLoop && parseInt(maxLoop));
  const _f = factors?.filter((f) => f !== null);
  const _m = _f?.map((f) => f.modalities?.length);

  const generate = () => {
    if (!_m) {
      return;
    }
    const _a = _m?.map((m) => Math.floor(Math.random() * m));
    const _b = _m?.map((m) => Math.floor(Math.random() * m));
    const variation = [_a, _b];

    // if vignette _a === vignette _b, generate again
    if (JSON.stringify(_a) === JSON.stringify(_b)) {
      generate();
    }

    if (variation) {
      // if variation exist, generate again
      if (
        state.variations.some(
          (_v) => JSON.stringify(_v) === JSON.stringify(variation)
        )
      ) {
        console.log("IS SAME");
        generate();
      } else
        setState({
          variations: [...state.variations, variation],
          isMounted: true,
        });
    }
  };

  useEffect(() => {
    generate();
  }, []);

  const Card = ({
    factors,
    index,
  }: {
    factors: IQuestion["factors"];
    index: number;
  }) => {
    const filteredFactors = factors?.filter((f) => f !== null);

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
        onClick={() => generate()}
      >
        {filteredFactors.map((factor, idx) => {
          const _t = state.variations[state.variations.length - 1][index][idx];

          if (!factor.modalities) {
            return <></>;
          }

          return (
            <Box
              key={uuidv4()}
              p="20px"
              backgroundColor={idx % 2 == 0 ? "transparent" : "gray.100"}
            >
              <Text variant="currentBold" textTransform="uppercase" mt="10px">
                {factor?.title}
              </Text>

              <Text variant="xs">{factor?.modalities[_t]?.description}</Text>
            </Box>
          );
        })}
      </Box>
    );
  };

  if (!state.isMounted) {
    return <Loader />;
  }

  if (isFinished) {
    return <Text variant="smallTitle">Merci !</Text>;
  }

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Text mt="15px" fontSize="xs">
        {`${totalClicked} / ${maxLoop}`}
      </Text>
      {!isCollapsed && (
        <Flex flexDir="column">
          <Box>
            <Box d="flex" justifyContent="space-around" w="100%">
              {[...Array(TOTAL_CARDS)].map((_, i) => (
                <Card factors={factors} index={i} />
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
