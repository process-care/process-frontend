import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useAppSelector } from "@/redux/hooks/index.js"

export default function Banner(): JSX.Element {
  const { status, isChecking } = useAppSelector(
    (state) => state.scientistData.survey
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isChecking) {
      setOpen(true);
    } else {
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    }
  }, [isChecking]);

  if (!open) {
    return <></>;
  }

  if (open && isChecking) {
    return (
      <Box
        w="100%"
        p="5px"
        backgroundColor="white"
        borderBottom="1px solid black"
      >
        <Text variant="current" color="black">
          Nous analysons les conditions ...
        </Text>
      </Box>
    );
  }
  if (status?.checkSurvey?.valid) {
    return (
      <Box w="100%" p="5px" backgroundColor="brand.green">
        <Text variant="current" color="white">
          C&apos;est un succès !
        </Text>
      </Box>
    );
  } else
    return (
      <Box w="100%" p="5px" backgroundColor="brand.alert">
        {status?.checkSurvey?.errors?.map((error: any, idx: number) => {
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
      </Box>
    );
};
