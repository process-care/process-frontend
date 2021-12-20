import { Box, Text, Flex, Container, Image } from "@chakra-ui/react";
import { IColor, ILanding, IMember } from "types/landing";
import React from "react";

type Props = {
  members: ILanding["members"];
  color_theme?: IColor;
};

export const Team: React.FC<Props> = ({ members, color_theme }) => {
  if (members.length === 0) {
    return <></>;
  }
  return (
    <Box pb={10}>
      <Container variant="hr" maxW="unset" mb={5} />
      <Text variant="xl">L'équipe</Text>
      <Flex w="80%" marginX="auto" justify="flex-start" mt={20}>
        {members.map(({ job, name, image }: any, i: number) => (
          <Member
            key={i}
            job={job}
            name={name}
            image={image}
            color={color_theme?.base}
          />
        ))}
      </Flex>
    </Box>
  );
};

const Member: React.FC<IMember> = ({ job, name, image, color }) => {
  return (
    <Flex flexDirection="column" mr={6}>
      <Image
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace(
          "#",
          ""
        )}/${color?.replace("#", "")}`}
        borderRadius="full"
        boxSize="150px"
        src={image}
        alt={name}
      />

      <Text variant="currentLight" textTransform="uppercase" mt={7}>
        {name}
      </Text>
      <Text variant="xsRegular" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};
