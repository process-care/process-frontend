import { useEffect, useMemo } from "react"
import { Box, Button, FormLabel, Spinner, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { Form, Formik } from "formik"
import Image from "next/image.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/application/index.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { FactorState, useAssociatedLogic } from "./hooks/index.tsx"
import RenderInput from "@/components/CreateSurvey/CreateForm/InputsPreview/Card/utils/index.tsx"
import TitleDivider from "@/components/TitleDivider/index.tsx"
import { noop } from "@/utils/commons.ts"

// ---- TYPES & STATICS

interface Factor {
  modalities: {
    file: any
    description: string
  }[]
  title: string
}

interface Props {
  label: string
  helpText?: string
  name: string
  isCollapsed?: boolean
  factors: Factor[]
  maxLoop?: number | null
  associated_input: Record<string, unknown>
}

const SHOWN_CARDS = 1
const DEFAULT_MAX_LOOP = 5

// ---- COMPONENT

export default function MonoThumbnail({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop,
  name,
  associated_input,
}: Props): JSX.Element {
  const drawerIsOpen = useAppSelector(selectors.drawerIsOpen)
  const nbMaxLoops = maxLoop ?? DEFAULT_MAX_LOOP

  const { generate, handleClick, state, filteredFactors, step, maxVariations, isFinished } = useAssociatedLogic(
    factors,
    name,
    nbMaxLoops,
    SHOWN_CARDS
  )
  
  const sanitizedMono = useMemo(() => ({
    id: associated_input?.type,
    attributes: {
      ...associated_input,
    },
  } as QuestionRedux), [associated_input])

  useEffect(() => {
    // Generate only if drawer is close (mean no adding new factors /modalities)
    if (drawerIsOpen) return
    generate()
  // We generate only once, when the component is mounted, and only if the drawer is closed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerIsOpen])

  if (isFinished) {
    return <Text variant="smallTitle">Nous avons bien pris en compte votre sélection !</Text>
  }

  return (
    <Box width="100%">
      <FormLabel>{label}</FormLabel>

      {maxLoop && maxVariations >= 1 && (
        <Text mt="15px" fontSize="xs">
          { `${ step + 1 } / ${ Math.min(nbMaxLoops, maxVariations) }` }
        </Text>
      )}

      {!isCollapsed && (
          <div>
            <Box display="flex" justifyContent="space-around" flexDirection="row" w="100%">
              {[...Array(SHOWN_CARDS)].map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  filteredFactors={filteredFactors}
                  state={state}
                />
              ))}
            </Box>

            <Text mt="15px" fontSize="xs">
              {helpText}
            </Text>

            <TitleDivider title="" />

            <Box>
              <Formik initialValues={{ ...sanitizedMono }} onSubmit={noop}>
                {({ values, resetForm }) => {
                  const validate = (values: QuestionRedux) => {
                    handleClick(0, values)
                  }

                  return (
                    <Form>
                      {sanitizedMono && (
                        <Box p="0 5%">
                          <RenderInput input={sanitizedMono} />
                        </Box>
                      )}

                      <Box display="flex" justifyContent="flex-end" w="100%" mt="20px" pr="30px">
                        <Button type="button" variant="rounded" onClick={() => validate(values)}>
                          Valider ma réponse
                        </Button>
                      </Box>
                    </Form>
                  )
                }}
              </Formik>
            </Box>
          </div>
      )}
    </Box>
  )
}

// ---- SUB COMPONENTS

interface CardProps {
  index: number
  filteredFactors?: Factor[]
  state: FactorState
}

function Card({ index, filteredFactors, state }: CardProps) {
  if (filteredFactors === undefined) {
    return <></>
  }

  return (
    <Box border="1px solid #E5E5E5" borderRadius="5px" mt="30px" w="60%">
      {filteredFactors.map((factor, idx) => {
        const random = state.variations.length > 0 ? state.variations[state.variations.length - 1][index][idx] : 0

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
              <Box pos="relative">
                {factor?.modalities[random]?.file && (
                  <Image
                    src={factor?.modalities[random]?.file}
                    alt={factor?.modalities[random]?.description}
                    width={180}
                    height={180}
                    sizes="20vw"
                    className="object-contain my-3 mx-auto"
                  />
                )}

                <Text className="block" variant="xs">{factor?.modalities[random]?.description}</Text>
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}