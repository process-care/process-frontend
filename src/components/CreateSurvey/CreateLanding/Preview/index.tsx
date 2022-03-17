import React, { useCallback } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { Description } from "./Description";
import { useAppSelector } from "redux/hooks";
import { selectors } from "redux/slices/landing-editor";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { LandingRedux } from "redux/slices/types";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Team } from "./Team";
import { Contact } from "./Contact";
import { Video } from "components/Video";
import { API_URL_ROOT } from "constants/api";
// ---- STATICS

const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

// ---- TYPES

interface Props {
  isUserView?: boolean;
  // TODO: Refacto this and remove any => LandingRedux
  data?: LandingRedux;
  author?: { email: string; username: string } | null;
}

// ---- COMPONENT

export const Preview: React.FC<Props> = ({ isUserView, data, author }) => {
  const { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  const aboutPage = useAppSelector(selectors.about);
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);
  const { isTablet } = useMediaQueries();
  const attributes = data?.attributes;

  const hasVideo = Boolean(attributes?.video_url);
  const coverSrc = attributes?.cover?.data?.attributes?.url;
  const coverName = attributes?.cover?.data?.attributes?.name ?? "";

  const hasImage = Boolean(coverSrc);
  const hasMedia = hasVideo || hasImage;
  const hasMembers = Boolean(data?.attributes?.members);

  const onParticipate = useCallback(() => {
    if (!isUserView) {
      alert("Bouton désactivé pendant la prévisualisation.");
      return;
    }
    history.push(`/survey/${slug}/consent`);
  }, [slug, isUserView]);

  if (isEditingAbout) {
    return (
      <Box h="fit-content" backgroundColor="white" w="80%" mx="auto" mt="100px" p={10}>
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
  const Logo = () => {
    return (
      <img
        src={attributes?.logo ?? ""}
        alt="Logo"
        style={{
          maxHeight: "100px",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      />
    );
  };
  return (
    <Box h="100vh" w="100%" backgroundColor="white">
      <Flex flexDirection={isTablet ? "column" : "row"}>
        <Center
          w={isTablet ? "100%" : "33%"}
          minW="400px"
          borderRight="1px solid rgb(234, 234, 239)"
          h="100vh"
          pos="relative"
        >
          <Box color="white" textAlign="left" px="5%">
            <Logo />

            <Text
              variant={isTablet ? "xlNoMobilVariant" : "xxl"}
              fontWeight="bold"
              color="gray.800"
              ml="-2px"
              maxW="420px"
            >
              {attributes?.title || "Titre à remplacer"}
            </Text>

            <Text variant="smallTitle" color="gray.800" mt="30px">
              {attributes?.subtitle || `Sous titre à remplacer.}`}
            </Text>
            {hasMedia && (
              <Box mt="30px">
                {hasVideo && <Video url={attributes?.video_url ?? ""} />}
                {hasImage && <img src={`${API_URL_ROOT}${coverSrc}`} alt={coverName} />}
              </Box>
            )}
          </Box>
          <Box pos="absolute" bottom="30px" left="5%" w="100%" textAlign="left"></Box>
        </Center>
        <Box w={isTablet ? "100%" : "67%"}>
          <Box h="100vh" flexDirection="column" textAlign="left" alignItems="flex-end">
            <Tabs w="80%" m="150px auto 0 auto">
              <TabList>
                <Tab>Description</Tab>
                {hasMembers && <Tab>Equipe</Tab>}
                <Tab>Contact</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Description data={data} onParticipate={onParticipate} />
                </TabPanel>
                {hasMembers && (
                  <TabPanel>
                    <Team
                      members={data?.attributes?.members}
                      color_theme={data?.attributes?.color_theme}
                      isUserView={isUserView}
                    />
                  </TabPanel>
                )}
                <TabPanel>
                  <Contact data={data} author={author} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
