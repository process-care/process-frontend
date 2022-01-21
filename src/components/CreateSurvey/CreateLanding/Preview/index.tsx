import React, { useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Team } from "./Team";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/landing-editor";
import { ILanding } from "types/landing";
import { CtaMobil } from "./Cta";
// ---- STATICS

const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

// ---- TYPES

interface Props {
  isUserView?: boolean;
  data?: Partial<ILanding>;
}

// ---- COMPONENT

export const Preview: React.FC<Props> = ({ isUserView, data }) => {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();
  const { previewMode } = useAppSelector((state) => state.application);
  const aboutPage = useAppSelector(selectors.about);
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);

  const isFullView = isUserView || previewMode === "landing";

  const onParticipate = useCallback(() => {
    if (!isUserView) {
      alert("Bouton désactivé pendant la prévisualisation.");
      return;
    }
    history.push(`/survey/${slug}/consent`);
  }, [slug, isUserView]);

  if (isEditingAbout) {
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
            __html: aboutPage || big_placeholder,
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
      <Header
        title={data?.title}
        logo={data?.logo}
        color_theme={data?.color_theme}
        onParticipate={onParticipate}
      />

      <Content data={data} onParticipate={onParticipate} />
      {data?.members && (
        <Team members={data.members} color_theme={data?.color_theme} />
      )}
      <Footer
        partners_logos={data?.partners_logos ?? []}
        color_theme={data?.color_theme}
      />
      <CtaMobil data={data} onParticipate={onParticipate} />
    </Box>
  );
};
