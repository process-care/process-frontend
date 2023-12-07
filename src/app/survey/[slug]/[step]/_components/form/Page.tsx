import { useCallback, useEffect, useRef } from "react"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { PageParticipationRedux, actions, selectors as pageSelectors } from "@/redux/slices/participation/page.js"
import { selectors as questionsSelectors } from "@/redux/slices/participation/questions.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { NL } from "@/static/participation.js"
import { formSchema } from "./validation.js"
import { useInitialPageContent } from "./answer-hooks.js"
import Questionator from "./Questionator.tsx"

// ---- TYPES

type Props = {
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

export default function Page({
  pageId,
  order,
  isFirstPage,
  isLastPage,
  nextPage,
  previousPage,
  currentColor,
  onFinish,
  isFailed,
}:Props): JSX.Element {
  const { isTablet } = useMediaQueries()

  const questions = useAppSelector((state) => questionsSelectors.selectAll(state)).filter(
    (q) => q?.attributes?.page?.data?.id === pageId
  )
  const page = useAppSelector((state) => pageSelectors.selectById(state, pageId))
  const { orderInPage, initialAnswers } = useInitialPageContent(page, order, questions)

  const [formRef, nextPageWithScroll] = useTopScrollerWrapper(nextPage)

  // If page is empty
  if (!page) return <Box mt="60">{NL.msg.nodata}</Box>

  // Final render
  return (
    <Box overflow="auto" pt={isTablet ? "30px" : "60px"} ref={formRef}>
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
        {({ isValid }) => <DisplayForm
            page={page}
            orderInPage={orderInPage}
            isValid={isValid}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            nextPage={nextPageWithScroll}
            previousPage={previousPage}
            currentColor={currentColor}
            onFinish={onFinish}
            isFailed={isFailed}
          />
        }
      </Formik>
    </Box>
  )
}

// ---- SUB COMPONENTS

// NOTE: A lot of props are passed down from the parent without much changes,
// but this component has been created to encapsulate the hooks and the logic
// Reminder -> useEffect cannot be used in a loop...
interface DisplayFormProps {
  page: PageParticipationRedux
  orderInPage: string[]
  isValid: boolean
  isFirstPage: boolean
  isLastPage: boolean
  nextPage: () => void
  previousPage: () => void
  currentColor: string
  onFinish: () => void
  isFailed: boolean
}

function DisplayForm({
  page,
  orderInPage,
  isValid,
  isFirstPage,
  isLastPage,
  nextPage,
  previousPage,
  currentColor,
  onFinish,
  isFailed,
}: DisplayFormProps): JSX.Element {
  const dispatch = useAppDispatch()
  const { isTablet } = useMediaQueries()
  const pageId = page.id

  // Update the "submitable" status in redux (only if different)
  useEffect(() => {
    if (isValid === page.submitable) return
    dispatch(actions.submitable({ id: pageId, submitable: isValid }))
  }, [isValid, pageId, page.submitable, dispatch])

  return (
    <Form>
      {/* Questions */}
      <Box px={isTablet ? "20px" : "10%"}>
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
  )
}

// ---- HOOKS

function useTopScrollerWrapper(callback: () => void): [React.RefObject<HTMLDivElement>, () => void] {
  const targetRef = useRef<HTMLDivElement>(null)

  // Wrap `nextPage` with a scroll to top effect
  const wrapped = useCallback(() => {
    callback()
    targetRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    })
  }, [callback])

  return [targetRef, wrapped]
}