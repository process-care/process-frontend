import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import routes from "routes";

const MainMenu: React.FC = () => {
  return (
    <Box
      position="absolute"
      inset="5"
      d="flex"
      justifyContent="space-around"
      w="80%"
      m="0 auto"
      fontSize="13"
      p="0 10px"
      h="fit-content">
      {routes.map(({ name, path }) => {
        return (
          <NavLink
            key={name}
            to={path}
            exact
            activeStyle={{
              fontStyle: "italic",
            }}>
            {name}
          </NavLink>
        );
      })}
    </Box>
  );
};

export default MainMenu;
