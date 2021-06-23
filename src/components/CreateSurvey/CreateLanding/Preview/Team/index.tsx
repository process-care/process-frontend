import { Box, Text, Avatar, Flex } from "@chakra-ui/react"
import React from "react"

export interface Member {
    name: string,
    job: string,
}
export interface MemberList {
    members: Member[]
}

const Member: React.FC<Member> = ({ name, job }) => {
    return (
        <Box>
            <Avatar size="xl" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Text variant="currentLight" textTransform="uppercase" mt={7}>{name}</Text>
            <Text variant="xsRegular" mt={2}>{job}</Text>
        </Box>
    )
}

export const Team: React.FC<MemberList> = ({ members }) => {
    return (
        <Box>
            <Text variant="xl">
                L'équipe
            </Text>
            <Flex w="80%" marginX="auto" justify="space-around" mt={20}>
                {members.map(({ name, job }) => <Member name={name} job={job} />
                )}
            </Flex>

        </Box>
    )
}