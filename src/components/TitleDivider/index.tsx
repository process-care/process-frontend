import { Flex, Divider, Text, Box } from "@chakra-ui/react";

interface Props {
  title: string;
  children?: React.ReactNode;
  mt?: string;
  mb?: string;
}

export default function TitleDivider({
  title,
  mt = "10",
  mb = "5",
  children,
}: Props): JSX.Element {
  return (
    <Flex
      alignItems="center"
      w="100%"
      mt={mt}
      mb={mb}
      justifyContent="flex-start"
    >
      {children}
      <Text
        variant="xs"
        fontWeight="bold"
        textTransform="uppercase"
        whiteSpace="nowrap"
        textAlign="left"
        mr="2"
        ml={children ? "2" : "0"}
        w="fit-content"
      >
        {title}
      </Text>

      <Box ml="2" w="100%">
        <Divider />
      </Box>
    </Flex>
  );
};
