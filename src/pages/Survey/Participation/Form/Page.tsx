import React, { useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { actions, selectors as pageSelectors } from "redux/slices/participation/page";
import { selectors as questionsSelectors } from "redux/slices/participation/questions";

import { selectors as ScientistDataSelectors } from "redux/slices/scientistData";

import { NL } from "../nl";
import { useInitialPageContent } from "./answer-hooks";
import { formSchema } from "./validation";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Questionator } from "./Questionator";
import { useMediaQueries } from "utils/hooks/mediaqueries";

// ---- TYPES

interface Props {
  pageId: string;
  participationId: string;
  order: string[];
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  currentColor: string;
  onFinish: () => void;
  isFailed: boolean;
}

// ---- COMPONENT

export const Page: React.FC<Props> = ({
  pageId,
  order,
  isFirstPage,
  isLastPage,
  nextPage,
  previousPage,
  currentColor,
  onFinish,
  isFailed,
}) => {
  const dispatch = useAppDispatch();
  const { isTablet } = useMediaQueries();

  const questions = useAppSelector((state) => questionsSelectors.selectAll(state)).filter(
    (q) => q?.attributes?.page?.data?.id === pageId
  );
  const page = useAppSelector((state) => pageSelectors.selectById(state, pageId));
  const { orderInPage, initialAnswers } = useInitialPageContent(page, order, questions);

  // If page is empty
  if (!page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      <Text variant="xl" my="20px">
        {page.attributes.name ?? "Missing page name 😣"}
      </Text>

      <Formik
        validateOnBlur
        validateOnMount
        enableReinitialize
        validationSchema={formSchema(questions)}
        initialValues={initialAnswers}
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
        }}
      >
        {({ isValid }) => {
          // Update the "submitable" status in redux (only if different)
          useEffect(() => {
            if (isValid === page.submitable) return;
            dispatch(actions.submitable({ id: pageId, submitable: isValid }));
          }, [isValid, pageId, page.submitable]);

          return (
            <Form>
              {/* Questions */}
              <Box px={isTablet ? "5%" : "10%"} pt="20px">
                {orderInPage.map((inputId: string) => (
                  <Questionator key={inputId} id={inputId} />
                ))}
              </Box>
              {isFailed && (
                <Box textAlign="right" mr="10%">
                  <Text color="red.500" variant="current">
                    {NL.msg.error}
                  </Text>
                </Box>
              )}
              {/* Navigation */}
              <Flex justifyContent="flex-end" mt="10" pb="20px" pr={isTablet ? "5%" : "10%"}>
                {!isFirstPage && (
                  <Button mr="4" variant="roundedTransparent" onClick={previousPage}>
                    {NL.button.previous}
                  </Button>
                )}
                {!isLastPage && (
                  <Button disabled={!isValid} variant="rounded" backgroundColor={currentColor} onClick={nextPage}>
                    {NL.button.next}
                  </Button>
                )}
                {isLastPage && (
                  <Button disabled={!isValid} variant="rounded" backgroundColor={currentColor} onClick={onFinish}>
                    {NL.button.finish}
                  </Button>
                )}
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
