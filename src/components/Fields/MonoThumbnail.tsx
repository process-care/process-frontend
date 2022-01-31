import React, { useState, useEffect } from "react";
import { Box, Button, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Form, Formik, useField } from "formik";
import { useAppSelector } from "redux/hooks";
import { Maybe } from "api/graphql/types.generated";

interface Factor {
  modalities: {
    file: any;
    description: string;
  }[];
  title: string;
}
import { selectors } from "redux/slices/application";
import { RenderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: Factor[];
  maxLoop: Maybe<string> | undefined;
  mono_thumbnail_input: any;
}

interface State {
  variations: number[][][];
  isMounted: boolean;
}

const TOTAL_CARDS = 1;

// TODO: refactor this and use the same comp as the AssociatedClassification

export const MonoThumbnail: React.FC<Props> = ({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop = "5",
  name,
  mono_thumbnail_input,
}) => {
  const {
    generate,
    handleClick,
    state,
    filteredFactors,
    totalClick,
    maxVariations,
    isFinished,
  } = useAssociatedLogic(factors, name, maxLoop);
  const drawerIsOpen = useAppSelector(selectors.drawerIsOpen);

  const Card = ({ index }: { index: number }) => {
    if (filteredFactors === undefined) {
      return <></>;
    }

    return (
      <Box border="1px solid #E5E5E5" borderRadius="5px" mt="30px" w="60%">
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
    return (
      <Text variant="smallTitle">
        Nous avons bien pris en compte votre sélection !
      </Text>
    );
  }

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      {maxLoop && maxVariations >= 1 && (
        <Text mt="15px" fontSize="xs">
          {maxVariations > parseInt(maxLoop)
            ? `${totalClick} / ${parseInt(maxLoop) - 1}`
            : `${totalClick}  / ${Math.max(maxVariations) - 1}`}
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
            <Box mt="10">
              <Formik
                initialValues={{ ...mono_thumbnail_input }}
                onSubmit={() => console.log("")}
              >
                <Form>
                  {mono_thumbnail_input && (
                    <RenderInput input={mono_thumbnail_input} />
                  )}
                </Form>
              </Formik>
              <Box d="flex" justifyContent="flex-end" w="100%">
                <Button
                  type="button"
                  variant="rounded"
                  onClick={() => handleClick(0)}
                >
                  Valider ma réponse
                </Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssociatedLogic = (
  factors: Factor[],
  name: string,
  maxLoop: Maybe<string>
) => {
  const [field, , helpers] = useField(name);

  const [state, setState] = useState<State>({
    variations: [],
    isMounted: false,
  });
  const [totalClick, setClick] = useState(0);
  const filteredFactors = factors?.filter((f) => f !== null);
  const modalitiesPerFactor = filteredFactors
    ?.map((f) => f.modalities?.length)
    .filter((m) => m !== 0);
  const totalVariations = modalitiesPerFactor?.reduce((a, b) => a * b, 1);

  const getMaxVariation: any = (n: number, k: number) => {
    const factorialize: any = (num: number) => {
      if (num < 0) return -1;
      else if (num === 0) return 1;
      else {
        return num * factorialize(num - 1);
      }
    };

    const _A = (n: number, k: number) => {
      return factorialize(n) / factorialize(n - k);
    };

    return _A(n, k) / factorialize(k);
  };

  const maxVariations = React.useMemo(() => {
    if (totalVariations) return getMaxVariation(totalVariations, TOTAL_CARDS);
  }, [totalVariations]);

  const generate = () => {
    if (maxVariations - 1 === state.variations.length) {
      console.log("End of variations");
      return;
    }
    if (!modalitiesPerFactor) {
      return;
    }
    const randomize = () => {
      return modalitiesPerFactor?.map((m) => Math.floor(Math.random() * m));
    };

    const card1 = randomize();
    const card2 = randomize();

    const variation = [card1, card2];

    const cardsAreSame = (arrA: number[], arrB: number[]) => {
      return JSON.stringify(arrA) === JSON.stringify(arrB);
    };

    if (cardsAreSame(card1, card2)) {
      console.log("same cards");
      generate();
    } else if (
      state.variations.some(
        (v) => JSON.stringify(v) === JSON.stringify(variation)
      ) ||
      state.variations.some(
        (v) => JSON.stringify(v) === JSON.stringify(variation.reverse())
      )
    ) {
      console.log("Variation already exists");
      generate();
    } else {
      setState({
        ...state,
        variations: [...state.variations, variation],
        isMounted: true,
      });
    }
  };
  const handleClick = (cardIdx: number) => {
    generate();
    setClick(totalClick + 1);

    const formatPayload = () => {
      const lastVariation = state.variations[state.variations.length - 1];

      const format = (el: number) => {
        return filteredFactors?.map((f, idx) => {
          return {
            [f.title]: f.modalities[lastVariation[el][idx]].description,
          };
        });
      };

      // TODO: replace format(0) by dynamic value (come from TOTAL_CARDS)
      return {
        variations: [format(0), format(1)],
        choice: cardIdx,
      };
    };

    if (!field.value) {
      helpers.setValue([formatPayload()]);
    } else {
      helpers.setValue([...field.value, formatPayload()]);
    }
  };

  // TODO: refactor this
  const isFinished =
    totalClick + 1 ===
      (maxVariations - 1 > (typeof maxLoop === "string" && parseInt(maxLoop))
        ? maxLoop && parseInt(maxLoop)
        : maxVariations) ||
    field.value?.length ===
      ((maxLoop && parseInt(maxLoop) - 1) || maxVariations);
  return {
    generate,
    handleClick,
    setState,
    state,
    filteredFactors,
    totalClick,
    maxVariations,
    isFinished,
  };
};
