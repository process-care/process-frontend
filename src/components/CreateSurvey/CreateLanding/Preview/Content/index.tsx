import React from "react"
import { Box, Text, Flex } from "@chakra-ui/react"


export const Content: React.FC = () => {
    return (
        <Box>
            <Box backgroundColor="#FFB800" py="70px" color="white" textAlign="left" px="10%">
                <Text variant="xl">
                    Etude portant sur la dépression curabitur blandit tempus porttitor.
                </Text>
                <Text variant="smallTitle" mt='30px'>
                    Sous titre de l’étude,Curabitur blandit tempus porttitor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                </Text>
            </Box>
            <Flex p={10}>
                <Box>
                    <img src="https://picsum.photos/400/260" alt="" />
                </Box>
                <Text textAlign="left" w='50%' pl={10} variant="xxs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, id amet. Consequatur, sed ullam praesentium modi minus similique magnam sapiente rem labore assumenda quo quasi quod culpa sint laudantium! Reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, id amet. Consequatur, sed ullam praesentium modi minus similique magnam sapiente rem labore assumenda quo quasi quod culpa sint laudantium! Reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, id amet. Consequatur, sed ullam praesentium modi minus similique magnam sapiente rem labore assumenda quo quasi quod culpa sint laudantium! Reiciendis. <br/> <br/> Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
            </Flex>
        </Box>

    )
}