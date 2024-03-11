'use client'

import { useCallback, useMemo } from "react";
import { Box, Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation.js"
import Image from "next/image.js"

import { useAppSelector } from "@/redux/hooks/index.js"
import { selectors } from "@/redux/slices/landing-editor.ts"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { LandingRedux } from "@/redux/slices/types/index.js"
import { useCreateParticipationMutation } from "@/api/graphql/queries/participation.gql.generated.js";
import { client } from "@/api/gql-client.js"
import { useConsentHandlers } from "@/utils/participations/consent-handler.ts"
import Video from "@/components/Video/index.tsx"
import Description from "./Description/index.tsx"
import Legals from "./Legals/index.tsx"
import Team from "./Team/index.tsx"
import WysiwygReader from "@/components/Fields/Wysiwyg/Reader.tsx";

// ---- STATICS

const big_placeholder = [
  {
    type: 'p',
    children: [{ text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.' }],
  },
  {
    type: 'p',
    children: [{ text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.' }],
  },
  {
    type: 'p',
    children: [{ text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.' }],
  }
]

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
  const [isTablet] = useMediaQuery('(max-width: 1024px)')

  const slug = typeof params.slug === 'string' ? params.slug : ''
  const attributes = data?.attributes
  const coverSrc = attributes?.cover?.data?.attributes?.url ?? ""
  const coverName = attributes?.cover?.data?.attributes?.name ?? ""
  const isEditingAbout = useAppSelector(selectors.isEditingAbout)

  // Actions
  const { mutateAsync: createParticipation } = useCreateParticipationMutation(client)
  const { loading, participation, onConsent } = useConsentHandlers(slug)

  // Flags
  const isInactive = !isUserView || loading
  const hasVideo = Boolean(attributes?.video_url)
  const hasImage = Boolean(coverSrc)
  const hasMedia = hasVideo || hasImage
  const hasMembers = Boolean(data?.attributes?.members?.length > 0)
  const hasAboutPage = useMemo(() => {
    if (!Boolean(data?.attributes?.about)) return false

    // Check if there is only one paragraph and if it's empty (and reverse the boolean result)
    if (data?.attributes.about.length === 1) {
      return !(data?.attributes.about[0]?.children?.length === 1 && data?.attributes.about[0]?.children[0]?.text === "")
    }

    return true
  }, [data?.attributes?.about])

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
        <WysiwygReader
          className="w-full h-full max-h-[75vh]"
          content={data?.attributes?.about ?? big_placeholder}
        />
      </Box>
    );
  }

  return (
    <Flex h={height} w="100%" flexDirection={isTablet ? "column" : "row"}>
      <Center
        className="flex flex-col"
        w={isTablet ? "100%" : "33%"}
        minW="400px"
        borderRight="1px solid rgb(234, 234, 239)"
        h={isTablet ? "fit-content" : "100%"}
        py={isTablet ? "20px" : "0px"}
        pos="relative"
        backgroundColor={attributes?.color_theme?.button || "black"}
        textAlign="left"
        px="40px"
      >
        <Text className="w-full text-5xl font-bold text-white ml-[-2px]">
          {attributes?.title}
        </Text>

        <Text variant="smallTitle" color="white" mt="30px" maxHeight="300px" wordBreak="break-word">
          {attributes?.subtitle}
        </Text>

        {hasMedia && (
          <Box height="250px" minW="100%" width="100%" my="30px" position="relative">
            {hasVideo && <Video url={attributes?.video_url ?? ""} />}
            {hasImage && <Image fill={true} objectFit="contain" src={coverSrc} alt={coverName} sizes="(max-width: 768px) 100vw, 33vw" />}
          </Box>
        )}
      </Center>
      
      <div className="pt-10 pb-10 flex-col items-end text-left w-full h-full">
        <Tabs isFitted={isTablet ? true : false} size={isTablet ? 'md' : 'lg'} w={isTablet ? "95%" : "90%"} h={isTablet ? 'auto' : "90%"} m={"0 auto"}>
          <TabList >
            <Tab>Description</Tab>
            {hasMembers && <Tab>Equipe</Tab>}
            <Tab>Informations</Tab>
            {hasAboutPage && <Tab>A propos</Tab>}
          </TabList>

          <TabPanels height="100%">
            <TabPanel height="100%">
              <Description data={data} inactiveSubmit={isInactive} onParticipate={onParticipate} />
            </TabPanel>

            {hasMembers && (
              <TabPanel height="100%">
                <Team
                  members={data?.attributes?.members}
                  color_theme={data?.attributes?.color_theme}
                  isUserView={isUserView}
                />
              </TabPanel>
            )}

            <TabPanel height="100%">
              <Legals data={data} author={author} />
            </TabPanel>

            <TabPanel height="100%">
              <WysiwygReader
                content={data?.attributes.about}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Flex>
  );
};
