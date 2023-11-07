'use client'

import { useCallback } from "react"
import { Box, Button, Container, Center } from "@chakra-ui/react"

import { NL } from "@/static/participation.js"
import { useSurveyQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { client } from "@/api/gql-client.js"
import { useCreateParticipationMutation } from "@/api/graphql/queries/participation.gql.generated.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import PDFPreview from "@/components/PDFPreview"

// ---- TYPES

type Props = {
  surveyId: string
  onConsent: (participationId: string) => void
  onRefuse: () => void
}

// ---- COMPONENT

export default function ParticipationConsent({ surveyId, onConsent, onRefuse }: Props): JSX.Element {
  const { mutateAsync: createParticipation, isLoading } = useCreateParticipationMutation(client)
  const { data: survey } = useSurveyQuery(client, { id: surveyId })

  const onAccept = useCallback(async () => {
    const res = await createParticipation({
      values: { consent: true, completed: false, survey: surveyId },
    })
    // @ts-ignore : I don't understand the structure of the answer, because that's supposed to work
    onConsent(res?.createParticipation?.data?.id)
  }, [createParticipation, onConsent, surveyId])

  const onDecline = useCallback(() => {
    onRefuse()
  }, [onRefuse])

  const attributes = survey?.survey?.data?.attributes
  const url = attributes?.notice_consent?.data?.attributes?.url
  const { isTablet } = useMediaQueries()

  if (isLoading) return <Box mt="20">Please wait...</Box>

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      w="100%"
      overflow="hidden"
      h="100%"
      flexDirection={isTablet ? "column" : "row"}
    >
      <Box
        className="p-2 bg-gray-100"
        h="100vh"
        pb={isTablet ? "50px" : "0px"}
        w={isTablet ? "90%" : "100%"}
      >
        { url
          ? <PDFPreview url={url} />
          : <Box w="100%" h="100%" backgroundColor="gray.100" />
        }
      </Box>

      <Container variant="rightPart" className={isTablet ? "background__grid" : ""}>
        <Center h={isTablet ? "unset" : "100vh"} w={isTablet ? "100%" : "unset"}>
          <Box display="flex" flexDir="column" w={isTablet ? "90%" : "50%"}>
            <div className="mb-16">
              <span className="font-light text-gray-500">Notice pour</span><br />
              <span className="font-semibold text-2xl">{ attributes?.title }</span>
            </div>

            <Button className="w-full" mb="20px" variant="rounded" onClick={onAccept} mr="10">
              {NL.button.consent.accept}
            </Button>

            <Button className="w-full" variant="rounded" onClick={onDecline}>
              {NL.button.consent.refuse}
            </Button>
          </Box>
        </Center>
      </Container>
    </Box>
  )
}
