import { Box } from "@chakra-ui/react"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react"

import { PageParticipationRedux } from "@/redux/slices/participation/page.js"
import PageEntry from "./PageEntry.tsx"

// ---- TYPES

type Props = {
  pages: PageParticipationRedux[]
  navigables: boolean[]
  selectedPage: PageParticipationRedux | undefined
  selectIndex: (index: number) => void
  color: string,
}

// ---- COMPONENT

export default function SummaryMobile({
  pages,
  navigables,
  selectedPage,
  selectIndex,
  color,
}: Props): JSX.Element {
  return (
    <Accordion allowToggle reduceMotion>
      <AccordionItem
        border="none"
        backgroundColor="transparent"
        _focus={{ outline: "none", backgroundColor: "transparent" }}
        _hover={{ outline: "none", backgroundColor: "transparent" }}
      >
        <h2>
          <AccordionButton
            p="0"
            backgroundColor="transparent"
            _focus={{ outline: "none", backgroundColor: "transparent" }}
            _hover={{ outline: "none", backgroundColor: "transparent" }}
          >
            <Box flex="1" textAlign="left" color="white">
              Pages
            </Box>
            <AccordionIcon color="white" />
          </AccordionButton>
        </h2>

        <AccordionPanel
          pos="absolute"
          width="100%"
          backgroundColor={ color }
          top="55px"
          zIndex="10"
          left="15px"
          padding="10px"
          borderBottom="1px solid rgb(234, 234, 239)"
        >
          <Box>
            {pages.map((p, idx) => {
              return (
                <PageEntry
                  key={p.id}
                  index={idx}
                  page={p}
                  color={'white'}
                  isNavigable={navigables[idx]}
                  selectedPageId={selectedPage?.id}
                  selectIndex={selectIndex}
                />
              );
            })}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
