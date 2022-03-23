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
import { Video } from "components/Video";
import { API_URL_ROOT } from "constants/api";
import { Legals } from "./Legals";
// ---- STATICS

const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

// ---- TYPES

interface Props {
  isUserView?: boolean;
  // TODO: Refacto this and remove any => LandingRedux
  data?: LandingRedux;
  author?: { email: string; username: string } | null;
  needConsent?: boolean | null | undefined;
}

// ---- COMPONENT

export const Preview: React.FC<Props> = ({ isUserView, data, author, needConsent }) => {
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
  const hasMembers = Boolean(data?.attributes?.members?.length > 0);
  const hasAboutPage = Boolean(data?.attributes?.about_page);

  const onParticipate = useCallback(() => {
    if (!isUserView) {
      alert("Bouton désactivé pendant la prévisualisation.");
      return;
    }
    if (needConsent) {
      history.push(`/survey/${slug}/consent`);
    } else {
      history.push(`/survey/${slug}/participate`);
    }
  }, [slug, isUserView, needConsent]);

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
          maxHeight: "90px",
        }}
      />
    );
  };
  return (
    <Box h={isTablet ? "fit-content" : "100vh"} w="100%" backgroundColor="white">
      <Flex flexDirection={isTablet ? "column" : "row"}>
        <Center
          w={isTablet ? "100%" : "33%"}
          minW="400px"
          borderRight="1px solid rgb(234, 234, 239)"
          h={isTablet ? "fit-content" : "100vh"}
          py={isTablet ? "30px" : "0px"}
          pos="relative"
          backgroundColor={attributes?.color_theme?.button || "blue"}
        >
          <Box textAlign="left" px="5%">
            <Text variant="xxl" fontWeight="bold" color="white" ml="-2px" wordBreak="break-word">
              {attributes?.title}
            </Text>

            <Text variant="smallTitle" color="white" mt="30px" maxHeight="300px" overflow="auto" wordBreak="break-word">
              {attributes?.subtitle}
            </Text>
            {hasMedia && (
              <Box mt="30px" position="relative">
                {hasVideo && <Video url={attributes?.video_url ?? ""} />}
                {hasImage && <img src={`${API_URL_ROOT}${coverSrc}`} alt={coverName} />}
              </Box>
            )}
          </Box>
        </Center>
        <Box w={isTablet ? "100%" : "67%"}>
          <Center
            h={isTablet ? "fit-content" : "100vh"}
            flexDirection="column"
            textAlign="left"
            alignItems="flex-end"
            overflow="auto"
          >
            <Box pos="absolute" top="20px" right="20px" hidden={isTablet}>
              <Logo />
            </Box>
            <Tabs w={isTablet ? "90%" : "80%"} m={isTablet ? "30px auto" : "0 auto"}>
              <TabList>
                <Tab>Description</Tab>
                {hasMembers && <Tab>Equipe</Tab>}
                <Tab>Informations</Tab>
                {hasAboutPage && <Tab>A propos</Tab>}
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
                  <Legals data={data} author={author} />
                </TabPanel>
                <TabPanel>
                  <Box h="fit-content" backgroundColor="white" w="100%">
                    <Text
                      textAlign="left"
                      variant="current"
                      dangerouslySetInnerHTML={{
                        __html: aboutPage ?? "",
                      }}
                    ></Text>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};
