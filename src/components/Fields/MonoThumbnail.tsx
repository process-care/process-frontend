import React, { useEffect, useState } from "react";
import { Box, Button, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Form, Formik } from "formik";
import { useAppSelector } from "redux/hooks";

interface Factor {
  modalities: {
    file: any;
    description: string;
  }[];
  title: string;
}
import { selectors } from "redux/slices/application";
import { RenderInput } from "components/CreateSurvey/CreateForm/InputsPreview/Card/utils";
import { useAssociatedLogic } from "./hooks";
import { TitleDivider } from "components/TitleDivider";
import { QuestionRedux } from "redux/slices/types";
import { Maybe } from "api/graphql/types.generated";

interface Props {
  label: string;
  helpText?: string;
  name: string;
  isCollapsed?: boolean;
  factors: Factor[];
  maxLoop: Maybe<number> | undefined;
  associated_input: Record<string, unknown>;
}

const TOTAL_CARDS = 1;

export const MonoThumbnail: React.FC<Props> = ({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop = 5,
  name,
  associated_input,
}) => {
  const [mount, setMount] = useState(true);

  const { generate, handleClick, state, filteredFactors, totalClick, maxVariations, isFinished } = useAssociatedLogic(
    factors,
    name,
    maxLoop,
    TOTAL_CARDS
  );
  const drawerIsOpen = useAppSelector(selectors.drawerIsOpen);
  const Card = ({ index }: { index: number }) => {
    if (filteredFactors === undefined) {
      return <></>;
    }

    return (
      <Box border="1px solid #E5E5E5" borderRadius="5px" mt="30px" w="60%">
        {filteredFactors.map((factor, idx) => {
          const random = state.variations.length > 0 ? state.variations[state.variations.length - 1][index][idx] : 0;

          return (
            <Box key={uuidv4()} p="20px" backgroundColor={idx % 2 == 0 ? "transparent" : "gray.100"}>
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
  const sanitizeMono = {
    id: associated_input?.type,
    attributes: {
      ...associated_input,
    },
  } as QuestionRedux;

  useEffect(() => {
    // Generate only if drawer is close (mean no adding new factors /modalities)
    !drawerIsOpen && generate();
  }, [drawerIsOpen]);

  useEffect(() => {
    // Force re render to reset the field on select change
    setMount(true);
  }, [sanitizeMono]);

  if (isFinished && !drawerIsOpen) {
    return <Text variant="smallTitle">Nous avons bien pris en compte votre sélection !</Text>;
  }

  if (!mount) return <></>;
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
            <Box d="flex" justifyContent="space-around" w="100%">
              {[...Array(TOTAL_CARDS)].map((_, i) => (
                <Card index={i} key={i} />
              ))}
            </Box>
            <Text mt="15px" fontSize="xs">
              {helpText}
            </Text>
            <TitleDivider title="" />
            <Box>
              <Formik initialValues={{ ...sanitizeMono }} onSubmit={() => console.log("")}>
                {({ values }) => {
                  const validate = (values: QuestionRedux) => {
                    setMount(false);
                    handleClick(0, values);
                  };
                  return (
                    <Form>
                      {sanitizeMono && (
                        <Box p="0 5%">
                          <RenderInput input={sanitizeMono} />
                        </Box>
                      )}
                      <Box d="flex" justifyContent="flex-end" w="100%" mt="20px" pr="30px">
                        <Button type="button" variant="rounded" onClick={() => validate(values)}>
                          Valider ma réponse
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};
