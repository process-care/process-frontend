import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Team } from "./Team";
import { useAppSelector } from "redux/hooks";

export const Preview: React.FC = () => {
  const data = useAppSelector((state) => state.landingBuilder.landing);
  const { color_theme } = data;
  return (
    <Box h="fit-content" backgroundColor="white" w="80%" mx="auto" mt="100px">
      <Header theme={color_theme} logo={data.logo} />
      <Content data={data} theme={color_theme} />
      <Container variant="hr" my={10} />
      <Team members={data.members} />
      <Container variant="hr" my={10} />
      <Footer data={data} />
    </Box>
  );
};
