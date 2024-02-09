import { Box, Button, Flex } from "@chakra-ui/react"
import Image from "next/image.js"

import { t } from "@/static/createLanding.ts"
import { LandingRedux } from "@/redux/slices/types/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import WysiwygReader from "@/components/Fields/Wysiwyg/Reader"

interface Props {
  inactiveSubmit: boolean;
  data: LandingRedux | undefined;
  onParticipate: () => void;
}

export default function Description({ inactiveSubmit, data, onParticipate }: Props): JSX.Element {
  const { isTablet } = useMediaQueries()

  return (
    <Flex className="w-full h-full flex-col">
      <Flex alignItems="center" justifyContent="flex-end" pb="20px">
        <Box>
          {data?.attributes?.logo && 
            <Image
              src={data?.attributes?.logo}
              alt="Logo"
              width={120}
              height={120}
            />
          }
        </Box>

        {data?.attributes?.partners_logos?.map((logo: any, idx: number) => {
          return (
            <Box key={idx}>
              <Image alt="Logo" src={logo?.image} width={120} height={120} />
            </Box>
          )
        })}
      </Flex>

      <WysiwygReader
        content={data?.attributes?.presentation}
        className="max-h-[350px]"
      />

      <Flex mt={10} justifyContent="space-between" flexDirection={isTablet ? "column" : "row"}>
        <Button
          variant="rounded"
          width="90%"
          margin="0 auto"
          left="0"
          right="0"
          backgroundColor={data?.attributes?.color_theme?.button || "brand.blue"}
          onClick={onParticipate}
          disabled={inactiveSubmit}
        >
          {t.cta_participate}
        </Button>
      </Flex>
    </Flex>
  );
};
