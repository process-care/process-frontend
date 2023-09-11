import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js"
import Link from "next/link.js"

import { t } from "@/static/dashboard.js"
import { actions } from "@/redux/slices/application/index.js"
import { actions as appActions } from "@/redux/slices/scientistData.js"
import { Logo } from "@/components/logos";

export const HEADER_HEIGHT = "65px";

interface Props {
  isPortail?: boolean;
}

interface Item {
  name: string;
  path: string;
  action?: () => void;
}

export default function SimpleMenu({ isPortail }: Props): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const logout = () => {
    () => router.push("/connexion");
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
            <Link
              onClick={action}
              key={name}
              href={path}
              // activeStyle={{
              //   fontWeight: "bold",
              //   borderBottom: "1px solid black",
              // }}
            >
              {name}
            </Link>
          );
        })}
      </Flex>
    );
  };

  return (
    <Box
      py={3}
      px={6}
      display="flex"
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
      <Box display="flex" alignItems="center">
        <Link href="/">
          <Logo />
        </Link>
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
