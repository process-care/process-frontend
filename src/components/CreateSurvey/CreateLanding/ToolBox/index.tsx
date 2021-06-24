import React from "react"
import { Container, Text, Box, Button } from "@chakra-ui/react"

import { t } from "static/createLanding"
import { ColorPicker } from "./ColorPicker"
import { LandingForm } from "./Form"




export const ToolBox: React.FC = () => {
    return (
        <Container variant="rightPart" height="100%">
            <Text variant="titleParaLight" mt="20px" pb="18px" borderBottom="1px solid" borderColor="black" >
                {t.title}
            </Text>
            <LandingForm />
        </Container>
    )
}