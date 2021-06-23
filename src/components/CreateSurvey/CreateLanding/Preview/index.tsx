import { Box, Container } from "@chakra-ui/react"
import React from "react"
import { Content } from "./Content"
import { Header } from "./Header"
import { Team } from "./Team"

const mock = {
    members: [
        { name: "Jean P.", job: "Chercheur universitaire" },
        { name: "Jean P.", job: "Chercheur universitaire" },
        { name: "Jean P.", job: "Chercheur universitaire" },
        { name: "Jean P.", job: "Chercheur universitaire" }
    ]
}


export const Preview: React.FC = () => {
    return (
        <Box h="1200px" backgroundColor="white" w="80%" mx="auto" mt="100px" >
            <Header />
            <Content />
            <Container variant="hr" my={10} />
            <Team members={mock.members} />
            <Container variant="hr" my={10} />

        </Box>
    )
}