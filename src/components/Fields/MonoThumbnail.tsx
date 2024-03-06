import { useEffect, useMemo } from "react"
import { Box, Button, FormLabel, Spinner, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import { Form, useField } from "formik"
import Image from "next/image.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/application/index.js"
import { QuestionRedux } from "@/redux/slices/types/index.js"
import { AssociatedAnswer, FactorState, useAssociatedLogic } from "./hooks/index.tsx"
import RenderInput from "@/components/CreateSurvey/CreateForm/InputsPreview/Card/utils/index.tsx"
import TitleDivider from "@/components/TitleDivider/index.tsx"

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

  const {
    state,
    filteredFactors,
    maxVariations, 
    step,
    isFinished,
    handleValidate,
    navigateToStep,
    generate,
  } = useAssociatedLogic(factors, name, nbMaxLoops, SHOWN_CARDS)
  
  const sanitizedAssociation = useMemo(() => ({
    id: associated_input?.type,
    attributes: {
      ...associated_input,
    },
  } as QuestionRedux), [associated_input])

  // Generate a first combination when the component is mounted
  useEffect(() => {
    // Generate only if drawer is close (mean no adding new factors /modalities)
    if (drawerIsOpen) return
    generate()
  // We generate only once, when the component is mounted, and only if the drawer is closed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerIsOpen])

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
            {/* Mono combination displayed to the user */}
            <Box display="flex" justifyContent="space-around" flexDirection="row" w="100%">
              {[...Array(SHOWN_CARDS)].map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  filteredFactors={filteredFactors}
                  state={state}
                  step={step}
                />
              ))}
            </Box>

            {/* Help text to guide the user */}
            <Text mt="15px" fontSize="xs">
              {helpText}
            </Text>

            <TitleDivider title="" />

            {/* Associated question to display with the mono combination */}
            <AssociatedQuestion
              name={name}
              associatedInput={sanitizedAssociation}
              step={step}
              nbMaxLoops={nbMaxLoops}
              handleValidate={handleValidate}
              navigateToStep={navigateToStep}
            />
          </div>
      )}
    </Box>
  )
}

// ---- SUB COMPONENTS

// -- Card

interface CardProps {
  index: number
  filteredFactors?: Factor[]
  state: FactorState
  step: number
}

function Card({ index, filteredFactors, state, step }: CardProps) {
  if (filteredFactors === undefined) {
    return <></>
  }

  return (
    <Box border="1px solid #E5E5E5" borderRadius="5px" mt="30px" w="60%">
      {filteredFactors.map((factor, idx) => {
        // Get the index of the modality to display
        // -> For the current step, for the current card (index), for the current factor (idx)
        const idxModa = (step >= 0) ? state.variations?.[step]?.[index]?.[idx] : 0

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
                {factor?.modalities[idxModa]?.file && (
                  <Image
                    src={factor?.modalities[idxModa]?.file}
                    alt={factor?.modalities[idxModa]?.description}
                    width={180}
                    height={180}
                    sizes="20vw"
                    className="object-contain my-3 mx-auto"
                  />
                )}

                <Text className="block" variant="xs">{factor?.modalities[idxModa]?.description}</Text>
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

// -- Associated Input

interface AssociatedQuestionProps {
  name: string
  associatedInput: QuestionRedux
  step: number
  nbMaxLoops: number
  handleValidate: (step: number, associatedAnswer: AssociatedAnswer) => void
  navigateToStep: (step: number) => void
}

function AssociatedQuestion({
  name,
  associatedInput,
  step,
  nbMaxLoops,
  handleValidate,
  navigateToStep,
}: AssociatedQuestionProps) {
  const [mono] = useField(name)
  const [field, , helpers] = useField(associatedInput.id)

  const validate = () => {
    handleValidate(0, { value: field.value, associatedInput })
  }

  useEffect(() => {
    helpers.setValue(mono?.value?.[step]?.value ?? associatedInput.attributes.min)
  // We update the associated input value ONLY when the step or the input itself changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [associatedInput, step])

  // Flags
  const nbAnswers = mono?.value?.length ?? 0
  const validateTxt = nbAnswers === nbMaxLoops || step < nbAnswers ? "Modifier" : "Valider"

  // If the associated input is not defined, we don't display anything
  if (!associatedInput) return <></>
  
  return (
    <Form>
      {/* Input */}
      <Box p="0 5%">
        <RenderInput input={associatedInput} />
      </Box>

      {/* Action buttons */}
      <Box display="flex" justifyContent="space-between" w="100%" mt="20px" px="5%">
        { step > 0 && (
          <Button type="button" variant="rounded" w={125} onClick={() => navigateToStep(step - 1)}>
            Précédent
          </Button>
        )}
        
        {/* This div is here to force the buttons on the sides even when one of them is hidden */}
        <div className="flex-grow"></div>

        {step < nbMaxLoops && (
          <Button type="button" variant="rounded" w={125} onClick={validate}>
            { validateTxt }
          </Button>
        )}
      </Box>
    </Form>
  )
}