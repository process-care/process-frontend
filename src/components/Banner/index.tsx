import { useEffect, useState } from "react";
import { Box, ScaleFade, Text } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks/index.js"

export default function Banner(): JSX.Element {
  const { status, isChecking } = useAppSelector(
    (state) => state.scientistData.survey
  )
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isChecking) {
      setOpen(true)
    } else {
      setTimeout(() => {
        setOpen(false)
      }, 6000)
    }
  }, [isChecking])

  const isAnalysing = isChecking
  const isSucces = !isChecking && status?.checkSurvey?.valid
  const isError = !isChecking && !status?.checkSurvey?.valid

  return (
    <div className="absolute top-0 w-full">
      <ScaleFade initialScale={0.9} in={open}>
        <Box
          w="100%"
          p="5px"
          backgroundColor={isAnalysing ? "brand.blue" : isSucces ? "brand.green" : "brand.alert"}
        >
          { isAnalysing && (
            <CheckAnalysing />
          )}

          { isSucces && (
            <CheckSuccess />
          )}

          { isError && (
            <CheckError errors={status?.checkSurvey?.errors} />
          )}
        </Box>
      </ScaleFade>
    </div>
  )
}

// ---- SUB COMPONENTS

function CheckAnalysing(): JSX.Element {
  return (
    <Text variant="current" color="white">
      Nous analysons les conditions ...
    </Text>
  )
}

function CheckSuccess(): JSX.Element {
  return (
    <Text variant="current" color="white">
      Les conditions sont valides.
    </Text>
  )
}

function CheckError({ errors }: { errors: any }): JSX.Element {
  return (
    <>
      { errors?.map((error: any, idx: number) => {
        return (
          <Box key={idx} textAlign="left" pl="10%">
            <Text variant="current" color="brand.red">
              Erreur sur la page: {error.pageId}
            </Text>
            {error?.errors?.map((err: any) => {
              return (
                <>
                  <Text variant="current" color="brand.red">
                    Pour la question: {err.questionId}
                  </Text>
                  {err?.unordered?.map((el: any) => {
                    return (
                      <>
                        <Text variant="current" color="brand.red">
                          à la condition: {el.conditionId}
                        </Text>
                        <Text variant="current" color="brand.red">
                          Sur le positionement de: {el.targetId}
                        </Text>
                      </>
                    );
                  })}
                </>
              );
            })}
          </Box>
        );
      })}
    </>
  )
}
