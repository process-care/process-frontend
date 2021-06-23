import { Box } from "@chakra-ui/react"
import React from "react"
import { Content } from "./Content"
import { Header } from "./Header"

export const Preview: React.FC = () => {
    return (
        <Box h="1200px" backgroundColor="white" w="80%" mx="auto" mt="100px" >
          
          <Header/>
           <Content/>
        </Box>
    )
}