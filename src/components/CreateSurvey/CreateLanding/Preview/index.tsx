'use client'

import { useCallback, useMemo } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { useAppSelector } from "@/redux/hooks";
import { selectors } from "@/redux/slices/landing-editor";
import { useMediaQueries } from "@/utils/hooks/mediaqueries";
import { LandingRedux } from "@/redux/slices/types";
import { useCreateParticipationMutation } from "@/api/graphql/queries/participation.gql.generated";
import { client } from "@/api/gql-client";
import { useConsentHandlers } from "@/utils/participations/consent-handler";
import Video from "@/components/Video";
import Description from "./Description";
import Legals from "./Legals";
import Team from "./Team";

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
  surveyId?: string;
  isPreview?: boolean;
}

// ---- COMPONENT

export default function Preview({ isUserView, data, author, needConsent, surveyId, isPreview }: Props): JSX.Element {
  const router = useRouter()
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  
  const aboutPage = useAppSelector(selectors.about);
  const isEditingAbout = useAppSelector(selectors.isEditingAbout);
  const { isTablet } = useMediaQueries();
  const attributes = data?.attributes;

  const hasVideo = Boolean(attributes?.video_url);
  const coverSrc = attributes?.cover?.data?.attributes?.url ?? "";
  const coverName = attributes?.cover?.data?.attributes?.name ?? "";

  const hasImage = Boolean(coverSrc);
  const hasMedia = hasVideo || hasImage;
  const hasMembers = Boolean(data?.attributes?.members?.length > 0);
  const hasAboutPage = Boolean(data?.attributes?.about_page);
  const { mutateAsync: createParticipation } = useCreateParticipationMutation(client);
  const { loading, participation, onConsent } = useConsentHandlers(slug);

  // Flag for participate button
  const isInactive = !isUserView || loading

  // Callback for participate button
  const onParticipate = useCallback(async () => {
    if (isInactive) {
      alert("Bouton désactivé pendant la prévisualisation / le chargement.");
      return;
    }

    // If there is a participation recorded already, skip creation
    if (participation) {
      router.push(`/survey/${slug}/participate`);
      return;
    }

    // If need consent, go to the consent page
    if (needConsent) {
      router.push(`/survey/${slug}/consent`);
      return;
    }

    // In any other case, create a participation and go to the participate page
    const res = await createParticipation({
      values: { consent: true, completed: false, survey: surveyId },
    });

    // @ts-ignore : I don't understand the structure of the answer, because that's supposed to work
    onConsent(res?.createParticipation?.data?.id);
  }, [isInactive, participation, needConsent, createParticipation, surveyId, onConsent, router, slug]);

  // Compute heigh according various state of the component
  const height = useMemo(() => isTablet ? "fit-content" : isUserView || isPreview ? "100vh" : "calc(100vh - 65px)", [isPreview, isTablet, isUserView])
  
  if (isEditingAbout) {
    return (
      <Box h={height} className="overflow-auto p-10 w-full" >
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
    <Flex h={height} w="100%" backgroundColor="white" flexDirection={isTablet ? "column" : "row"}>
      <Center
        w={isTablet ? "100%" : "33%"}
        minW="400px"
        borderRight="1px solid rgb(234, 234, 239)"
        h={isTablet ? "fit-content" : ""}
        py={isTablet ? "30px" : "0px"}
        pos="relative"
        backgroundColor={attributes?.color_theme?.button || "blue"}
        textAlign="left"
        px="5%"
      >
        <Text variant="xxl" fontWeight="bold" color="white" ml="-2px" wordBreak="break-word">
          {attributes?.title}
        </Text>

        <Text variant="smallTitle" color="white" mt="30px" maxHeight="300px" overflow="auto" wordBreak="break-word">
          {attributes?.subtitle}
        </Text>

        {hasMedia && (
          <Box mt="30px" position="relative">
            {hasVideo && <Video url={attributes?.video_url ?? ""} />}
            {hasImage && <Image src={coverSrc} alt={coverName} />}
          </Box>
        )}
      </Center>
      
      <Center
        className="pt-10 pb-10 flex-col items-end text-left"
        w={isTablet ? "100%" : "67%"}
        h={isTablet ? "fit-content" : "100%"}
      >
        <Tabs className="h-fit" w={isTablet ? "90%" : "80%"} m={isTablet ? "30px auto" : "0 auto"}>
          <TabList>
            <Tab>Description</Tab>
            {hasMembers && <Tab>Equipe</Tab>}
            <Tab>Informations</Tab>
            {hasAboutPage && <Tab>A propos</Tab>}
          </TabList>

          <TabPanels>
            <TabPanel>
              <Description data={data} inactiveSubmit={isInactive} onParticipate={onParticipate} />
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
              <Box className="font-light text-sm w-full h-full max-h-[75vh] overflow-auto" dangerouslySetInnerHTML={{
                __html: aboutPage ?? "",
              }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Flex>
  );
};
