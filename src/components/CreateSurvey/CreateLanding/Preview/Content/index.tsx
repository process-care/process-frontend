import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Video } from "components/Video";
import { t } from "static/createLanding";
import { ILanding } from "types/landing";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { Loader } from "components/Spinner";

interface Props {
  data?: Partial<ILanding>;
  onParticipate: () => void;
}

const placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.";
const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

export const Content: React.FC<Props> = ({ data, onParticipate }) => {
  const { isTablet } = useMediaQueries();
  if (!data) return <Loader />;

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
        py="100px"
        color="white"
        textAlign="left"
        px="5%"
      >
        <Text variant={isTablet ? "xlNoMobilVariant" : "xl"}>
          {title || "Titre à remplacer"}
        </Text>
        <Text variant="current" mt="30px">
          {subtitle || `Sous titre à remplacer. ${placeholder}`}
        </Text>
      </Box>

      <Flex px="5%" py="10%" flexDirection={isTablet ? "column" : "row"}>
        {hasMedia && (
          <Box w={isTablet ? "100%" : "60%"}>
            {hasVideo && <Video url={video_url ?? ""} />}
            {cover && <img src={cover} alt={cover} />}
          </Box>
        )}
        <Box
          w={hasMedia ? (isTablet ? "100%" : "80%") : "100%"}
          m={hasMedia ? "inherit" : "auto"}
          pl={isTablet ? "unset" : "30px"}
          mt={hasMedia ? "30px" : "unset"}
        >
          <Text
            textAlign="left"
            variant="current"
            dangerouslySetInnerHTML={{
              __html: wysiwyg || big_placeholder,
            }}
          ></Text>
          <Flex
            mt={10}
            justifyContent="space-between"
            flexDirection={isTablet ? "column" : "row"}
          >
            <Button
              variant="rounded"
              backgroundColor={theme?.button || "brand.blue"}
              onClick={onParticipate}
            >
              {t.cta_participate}
            </Button>
            <Button
              mt={isTablet ? "20px" : "unset"}
              variant="rounded"
              color={theme?.button}
              border={`1px solid ${theme?.base || "brand.blue"}`}
              backgroundColor={theme?.base || "brand.blue"}
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
