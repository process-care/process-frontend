import React, { useEffect, useState } from "react";
import { Box, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/application";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { useAssociatedLogic } from "./hooks";
import { Maybe } from "api/graphql/types.generated";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: Factor[];
  maxLoop: Maybe<number> | undefined;
}

interface Factor {
  modalities: {
    file: any;
    description: string;
  }[];
  title: string;
}

const TOTAL_CARDS = 2;

export const AssociatedClassification: React.FC<Props> = ({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop = 5,
  name,
}) => {
  const { isTablet } = useMediaQueries();
  const { generate, handleClick, state, filteredFactors, totalClick, maxVariations, isFinished } = useAssociatedLogic(
    factors,
    name,
    maxLoop,
    TOTAL_CARDS
  );

  const [selected, setSelected] = useState<number | null>(null);
  const drawerIsOpen = useAppSelector(selectors.drawerIsOpen);

  const Card = ({ index }: { index: number }) => {
    if (filteredFactors === undefined) {
      return <></>;
    }

    const handleSelect = (index: number) => {
      setSelected(index);
      setTimeout(() => {
        handleClick(index);
        setSelected(null);
      }, 500);
    };

    return (
      <Box
        border={`${selected === index ? "1px solid blue" : "1px solid #E5E5E5"} `}
        backgroundColor={`${selected === index ? " blue" : ""} `}
        color={`${selected === index ? " white" : "black"} `}
        borderRadius="5px"
        mt="30px"
        w={isTablet ? "100%" : "40%"}
        pos="relative"
        top="0"
        transition="all .2s ease-in-out"
        _hover={{
          border: "1px solid #9f9f9f",
          cursor: "pointer",
        }}
        onClick={() => handleSelect(index)}
      >
        {filteredFactors.map((factor, idx) => {
          const random = state.variations.length > 0 ? state.variations[state.variations.length - 1][index][idx] : 0;

          return (
            <Box
              key={uuidv4()}
              p="20px"
              backgroundColor={selected === index ? "blue" : idx % 2 == 0 ? "transparent" : "gray.100"}
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
                  <Text variant="xs">{factor?.modalities[random]?.description}</Text>
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
    return <Text variant="smallTitle">Nous avons bien pris en compte votre sélection !</Text>;
  }
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      {maxLoop && maxVariations >= 1 && (
        <Text mt="15px" fontSize="xs">
          {maxVariations > maxLoop ? `${totalClick} / ${maxLoop}` : `${totalClick}  / ${Math.max(maxVariations)}`}
        </Text>
      )}
      {!isCollapsed && (
        <Flex flexDir="column">
          <Box>
            <Box d="flex" justifyContent="space-around" flexDirection={isTablet ? "column" : "row"} w="100%">
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
