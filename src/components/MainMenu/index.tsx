import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";

import { routes } from "@/routes";

const mainRoutes = ["/connexion", "/survey/create", "/dashboard", "/"];

export default function MainMenu(): JSX.Element {
  return (
    <Flex>
      <Box
        p={5}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        w="80%"
        m="0 auto"
        fontSize="13"
        h="fit-content"
      >
        {routes.map(({ name, path }) => {
          if (mainRoutes.includes(path))
            return (
              <Link
                key={name}
                href={path}
              >
                {name}
              </Link>
            );
        })}
      </Box>
    </Flex>
  );
};
