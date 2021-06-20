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
            <Box p={4} d="flex" alignItems="flex-start" flexDirection="column" textAlign="left">
                <Text variant="currentBold">
                    {t.label_logo}
                </Text>
                <Button variant="roundedTransparent" mt={4}>
                    {t.logo_cta}
                </Button>
                <Text variant="xs" color="brand.gray.200" mt="1">
                    {t.logo_helptext}
                </Text>
                <Text variant="currentBold" mt={9}>
                    {t.theme_label}
                </Text>
                <ColorPicker />
                <LandingForm />


            </Box>

        </Container>
    )
}