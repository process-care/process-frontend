import { Flex, Box, Button } from "@chakra-ui/react"
import { ILanding } from "interfaces/landing"
import React from "react"
import { v4 as uuidv4 } from "uuid";

interface Props {
    data: ILanding,
}
export const Footer: React.FC<Props> = ({ data }) => {
    const { partner_logos } = data
    const had_logos = partner_logos !== []
    return (
        <Flex pb={10} justifyContent="space-between">
            <Box d="flex" pl={8} >
                {had_logos && partner_logos.map(logo => <img src={logo.base64} key={uuidv4()} alt="Logo" style={{ maxHeight: "40px", margin: "0 10px" }} />)}
            </Box>
            <Box px={4}>
                <Button mr={4} variant="link">georgesabitbol@aphp.com</Button>
                <Button variant="link">mentions légales</Button>
            </Box>
        </Flex>

    )
}