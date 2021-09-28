import { Box, Text, Flex, Container, Image } from "@chakra-ui/react";
import { ILanding, IMember } from "types/landing";
import React from "react";

type Props = {
  members: ILanding['members'],
}

export const Team: React.FC<Props> = ({
  members,
}) => {
  return (
    <Box pb={10}>
      <Container variant="hr" maxW="unset" mb={5} />
      <Text variant="xl">L'équipe</Text>
      <Flex w="80%" marginX="auto" justify="flex-start" mt={20}>
        {members.map(({ job, name, image }: any, i: number) => (
          <Member key={i} job={job} name={name} image={image} />
        ))}
      </Flex>
    </Box>
  );
};

const Member: React.FC<IMember> = ({ job, name, image }) => {
  return (
    <Flex flexDirection="column" mr={6}>
      <Image borderRadius="full" boxSize="150px" src={image} alt={name} />

      <Text variant="currentLight" textTransform="uppercase" mt={7}>
        {name}
      </Text>
      <Text variant="xsRegular" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};
