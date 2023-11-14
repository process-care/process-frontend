import { Box, Text } from "@chakra-ui/react";

interface Props {
  content: string;
  w?: string;
}

export default function NoData({ content, w = "80%" }: Props): JSX.Element {
  return (
    <Box
      p="80px"
      backgroundColor="brand.gray.100"
      w={w}
      m="50px auto"
      borderRadius="5px"
      textAlign="center"
    >
      <Text variant="current">{content}</Text>
    </Box>
  );
};
