import React, { useEffect } from "react";
import { Box, Button, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react";
import IQuestion from "types/form/question";
import { v4 as uuidv4 } from "uuid";
import { Form, Formik } from "formik";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/application";
import { RenderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { useAssociatedLogic } from "./AssociatedClassification";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: IQuestion["factors"];
  maxLoop: string | undefined;
  mono_thumbnail_input: IQuestion["mono_thumbnail_input"];
}

const TOTAL_CARDS = 1;

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
