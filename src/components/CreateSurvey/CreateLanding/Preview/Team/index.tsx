import { Box, Text, Flex, Container, Image, Grid } from "@chakra-ui/react";
import { Color, Member as MemberType } from "types/landing";
import React from "react";

type Props = {
  members: MemberType[];
  color_theme?: Color;
  isUserView?: boolean;
};

export const Team: React.FC<Props> = ({ members, color_theme, isUserView }) => {
  if (members.length === 0) {
    return <></>;
  }
  return (
    <Box pb={10}>
      <Container variant="hr" maxW="unset" />
      <Text variant="xlNoMobilVariant" mb="80px" mt="45px">
        L'équipe
      </Text>
      <Grid
        mt="40px"
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="40px 10px"
      >
        {members.map(({ job, name, image }: any, i: number) => (
          <Member
            isUserView={isUserView}
            key={i}
            job={job}
            name={name}
            image={image}
            color={color_theme?.base}
          />
        ))}
      </Grid>
    </Box>
  );
};

const Member: React.FC<MemberType> = ({
  job,
  name,
  image,
  color,
  isUserView,
}) => {
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Image
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace(
          "#",
          ""
        )}/${color?.replace("#", "")}`}
        borderRadius="full"
        boxSize={isUserView ? "230px" : "80px"}
        src={image}
        alt={name}
        mx="auto"
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
