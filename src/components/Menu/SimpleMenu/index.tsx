import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@chakra-ui/react";
import { t } from "static/dashboard";
import { ReactComponent as Logo } from "assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/application";
import { actions as appActions } from "redux/slices/scientistData";
import { useHistory } from "react-router-dom";

export const HEADER_HEIGHT = "65px";

interface Props {
  isPortail?: boolean;
}

interface Item {
  name: string;
  path: string;
  action?: () => void;
}

export const SimpleMenu: React.FC<Props> = ({ isPortail }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    () => history.push("/connexion");
    localStorage.removeItem("process__user");
    dispatch(appActions.logout());
    // Kill redux data
    window.location.reload();
  };

  const handleDrawer = () => {
    dispatch(actions.toogleDrawer());
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
      <Flex zIndex={1} w="300px" justifyContent="space-between" mr="10px" pos="absolute" right="80px">
        {items.map(({ name, path, action }) => {
          return (
            <NavLink
              onClick={action}
              key={name}
              to={path}
              activeStyle={{
                fontWeight: "bold",
                borderBottom: "1px solid black",
              }}
            >
              {name}
            </NavLink>
          );
        })}
      </Flex>
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
      h={HEADER_HEIGHT}
      borderBottom="1px solid rgb(234, 234, 239)"
      position="sticky"
      top="0"
      backgroundColor="white"
      zIndex={1}
    >
      <Box d="flex" alignItems="center">
        <NavLink to="/">
          <Logo />
        </NavLink>
        {!isPortail && (
          <>
            <Text variant="smallTitle" ml="10px" color="gray">
              |
            </Text>
            <Text variant="smallTitleBold" ml="10px">
              {t.menu_title}
            </Text>
          </>
        )}
      </Box>

      <Flex alignItems="center">
        <SubMenu />

        <Avatar
          _hover={{ cursor: "pointer" }}
          ml="20px"
          w="30px"
          h="30px"
          color="white"
          fontSize="14px"
          background="linear-gradient(rgba(194, 165, 249, 1), rgba(0, 132, 255, 1))"
        />
      </Flex>
    </Box>
  );
};
