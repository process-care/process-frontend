import { Box, Container } from "@chakra-ui/react"
import React from "react"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { Team } from "./Team"

const mock = {
    members: [
        { name: "Jean P.", job: "Chercheur universitaire" },
        { name: "Jean C.", job: "Chercheur universitaire" },
        { name: "Jean F.", job: "Chercheur universitaire" },
        { name: "Jean Z.", job: "Chercheur universitaire" }
    ]
}


export const Preview: React.FC = () => {
    return (
        <Box h="fit-content" backgroundColor="white" w="80%" mx="auto" mt="100px" >
            <Header />
            <Content />
            <Container variant="hr" my={10} />
            <Team members={mock.members} />
            <Container variant="hr" my={10} />
            <Footer />
        </Box>
    )
}