import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Team } from "./Team";
import { useAppSelector } from "redux/hooks";
import { ILanding } from "types/landing";

interface Props {
  data: ILanding;
  isUserView?: boolean;
}

export const Preview: React.FC<Props> = ({ data, isUserView }) => {
  const big_placeholder =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

  const { is_editing_about_page } = useAppSelector(
    (state) => state.landingBuilder
  );
  const { preview_mode } = useAppSelector((state) => state.application);
  const { color_theme, members } = data;
  const had_members = members?.length > 0;

  const isFullView = isUserView || preview_mode === "landing";

  if (is_editing_about_page) {
    return (
      <Box
        h="fit-content"
        backgroundColor="white"
        w="80%"
        mx="auto"
        mt="100px"
        p={10}
      >
        <Text
          textAlign="left"
          variant="current"
          dangerouslySetInnerHTML={{
            __html: data.about_page || big_placeholder,
          }}
        ></Text>
      </Box>
    );
  }
  return (
    <Box
      h={isFullView ? "100%" : "fit-content"}
      backgroundColor="white"
      w={isFullView ? "100%" : "80%"}
      mx="auto"
      mt={isFullView ? "0" : "100px"}
    >
      <Header theme={color_theme} logo={data.logo} title={data.title} />
      <Content data={data} theme={color_theme} />
      {had_members && <Team members={data.members} />}
      <Footer data={data} />
    </Box>
  );
};
