import { useCallback, useEffect, useState } from "react"
import { Box, Flex, FormLabel, Spinner, Text } from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/application/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { Maybe } from "@/api/graphql/types.generated.ts"
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

  const { generate, handleClick, state, filteredFactors, step, maxVariations, isFinished } = useAssociatedLogic(
    factors,
    name,
    nbMaxLoops,
    SHOWN_CARD
  )

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
    <Box>
      <FormLabel>{label}</FormLabel>

      { (maxVariations >= 1) && (
        <Text mt="15px" fontSize="xs">
          { `${ step + 1 } / ${ Math.min(nbMaxLoops, maxVariations) }` }
        </Text>
      )}

      { !isCollapsed && (
        <Flex flexDir="column">
          <Box>
            <Box display="flex" justifyContent="space-around" flexDirection={isTablet ? "column" : "row"} w="100%">
              {[...Array(SHOWN_CARD)].map((_, i) => (
                <Card
                  key={i}
                  index={i}
                  handleClick={handleClick}
                  filteredFactors={filteredFactors}
                  state={state}
                />
              ))}
            </Box>

            <Text mt="15px" fontSize="xs">
              {helpText}
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

// ---- SUB COMPONENTS

interface CardProps {
  index: number
  handleClick: (cardIdx: number, values?: any) => void
  filteredFactors?: Factor[]
  state: FactorState
}

function Card({ index, handleClick, filteredFactors, state }: CardProps) {
  const { isTablet } = useMediaQueries()
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = useCallback(() => {
    setSelected(index)
    setTimeout(() => {
      handleClick(index)
      setSelected(null)
    }, 500)
  }, [handleClick, index])

  if (filteredFactors === undefined) {
    return <></>
  }

  return (
    <Box
      className="flex flex-col"
      border={`${selected === index ? "1px solid blue" : "1px solid #E5E5E5"} `}
      backgroundColor={`${selected === index ? " blue" : ""} `}
      color={`${selected === index ? " white" : "black"} `}
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
      onClick={handleSelect}
    >
      {filteredFactors.map((factor, idx) => {
        const random = state.variations.length > 0 ? state.variations[state.variations.length - 1][index][idx] : 0

        return (
          <Box
            key={uuidv4()}
            backgroundColor={selected === index ? "blue" : idx % 2 == 0 ? "transparent" : "gray.100"}
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
                <Text variant="xs">{factor?.modalities[random]?.description}</Text>
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}