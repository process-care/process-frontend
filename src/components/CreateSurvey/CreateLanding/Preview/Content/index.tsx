import React from "react"
import { Box, Text, Flex } from "@chakra-ui/react"
import { IColors, ILanding } from "interfaces/landing"
import { Video } from "components/Video"


interface Props {
    data: ILanding,
    theme: IColors
}

const placeholder = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptate accusantium ab praesentium enim fuga, unde tempore, libero beatae ratione ea perspiciatis! Blanditiis et, quo velit tenetur labore at reprehenderit."

export const Content: React.FC<Props> = ({ data, theme }) => {
    const had_media = data.image_cover !== "" || data.video_url !== ""
    return (
        <Box>
            <Box backgroundColor={theme.base} py="70px" color="white" textAlign="left" px="10%">
                <Text variant="xl">
                    {data.title || "Titre à remplacer"}
                </Text>
                <Text variant="smallTitle" mt='30px'>
                    {data.subtitle || `Sous titre à remplacer. ${placeholder}`}
                </Text>
            </Box>

            <Flex p={10}>
                {had_media && <Box>
                    <Video url={data.video_url} />
                    {/* <img src={data.image_cover} style={{ maxWidth: "400px", width: "400px" }} alt="" /> */}
                </Box>}
                <Text textAlign="left" w={had_media ? '50%' : "60%"} m={had_media ? "inherit" : "auto"} pl={10} variant="xxs" dangerouslySetInnerHTML={{ __html: data.wysiwyg || placeholder }}></Text>
            </Flex>
        </Box>

    )
}