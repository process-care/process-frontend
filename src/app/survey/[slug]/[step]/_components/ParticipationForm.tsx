'use client'

import { useCallback, useContext, useEffect, useState } from "react"
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation.js"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { actions } from "@/redux/slices/participation/status.js"
import { PageParticipationRedux, selectors } from "@/redux/slices/participation/page.js"
import { selectors as scientistDataSelectors } from "@/redux/slices/scientistData.js"
import { client } from "@/api/gql-client.js"
import { useSurveyQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { useFinishParticipationMutation } from "@/api/graphql/queries/participation.gql.generated.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { useLocalParticipation } from "@/utils/participations/localstorage-handlers.js"
import Error from "@/components/Error/index.tsx"
import Loader from "@/components/Spinner/index.tsx"
import ParticipationMenu from "./ParticipationMenu.tsx"
import Page from "./form/Page.tsx"

// ---- TYPES

interface Props {
  surveyId: string
  participationId: string
  mode: "preview" | "participant"
}

export enum DIRECTION {
  Next,
  Previous,
}

// ---- COMPONENT

export default function ParticipationForm({ surveyId, participationId, mode }: Props): JSX.Element {
  const { isTablet } = useMediaQueries()
  const router = useRouter()

  const dispatch = useAppDispatch()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const { data, isLoading, isError } = useSurveyQuery(client, { id: surveyId })
  const pages = useAppSelector(selectors.selectShown)
  const survey = useAppSelector(scientistDataSelectors.survey.getSelectedSurvey)
  const slug = survey.attributes.slug
  const attributes = data?.survey?.data?.attributes
  const currentColor = attributes?.landing?.data?.attributes?.color_theme?.button || "black"
  const order = attributes?.order

  // Effect to initialize the participation
  useEffect(() => {
    dispatch(actions.initialize({ surveyId, participationId, slug, mode }))
  }, [surveyId, participationId, dispatch, slug, mode])

  // Various handlers
  const { isFirstPage, isLastPage, selectedPage, nextPage, previousPage, selectIndex } = useNavigationHandlers(pages)
  const { onFinish } = useFinishHandler(participationId, slug)
  
  const handleSubmit = useCallback(() => {
    // If we're in preview mode, we don't need to save the participation
    if (mode === "preview") {
      setIsSuccess(true)
      return
    }

    // Otherwise, we save the participation
    onFinish()
      .then(() => {
        setIsSuccess(true)
      })
      .catch((err) => {
        setIsFailed(true);
        console.log(err);
      })
  }, [mode, onFinish])

  const handleExit = useCallback(() => {
    router.push(`/survey/${slug}/create/form`)
  }, [router, slug])

  // Missing data checks

  // Render loader
  if (isLoading || !selectedPage) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  // Render error
  if (isError || !data) {
    return (
      <Center>
        <Error message="Il n'y a pas de donnée sur le formulaire." />
      </Center>
    )
  }

  // Render success
  if (isSuccess) {
    return <ParticipationSaved />
  }

  // Render form
  return (
    <Box>
      <Flex
        direction={isTablet ? "column" : "row"}
        h={isTablet ? "100%" : "100vh"}
        backgroundColor={isTablet ? "gray.100" : attributes?.landing?.data?.attributes?.color_theme?.button || "black"}
      >
        <Center
          display="flex"
          flexDirection="column"
          w={isTablet ? "100%" : "30%"}
          minW={isTablet ? "100%" : "400px"}
          h="100%"
          backgroundColor={
            isTablet ? "gray.100" : attributes?.landing?.data?.attributes?.color_theme?.button || "black"
          }
          textAlign="left"
        >
          { mode === "preview" && (
            <Button variant="roundedBlue" pos="absolute" className="top-5" onClick={handleExit}>
              Retour à l&apos;édition
            </Button>
          )}

          <Box w="100%" pr="50px">
            <Text
              variant={isTablet ? "xl" : "xxl"}
              fontWeight="bold"
              color={isTablet ? "black" : "white"}
              p="20px"
              w="100%"
              lineHeight="1"
            >
              {attributes?.title}
            </Text>
          </Box>

          {!isTablet && (
            <Text variant="smallTitle" color="white" p="20px">
              {attributes?.description}
            </Text>
          )}
          
          <ParticipationMenu
            author={attributes?.author?.data?.attributes?.email}
            pages={pages}
            selectIndex={selectIndex}
            color={currentColor}
            selectedPage={selectedPage}
          />

          {!isTablet && (
            <Text
              variant="current"
              color="white"
              pos="absolute"
              left="0"
              right="0"
              bottom="20px"
              width="30%"
              textAlign="center"
              opacity="0.7"
            >
              <a
                href={`mailto:${attributes?.author?.data?.attributes?.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attributes?.author?.data?.attributes?.email}
              </a>
            </Text>
          )}
        </Center>

        <Box flexGrow={1} h="100%" backgroundColor="gray.100" overflow="auto">
          <Page
            isFailed={isFailed}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            currentColor={currentColor}
            previousPage={previousPage}
            nextPage={nextPage}
            onFinish={handleSubmit}
            pageId={selectedPage.id}
            participationId={participationId}
            order={order}
          />
        </Box>
      </Flex>
    </Box>
  )
}

// ---- HOOKS

function useFinishHandler(participationId: string, slug: string) {
  const { mutateAsync: finishParticipationApi } = useFinishParticipationMutation(client)
  const { finishParticipation } = useLocalParticipation(slug)

  const onFinish = useCallback(async () => {
    // Tell the API we're done and wait for it to be saved
    await finishParticipationApi({ id: participationId, completedAt: new Date() })
    finishParticipation()
  }, [finishParticipationApi, participationId, finishParticipation])

  return {
    onFinish,
  }
}

function useNavigationHandlers(pages: PageParticipationRedux[] | undefined) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const selectedPage = pages?.[selectedIdx]

  const onNavigate = useCallback(
    (direction: DIRECTION) => {
      let newIdx;
      const nbPages = pages?.length ?? 0

      if (direction === DIRECTION.Next) {
        const up = selectedIdx + 1
        newIdx = up > nbPages ? nbPages : up
      } else {
        const down = selectedIdx - 1
        newIdx = down < 0 ? 0 : down
      }

      setSelectedIdx(newIdx)
    },
    [pages?.length, selectedIdx]
  )

  const nextPage = useCallback(() => onNavigate(DIRECTION.Next), [onNavigate])
  const previousPage = useCallback(() => onNavigate(DIRECTION.Previous), [onNavigate])

  return {
    isFirstPage: selectedIdx === 0,
    isLastPage: selectedIdx + 1 === pages?.length,
    selectedPage,
    selectIndex: setSelectedIdx,
    nextPage,
    previousPage,
  }
}

// ---- SUB COMPONENTS

function ParticipationSaved() {
  const router = useRouter()
  const { isTablet } = useMediaQueries()

  return (
    <Center h="100vh" display="flex" flexDirection="column" backgroundColor="gray.100">
      <Box
        backgroundColor="white"
        p={isTablet ? "30px 20px" : "50px"}
        border="1px solid"
        borderColor="brand.line"
        w={isTablet ? "90%" : "600px"}
      >
        <Text variant="xl" mb="20px">
          🎉
        </Text>

        <Text>
          Votre participation à bien été enregistrée.<br/>
          Merci beaucoup !
        </Text>
      </Box>
    </Center>
  )
}