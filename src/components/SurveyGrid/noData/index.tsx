import { Box, Text } from "@chakra-ui/react";

interface Props {
  content: string;
}

export const NoData: React.FC<Props> = ({ content }) => {
  return (
    <Box
      p="80px"
      backgroundColor="brand.gray.100"
      w="80%"
      m="50px auto"
      borderRadius="5px"
      textAlign="center"
    >
      <Text variant="xl" mb="20px">
        🤌
      </Text>
      <Text variant="current">{content}</Text>
    </Box>
  );
};
