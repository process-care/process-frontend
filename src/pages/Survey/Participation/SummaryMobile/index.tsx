import { Box } from "@chakra-ui/react";
import { ReduxPage } from "redux/slices/participation/page";
import { PageEntry } from "../ParticipationMenu";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
interface Props {
  pages: ReduxPage[];
  navigables: boolean[];
  selectedPage: ReduxPage | undefined;
  selectIndex: (index: number) => void;
  color: string;
}

export const SummaryMobile: React.FC<Props> = ({
  pages,
  navigables,
  selectedPage,
  selectIndex,
  color,
}) => {
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
            <Box flex="1" textAlign="left">
              Sommmaire
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel
          pos="absolute"
          width="100%"
          backgroundColor="white"
          left="0"
          right="0"
          paddingTop="20px"
          top="60px"
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
