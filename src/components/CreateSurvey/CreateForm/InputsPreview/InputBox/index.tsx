import { Box, Flex, Text } from "@chakra-ui/react";

import { QuestionRedux } from "@/redux/slices/types";
import InputIcon from "@/components/CreateSurvey/CreateForm/InputIcon";

interface Props {
  onClick: () => void;
  input?: QuestionRedux;
  isSelected?: boolean;
  isOptionMode?: boolean;
  option?: string | unknown;
}

export default function InputBox({
  onClick,
  input,
  isSelected,
  isOptionMode,
  option,
}: Props): JSX.Element {
  return (
    <Box
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        borderColor: "brand.blue",
        color: isSelected ? "white" : "brand.blue",
      }}
      key={input?.id}
      border="1px solid"
      borderColor={isSelected ? "brand.blue" : "black"}
      w="100%"
      borderRadius="5px"
      padding="5"
      textAlign="left"
      my={5}
      backgroundColor={isSelected ? "brand.blue" : "white"}
      color={isSelected ? "white" : "black"}
    >
      {isOptionMode && (
        <Flex justifyContent="space-between" alignItems="center">
          {typeof option === "string" && (
            <Text variant="titleParaLight">{option}</Text>
          )}
        </Flex>
      )}

      {!isOptionMode && input && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="titleParaLight">{input?.attributes?.label}</Text>
          <Flex alignItems="center">
            <Text variant="xsMedium" color={isSelected ? "white" : "brand.gray.200"} className="mr-2">
              {input?.attributes?.internal_title}
            </Text>

            <Box>
              <InputIcon type={input?.attributes.type} />
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
