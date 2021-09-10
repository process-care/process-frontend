import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { t } from "static/dashboard";
import { ReactComponent as Logo } from "assets/logo.svg";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  isPortail?: boolean;
}

interface Item {
  name: string;
  path: string;
}
const items: Item[] = [
  {
    name: "Mon profil",
    path: "/profil",
  },
  {
    name: "Mes enquêtes",
    path: "/dashboard",
  },
  {
    name: "Déconnexion",
    path: "/connexion",
  },
];

export const SimpleMenu: React.FC<Props> = ({ isPortail }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const SubMenu = () => {
    return (
      <motion.nav
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Flex
          w="300px"
          justifyContent="space-between"
          mr="10px"
          pos="absolute"
          right="80px"
        >
          {items.map(({ name, path }) => {
            return (
              <NavLink
                key={name}
                to={path}
                activeStyle={{
                  fontStyle: "italic",
                }}
              >
                {name}
              </NavLink>
            );
          })}
        </Flex>
      </motion.nav>
    );
  };

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
      <Flex alignItems="center">
        <SubMenu />

        <Avatar
          _hover={{ cursor: "pointer" }}
          onClick={handleClick}
          ml="20px"
          name="C D"
          w="40px"
          h="40px"
          color="white"
          fontSize="14px"
          background="linear-gradient(rgba(194, 165, 249, 1),
rgba(0, 132, 255, 1))"
        />
      </Flex>
    </Box>
  );
};
