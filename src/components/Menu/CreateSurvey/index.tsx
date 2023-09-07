import { CheckIcon } from "@chakra-ui/icons";
import { CircularProgress, Flex, Text } from "@chakra-ui/react";
import Link from "next/link.js"
import Image from "next/image.js"
import { StepBackIcon } from "lucide-react"

import { useAppSelector } from "@/redux/hooks/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"

interface Props {
  surveyTitle?: string | null | undefined;
}

export default function Menu({ surveyTitle }: Props): JSX.Element {
  const { isSaving } = useAppSelector((state) => state.application);
  const { isTablet } = useMediaQueries();
  return (
    <Flex
      pos="relative"
      p={5}
      borderBottom="1px solid rgb(234, 234, 239)"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Link href={`/dashboard`}>
        <Flex ml={isTablet ? "0" : "50px"} alignItems="center">
          <StepBackIcon />
          <Text fontSize="12px" ml={2} mr="30px">
            Dashboard
          </Text>
        </Flex>
      </Link>
      <Text fontSize="12px" textTransform="uppercase" isTruncated maxWidth="250px">
        {surveyTitle}
      </Text>
      {isSaving && (
        <Text variant="xs" mr="40px" color="brand.green" pos="absolute" right="0">
          <CheckIcon mr="7px" />
          Modification sauvegardée
          <CircularProgress ml={2} isIndeterminate color="brand.green" size="2" />
        </Text>
      )}
    </Flex>
  );
};
