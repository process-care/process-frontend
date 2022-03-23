import { Box } from "@chakra-ui/react";
import { PageParticipationRedux } from "redux/slices/participation/page";
import { PageEntry } from "../ParticipationMenu";
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
interface Props {
  pages: PageParticipationRedux[];
  navigables: boolean[];
  selectedPage: PageParticipationRedux | undefined;
  selectIndex: (index: number) => void;
  color: string;
}

export const SummaryMobile: React.FC<Props> = ({ pages, navigables, selectedPage, selectIndex, color }) => {
  return (
    <Accordion allowToggle>
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
            <Box flex="1" textAlign="left" color="black">
              Pages
            </Box>
            <AccordionIcon color="black" />
          </AccordionButton>
        </h2>
        <AccordionPanel
          pos="absolute"
          width="100%"
          backgroundColor="white"
          top="70px"
          zIndex="10"
          left="0"
          right="0"
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
                  color={color}
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
  );
};
