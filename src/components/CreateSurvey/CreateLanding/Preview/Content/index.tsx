import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Video } from "components/Video";
import { t } from "static/createLanding";
import { API_URL_ROOT } from "constants/api";
import { ILanding } from "types/landing";

interface Props {
  data?: Partial<ILanding>;
  onParticipate: () => void;
}

const placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.";
const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

export const Content: React.FC<Props> = ({ data, onParticipate }) => {
  // Safety check
  if (!data) return <div>Loading... I guess 🤔</div>;

  const {
    title,
    subtitle,
    color_theme: theme,
    video_url,
    cover,
    wysiwyg,
  } = data;

  const hasVideo = Boolean(video_url);
  const hasImage = Boolean(cover);
  const hasMedia = hasVideo || hasImage;

  return (
    <Box>
      <Box
        backgroundColor={theme?.base || "black"}
        py="70px"
        color="white"
        textAlign="left"
        px="10%"
      >
        <Text variant="xl">{title || "Titre à remplacer"}</Text>
        <Text variant="smallTitle" mt="30px">
          {subtitle || `Sous titre à remplacer. ${placeholder}`}
        </Text>
      </Box>

      <Flex px="12%" py="10%">
        {hasMedia && (
          <Box w="40%">
            {hasVideo && <Video url={video_url ?? ""} />}
            {cover?.url && (
              <img src={`${API_URL_ROOT}${cover.url}`} alt={cover?.name} />
            )}
          </Box>
        )}
        <Box
          w={hasMedia ? "100%" : "60%"}
          m={hasMedia ? "inherit" : "auto"}
          pl={10}
        >
          <Text
            textAlign="left"
            variant="current"
            dangerouslySetInnerHTML={{
              __html: wysiwyg || big_placeholder,
            }}
          ></Text>
          <Flex mt={10} justifyContent="space-between">
            <Button
              variant="rounded"
              backgroundColor={theme?.button || "brand.blue"}
              onClick={onParticipate}
            >
              {t.cta_participate}
            </Button>
            <Button
              variant="rounded"
              color={theme?.button}
              border={`1px solid ${theme?.button}`}
              backgroundColor="transparent"
              _hover={{ backgroundColor: theme?.button, color: "white" }}
            >
              {t.cta_show_more}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
