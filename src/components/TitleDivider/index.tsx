import { Flex, Divider, Text, Box } from "@chakra-ui/react";

interface Props {
  title: string;
  mt?: string;
  mb?: string;
}

export const TitleDivider: React.FC<Props> = ({
  title,
  mt = "10",
  mb = "5",
}) => {
  return (
    <Flex
      alignItems="center"
      w="100%"
      mt={mt}
      mb={mb}
      justifyContent="space-between"
    >
      <Text
        variant="xs"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="normal"
        textAlign="left"
      >
        {title}
      </Text>
      <Box w="70%">
        <Divider />
      </Box>
    </Flex>
  );
};
