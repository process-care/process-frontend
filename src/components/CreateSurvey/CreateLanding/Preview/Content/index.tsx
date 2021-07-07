import React from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { IColors, ILanding } from "interfaces/landing";
import { Video } from "components/Video";
import { t } from "static/createLanding";

interface Props {
  data: ILanding;
  theme: IColors;
}

const placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.";
const big_placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et. <br/> <br/> quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.<br/> <br/> Blanditiis et, quo velit tenetur labore at reprehenderit.";

export const Content: React.FC<Props> = ({ data, theme }) => {
  const had_media =
    data.image_cover[0]?.base64 !== undefined || data.video_url !== "";
  const had_video = data.video_url !== "";
  const had_image = data.image_cover[0]?.base64 !== undefined;

  return (
    <Box>
      <Box
        backgroundColor={theme.base}
        py="70px"
        color="white"
        textAlign="left"
        px="10%"
      >
        <Text variant="xl">{data.title || "Titre à remplacer"}</Text>
        <Text variant="smallTitle" mt="30px">
          {data.subtitle || `Sous titre à remplacer. ${placeholder}`}
        </Text>
      </Box>

      <Flex px="12%" py="10%">
        {had_media && (
          <Box w="100%">
            {had_video && <Video url={data.video_url} />}
            {had_image && (
              <img
                src={data.image_cover[0]?.base64}
                style={{ maxWidth: "400px", width: "400px" }}
                alt=""
              />
            )}
          </Box>
        )}
        <Box
          w={had_media ? "100%" : "80%"}
          m={had_media ? "inherit" : "auto"}
          pl={10}
        >
          <Text
            textAlign="left"
            variant="current"
            dangerouslySetInnerHTML={{
              __html: data.wysiwyg || big_placeholder,
            }}
          ></Text>
          <Flex mt={10} justifyContent="space-between">
            <Button variant="rounded" backgroundColor={theme.button}>
              {t.cta_participate}
            </Button>
            <Button
              variant="rounded"
              color={theme.button}
              border={`1px solid ${theme.button}`}
              backgroundColor="transparent"
              _hover={{ backgroundColor: theme.button, color: "white" }}
            >
              {t.cta_show_more}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
