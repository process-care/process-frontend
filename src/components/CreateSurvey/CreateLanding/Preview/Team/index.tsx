import { Box, Text, Flex, Container, Image } from "@chakra-ui/react";
import { Color, Member as MemberType } from "types/landing";
import React from "react";
import { useMediaQueries } from "utils/hooks/mediaqueries";

type Props = {
  members: MemberType[];
  color_theme?: Color;
};

export const Team: React.FC<Props> = ({ members, color_theme }) => {
  const { isTablet } = useMediaQueries();

  if (members.length === 0) {
    return <></>;
  }
  return (
    <Box pb={10}>
      <Container variant="hr" maxW="unset" mb={5} />
      <Text variant="xlNoMobilVariant">L'équipe</Text>
      <Flex
        w={isTablet ? "100%" : "80%"}
        marginX="auto"
        justify={isTablet ? "center" : "flex-start"}
        mt={20}
      >
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

const Member: React.FC<MemberType> = ({ job, name, image, color }) => {
  const { isTablet } = useMediaQueries();

  return (
    <Flex flexDirection="column" mr={6}>
      <Image
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace(
          "#",
          ""
        )}/${color?.replace("#", "")}`}
        borderRadius="full"
        boxSize={isTablet ? "230px" : "150px"}
        src={image}
        alt={name}
      />

      <Text variant="smallTitleBold" mt={7}>
        {name}
      </Text>
      <Text variant="current" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};
