import React from "react";
import { Flex, Box, Button, Text, Container } from "@chakra-ui/react";
import { ILanding } from "types/landing";
import { t } from "static/createLanding";
import { API_URL_ROOT } from "constants/api";

interface Props {
  data: ILanding;
}

export const Footer: React.FC<Props> = ({ data }) => {
  const { partners } = data;

  return (
    <>
      <Container variant="hr" w="100%" maxW="unset" />
      <Flex py={10} justifyContent="space-between">
        <Box d="flex" pl={8}>
          {partners.map(({ id, name, url }) => (
            <img
              key={id}
              src={`${API_URL_ROOT}${url}`}
              alt={`Logo: ${name}`}
              style={{ maxHeight: "40px", margin: "0 10px" }}
            />
          ))}
        </Box>
        <Box px={4}>
          <Button mr={4} variant="link">
            georgesabitbol@aphp.com
          </Button>
          <Button variant="link">mentions légales</Button>
        </Box>
      </Flex>
      <Text textAlign="right" variant="xxs" p={4}>
        {t.credits}
      </Text>
    </>
  );
};
