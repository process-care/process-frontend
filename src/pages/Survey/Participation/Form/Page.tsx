import React, { useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import {
  actions,
  selectors as pageSelectors,
} from "redux/slices/participation/page";

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
}) => {
  const dispatch = useAppDispatch();
  const { isTablet } = useMediaQueries();

  // Get page & content
  const page = useAppSelector((state) =>
    pageSelectors.selectById(state, pageId)
  );
  const { orderInPage, initialAnswers } = useInitialPageContent(page, order);

  // If page is empty
  if (!page) return <Box mt="60">{NL.msg.nodata}</Box>;

  // Final render
  return (
    <Box>
      <Text variant="xl" my="20px">
        {page.attributes.name ?? 'Missing page name 😣'}
      </Text>

      <Formik
        validateOnBlur
        validateOnMount
        enableReinitialize
        validationSchema={formSchema(page.attributes.questions?.data)}
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

              {/* Navigation */}
              <Flex
                justifyContent="flex-end"
                mt="10"
                mb="10"
                pr={isTablet ? "5%" : "10%"}
              >
                {!isFirstPage && (
                  <Button
                    mr="4"
                    variant="roundedTransparent"
                    onClick={previousPage}
                  >
                    {NL.button.previous}
                  </Button>
                )}
                {!isLastPage && (
                  <Button
                    disabled={!isValid}
                    variant="rounded"
                    backgroundColor={currentColor}
                    onClick={nextPage}
                  >
                    {NL.button.next}
                  </Button>
                )}
                {isLastPage && (
                  <Button
                    mb="20px"
                    disabled={!isValid}
                    variant="rounded"
                    backgroundColor={currentColor}
                    onClick={onFinish}
                  >
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
