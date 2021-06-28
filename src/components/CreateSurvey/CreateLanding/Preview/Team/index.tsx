import { Box, Text, Flex } from "@chakra-ui/react";
import { IMember } from "interfaces/landing";
import React from "react";

export interface MemberList {
  members: IMember[];
}

const Member: React.FC<IMember> = ({ job, name, image }) => {
  return (
    <Flex flexDirection="column" mr={6}>
      <img src={image} alt={name} style={{ maxWidth: "120px" }} />
      <Text variant="currentLight" textTransform="uppercase" mt={7}>
        {name}
      </Text>
      <Text variant="xsRegular" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};

export const Team: React.FC<MemberList> = ({ members }) => {
  return (
    <Box>
      <Text variant="xl">L'équipe</Text>
      <Flex w="80%" marginX="auto" justify="flex-start" mt={20}>
        {members.map(({ job, name, image }: any, i: number) => (
          <Member key={i} job={job} name={name} image={image} />
        ))}
      </Flex>
    </Box>
  );
};
