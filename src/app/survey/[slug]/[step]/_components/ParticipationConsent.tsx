'use client'

import { useCallback } from "react"
import { Box, Button, Container, Center } from "@chakra-ui/react"

import { NL } from "@/static/participation.js"
import { useSurveyQuery } from "@/api/graphql/queries/survey.gql.generated.js"
import { client } from "@/api/gql-client.js"
import { useCreateParticipationMutation } from "@/api/graphql/queries/participation.gql.generated.js"
import PDFPreview from "@/components/PDFPreview"
import { cn } from "@/utils/ui"

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

  if (isLoading) return <Box mt="20">Please wait...</Box>

  return (
    <Box
      className="flex flex-col lg:flex-row justify-around w-full h-full min-h-0 overflow-auto"
    >
      <Box className="flex flex-col p-2 bg-gray-100 flex-grow min-h-[500px] h-full w-full">
        { url
          ? <PDFPreview url={url} />
          : <Box w="100%" h="100%" backgroundColor="gray.100" />
        }
      </Box>

      <Container className={cn (
        'flex shrink-0 justify-center h-auto overflow-hidden',
        'lg:shrink lg:h-full lg:overflow-auto lg:w-full lg:max-w-[53%] lg:border-l lg:border-[rgb(234, 234, 239)]',
      )}>
        <Box className='flex flex-col self-center w-full xl:w-2/3 p-4 lg:p-0'>
          <div className="w-full">
            <span className="font-light text-gray-500">Notice pour<span className="lg:hidden"> : </span></span>
            <br className="max-lg:hidden" />
            <span className="font-semibold text-2xl">{ attributes?.title }</span>
          </div>

          <div className={cn(
              "flex mt-4 flex-row-reverse",
              "lg:mt-16 lg:flex-col lg:space-y-5",
            )}
          >
            <Button className="w-full" variant="rounded" whiteSpace="normal" onClick={onAccept}>
              {NL.button.consent.accept}
            </Button>

            <Button className="w-full" variant="rounded" onClick={onDecline}>
              {NL.button.consent.refuse}
            </Button>
          </div>
        </Box>
      </Container>
    </Box>
  )
}
