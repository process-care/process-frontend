import { Box, Text } from "@chakra-ui/react";
import { useCheckSurvey } from "call/actions/formBuider/condition";
import React from "react";
import { useAppSelector } from "redux/hooks";

export const Banner: React.FC = () => {
  const { condition_status } = useAppSelector((state) => state.formBuilder);
  const { data, isLoading } = useCheckSurvey(condition_status);
  console.log(data);

  if (!condition_status || data === undefined) {
    return <></>;
  }

  if (isLoading) {
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
  if (data?.checkSurvey?.valid) {
    return (
      <Box w="100%" p="5px" backgroundColor="brand.green">
        <Text variant="current" color="white">
          C'est un succès !
        </Text>
      </Box>
    );
  } else
    return (
      <Box w="100%" p="5px" backgroundColor="brand.alert">
        {data?.checkSurvey?.errors.map((error: any) => {
          return (
            <Box textAlign="left" pl="10%">
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
