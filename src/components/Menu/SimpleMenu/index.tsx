import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { t } from "static/dashboard";
import { ReactComponent as Logo } from "assets/logo.svg";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "components/Authentification/hooks";
import { useDispatch } from "react-redux";
import { toogleDrawer } from "redux/slices/application";

interface Props {
  isPortail?: boolean;
}

interface Item {
  name: string;
  path: string;
  action?: () => void;
}

export const SimpleMenu: React.FC<Props> = ({ isPortail }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const logout = () => {
    localStorage.removeItem("process__user");
  };

  const handleDrawer = () => {
    dispatch(toogleDrawer());
  };

  const items: Item[] = [
    {
      name: "Mon profil",
      path: "/profil",
      action: () => handleDrawer(),
    },
    {
      name: "Mes enquêtes",
      path: "/dashboard",
    },
    {
      name: "Se déconnecter",
      path: "/connexion",
      action: () => logout(),
    },
  ];

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
          zIndex={1}
          w="300px"
          justifyContent="space-between"
          mr="10px"
          pos="absolute"
          right="80px"
        >
          {items.map(({ name, path, action }) => {
            return (
              <NavLink
                onClick={action}
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
      zIndex={1}
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
          name={user?.username}
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
