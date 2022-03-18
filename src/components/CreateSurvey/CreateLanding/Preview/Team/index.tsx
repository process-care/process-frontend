import { Box, Text, Flex, Image, Grid } from "@chakra-ui/react";
import { Color, Member as MemberType } from "types/landing";
import React from "react";

type Props = {
  members: MemberType[];
  color_theme?: Color;
  isUserView?: boolean;
};

export const Team: React.FC<Props> = ({ members, color_theme, isUserView }) => {
  if (!members) {
    return <></>;
  }

  return (
    <Box w="100%">
      <Grid
        pt="40px"
        templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap="5px"
      >
        {members.map(({ job, name, image }: any, i: number) => (
          <Member isUserView={isUserView} key={i} job={job} name={name} image={image} color={color_theme?.base} />
        ))}
      </Grid>
    </Box>
  );
};

const Member: React.FC<MemberType> = ({ job, name, image, color }) => {
  return (
    <Flex flexDirection="column" justifyContent="center" textAlign="center" mb="30px">
      <Image
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace("#", "")}/${color?.replace("#", "")}`}
        borderRadius="full"
        boxSize="100px"
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
