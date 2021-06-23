import { Flex, Circle, Box, Button } from "@chakra-ui/react"
import React from "react"

export const Footer: React.FC = () => {
    return (
        <Flex pb={10} justifyContent="space-between">
            <Box d="flex">
                <Circle mx={5} size="40px" bg="brand.gray.200" color="white"></Circle>
                <Circle mr={5} size="40px" bg="brand.gray.200" color="white"></Circle>
                <Circle size="40px" bg="brand.gray.200" color="white"></Circle>
            </Box>
            <Box px={4}>
                <Button mr={4} variant="link">georgesabitbol@aphp.com</Button>
                <Button variant="link">mentions légales</Button>
            </Box>

        </Flex>

    )
}