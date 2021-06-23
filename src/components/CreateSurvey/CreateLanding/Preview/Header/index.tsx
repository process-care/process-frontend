import React from "react"
import {  Button, Circle, Flex, Text } from "@chakra-ui/react"


export const Header:React.FC = () => {
    return (
        <Flex justifyContent="space-between" p="5" alignItems="center">
        <Circle size="40px" bg="brand.gray.200" color="white"></Circle>
        <Text variant="currentLight" textTransform="uppercase">Titre de l'étude</Text>
        <Button variant="rounded" backgroundColor="#FF7A00" color="white">
            Participer à l'étude
        </Button>
    </Flex>
    )
}