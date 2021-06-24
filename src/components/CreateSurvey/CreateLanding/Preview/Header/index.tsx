import React from "react"
import { Button, Circle, Flex, Text } from "@chakra-ui/react"
import { IColors } from "interfaces/landing"

interface Props {
    theme: IColors
}

export const Header: React.FC<Props> = ({ theme }) => {
    return (
        <Flex justifyContent="space-between" p="5" alignItems="center">
            <Circle size="40px" bg="brand.gray.200" color="white"></Circle>
            <Text variant="currentLight" textTransform="uppercase">Recherche sur l'euphorie</Text>
            <Button variant="rounded" backgroundColor={theme.button} color="white">
                Participer à l'étude
            </Button>
        </Flex>
    )
}