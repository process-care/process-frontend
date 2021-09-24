import React from "react";
import { Flex, Box, Button, Text, Container } from "@chakra-ui/react";
import { t } from "static/createLanding";
import { API_URL_ROOT } from "constants/api";
import { NavLink } from "react-router-dom";
import { ILanding } from "types/landing";

type Props = {
  partners: ILanding['partners'],
};

export const Footer: React.FC<Props> = ({
  partners,
}) => {
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
      <NavLink to="/">
        <Text textAlign="right" variant="xxs" p={4}>
          {t.credits}
        </Text>
      </NavLink>
    </>
  );
};
