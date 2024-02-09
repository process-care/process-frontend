import { useCallback, useEffect, useState } from "react"
import { Box, Button, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/application/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { FactorState, useAssociatedLogic } from "./hooks/index.tsx"

// ---- TYPES & STATICS

interface Props {
  label: string
  helpText?: string
  name: string
  isCollapsed?: boolean
  factors: Factor[]
  maxLoop?: number | null
}

interface Factor {
  modalities: {
    file: any
    description: string
  }[]
  title: string
}

const SHOWN_CARD = 2
const DEFAULT_MAX_LOOP = 5

// ---- COMPONENT

export default function AssociatedClassification({
  label,
  helpText,
  isCollapsed,
  factors,
  maxLoop = 5,
  name,
}: Props): JSX.Element {
  const { isTablet } = useMediaQueries()
  const drawerIsOpen = useAppSelector(selectors.drawerIsOpen)
  const nbMaxLoops = maxLoop ?? DEFAULT_MAX_LOOP

  const {
    generate,
    navigateToStep,
    handleValidate,
    state,
    filteredFactors,
    step,
    maxVariations,
    nbAnswers,
    answers,
  } = useAssociatedLogic(factors, name, nbMaxLoops, SHOWN_CARD)

  // Generate a first combination when the component is mounted
  useEffect(() => {
    // Generate only if drawer is close (mean no adding new factors /modalities)
    if (drawerIsOpen) return
    generate()
  // We generate only once, when the component is mounted, and only if the drawer is closed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerIsOpen])

  // Select card mechanism
  const { selected, handleSelect } = useSelector(step, handleValidate, answers)

  return (
    <Box>
      <FormLabel>{label}</FormLabel>

      {/* Loop numbering */}
      { (maxVariations >= 1) && (
        <Text mt="15px" fontSize="xs">
          { `${ step + 1 } / ${ Math.min(nbMaxLoops, maxVariations) }` }
        </Text>
      )}

      { !isCollapsed && (
        <Flex flexDir="column">
          {/* Double combination displayed to the user */}
          <Box display="flex" justifyContent="space-around" flexDirection={isTablet ? "column" : "row"} w="100%">
            {[...Array(SHOWN_CARD)].map((_, i) => (
              <Card
                key={i}
                index={i}
                handleSelect={handleSelect}
                filteredFactors={filteredFactors}
                state={state}
                step={step}
                selected={selected}
              />
            ))}
          </Box>

          {/* Help text to guide the user */}
          <Text mt="15px" fontSize="xs">
            {helpText}
          </Text>

          {/* Buttons */}
          <Actions
            step={step}
            nbAnswers={nbAnswers}
            nbMaxLoops={nbMaxLoops}
            navigateToStep={navigateToStep}
          />
        </Flex>
      )}
    </Box>
  )
}

// ---- HOOKS

function useSelector(step: number, handleValidate: (cardIdx: number) => void, answers: any) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = useCallback((index: number) => {
    setSelected(index)
    // Leave a moment to transition smoothly
    setTimeout(() => handleValidate(index), 400)
  }, [handleValidate])

  // Update what's selected when the step changes
  useEffect(() => {
    setSelected(answers?.[step]?.choice)
  // We update the selected value ONLY when the step changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  return {
    selected,
    handleSelect,
  }
}

// ---- SUB COMPONENTS

// -- Card

interface CardProps {
  index: number
  selected: number | null
  handleSelect: (cardIdx: number) => void
  filteredFactors?: Factor[]
  state: FactorState
  step: number
}

function Card({ index, selected, handleSelect, filteredFactors, state, step }: CardProps) {
  const { isTablet } = useMediaQueries()

  // Memoized select function
  const onSelect = useCallback(() => {
    handleSelect(index)
  }, [handleSelect, index])

  // If there is no factors, we don't display anything
  if (filteredFactors === undefined) return <></>

  // Flags
  const isSelected = selected === index

  return (
    <Box
      className="flex flex-col"
      border={`${ isSelected ? "1px solid blue" : "1px solid #E5E5E5" } `}
      color={`${ isSelected ? " white" : "black" } `}
      borderRadius="5px"
      mt="30px"
      w={isTablet ? "100%" : "40%"}
      pos="relative"
      top="0"
      transition="all .2s ease-in-out"
      _hover={{
        border: "1px solid #9f9f9f",
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      {filteredFactors.map((factor, idx) => {
        // Get the index of the modality to display
        // -> For the current step, for the current card (index), for the current factor (idx)
        const idxModa = (step >= 0) ? state.variations?.[step]?.[index]?.[idx] : 0
        const bgColor = isSelected
          ? idx % 2 == 0 ? "rgba(0, 0, 255, 0.6)" : "rgba(0, 0, 255, 1)"
          : idx % 2 == 0 ? "transparent" : "gray.100"

        return (
          <Box
            key={uuidv4()}
            backgroundColor={bgColor}
            className="p-5 grow flex flex-col"
          >
            {filteredFactors.length > 1 && (
              <Text variant="currentBold" className="uppercase mt-[10px]">
                {factor?.title}
              </Text>
            )}

            {!factor.modalities ? (
              <Spinner size="xs" bottom="5px" pos="relative" />
            ) : (
              <Box className="relative">
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
                <Text variant="xs">{factor?.modalities[idxModa]?.description}</Text>
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

// -- Actions

interface ActionsProps {
  step: number
  nbAnswers: number
  nbMaxLoops: number
  navigateToStep: (step: number) => void
}

function Actions({
  step,
  nbAnswers,
  nbMaxLoops,
  navigateToStep,
}: ActionsProps) {
  // Flags
  const canForward = nbAnswers > step

  return (
    <Box display="flex" justifyContent="space-between" w="100%" mt="20px" px="5%">
      { step > 0 && (
        <Button type="button" variant="rounded" w={125} onClick={() => navigateToStep(step - 1)}>
          Précédent
        </Button>
      )}
      
      {/* This div is here to force the buttons on the sides even when one of them is hidden */}
      <div className="flex-grow"></div>

      {step < (nbMaxLoops - 1) && (
        <Button 
          type="button"
          variant="rounded"
          w={125}
          onClick={() => navigateToStep(step + 1)}
          isDisabled={!canForward}
        >
          Suivant
        </Button>
      )}
    </Box>
  )
}