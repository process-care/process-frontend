import { Badge, Grid, GridItem, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { useGetSurveys } from "call/actions/survey";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";

export const SurveyGrid: React.FC = () => {
  const { data: surveys, isLoading } = useGetSurveys();

  if (isLoading) {
    return <Loader />;
  }

  if (surveys === undefined) {
    return <p>no surveys</p>;
  }

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} pt="80px" px="25px">
      {surveys.surveys.map(({ title, status, id, landing }) => {
        return (
          <NavLink to={`/survey/${id}`}>
            <GridItem
              w="100%"
              border="1px solid"
              borderColor="black"
              p="10px 50px 80px 50px"
              _hover={{
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text variant="currentBold">{title}</Text>
                <Badge
                  backgroundColor={landing?.color_theme?.button || "black"}
                  borderRadius="50px"
                  color="white"
                >
                  <Text variant="xxs">{status}</Text>
                </Badge>
              </Flex>
              <Text variant="xxs">
                {landing?.id ? "Landing créée" : "Pas de landing"}
              </Text>
            </GridItem>
          </NavLink>
        );
      })}
    </Grid>
  );
};
