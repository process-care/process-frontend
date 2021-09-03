import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { t } from "static/dashboard";
import { ReactComponent as Logo } from "assets/logo.svg";
import { NavLink } from "react-router-dom";

interface Props {
  isPortail?: boolean;
}

export const SimpleMenu: React.FC<Props> = ({ isPortail }) => {
  return (
    <Box
      py={3}
      px={6}
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      m="0 auto"
      fontSize="13"
      h="fit-content"
      borderBottom="1px solid black"
      position="sticky"
      top="0"
      backgroundColor="white"
    >
      <NavLink to="/">
        <Logo />
      </NavLink>
      {!isPortail && <Text variant="baseline">{t.menu_title}</Text>}
      <NavLink to="/dashboard">
        <Avatar
          name="C D"
          w="40px"
          h="40px"
          color="white"
          fontSize="14px"
          background="linear-gradient(rgba(194, 165, 249, 1),
rgba(0, 132, 255, 1))"
        />
      </NavLink>
    </Box>
  );
};
