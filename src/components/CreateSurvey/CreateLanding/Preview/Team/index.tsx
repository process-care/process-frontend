import { Box, Text, Flex, Image, Grid } from "@chakra-ui/react";

import { Color, Member as MemberType } from "@/types/landing.ts"

type Props = {
  members: MemberType[];
  color_theme?: Color;
  isUserView?: boolean;
};

// ---- COMPONENT

export default function Team({ members, color_theme, isUserView }: Props): JSX.Element {
  if (!members) {
    return <></>;
  }

  return (
    <Box w="100%" height="100%" overflow="auto">
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

// ---- SUB COMPONENTS

function Member({ job, name, image, color }: MemberType): JSX.Element {
  return (
    <Flex minWidth={100} flexDirection="column" justifyContent="center" textAlign="center" mb="30px">
      <Image
        src={image}
        alt={name}
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace("#", "")}/${color?.replace("#", "")}`}
        width={100}
        height={100}
        sizes="20vw"
        className="object-cover mx-auto rounded-full"
      />

      <Text variant="smallTitleBold" mt={7}>
        {name}
      </Text>
      <Text className="font-light text-sm" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};
