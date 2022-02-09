import React from "react";
import { Flex, Box, Button, Text, Container, Image } from "@chakra-ui/react";
import { t } from "static/createLanding";
import { NavLink } from "react-router-dom";
import { Color } from "types/landing";

type Props = {
  partners_logos: string[];
  color_theme?: Color;
};

export const Footer: React.FC<Props> = ({ partners_logos, color_theme }) => {
  return (
    <>
      <Container variant="hr" w="100%" maxW="unset" />
      <Flex py={10} justifyContent="space-between">
        <Box d="flex" pl={8}>
          {partners_logos.map((img: any, idx) => (
            <Image
              borderRadius="full"
              fallbackSrc={`https://via.placeholder.com/150/${color_theme?.base?.replace(
                "#",
                ""
              )}/${color_theme?.base?.replace("#", "")}`}
              key={idx}
              src={img?.image}
              alt={`Logo: `}
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
