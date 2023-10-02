import { Box, Button, Flex } from "@chakra-ui/react"
import Image from "next/image.js"

import { t } from "@/static/createLanding.ts"
import { LandingRedux } from "@/redux/slices/types/index.js"
import { useMediaQueries } from "@/utils/hooks/mediaqueries.js"
import { useWysiwygSerializer } from "@/components/Fields/Wysiwyg/Wysiwyg"

interface Props {
  inactiveSubmit: boolean;
  data: LandingRedux | undefined;
  onParticipate: () => void;
}

export default function Description({ inactiveSubmit, data, onParticipate }: Props): JSX.Element {
  const attributes = data?.attributes
  const { isTablet } = useMediaQueries()

  const html = useWysiwygSerializer(attributes?.presentation)

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

        {attributes?.partners_logos?.map((logo: any, idx: number) => {
          return (
            <Box key={idx}>
              <Image alt="Logo" src={logo?.image} width={120} height={120} />
            </Box>
          );
        })}
      </Flex>

      <div
        className="font-light text-sm max-h-[350px] overflow-auto text-left"
        dangerouslySetInnerHTML={{
          __html: html ?? "",
        }}
      ></div>

      <Flex mt={10} justifyContent="space-between" flexDirection={isTablet ? "column" : "row"}>
        <Button
          variant="rounded"
          width="90%"
          margin="0 auto"
          left="0"
          right="0"
          backgroundColor={attributes?.color_theme?.button || "brand.blue"}
          onClick={onParticipate}
          disabled={inactiveSubmit}
        >
          {t.cta_participate}
        </Button>
      </Flex>
    </Flex>
  );
};
