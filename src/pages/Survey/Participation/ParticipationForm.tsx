import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useGetSurvey } from "call/actions/survey";
import { FormPage } from "./Form/FormPage";
import IPage from "types/form/page";

// ---- TYPES

interface Props {
  surveyId: string
  participationId: string
}


// ---- COMPONENT

export const ParticipationForm: React.FC<Props> = ({
  surveyId,
  participationId,
}) => {
  const { data } = useGetSurvey(surveyId);
  console.log('participation : ', participationId);

  if (!data?.survey) return <Box mt="60">No data for this survey</Box>;

  return (
    <Box>
      <Box mt="6" mb="6">{data.survey.title}</Box>

      <Flex direction="row">
        <Box>
          <PageMenu pages={data.survey.pages} />
        </Box>

        <Box flexGrow={1}>
          {data.survey.pages.map(page => (
            <FormPage key={page.id} pageId={page.id} participationId={participationId}></FormPage>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

// ---- SUB COMPONENTS

// MENU

interface MenuProps {
  pages: IPage[],
}

const PageMenu: React.FC<MenuProps> = ({ pages }) => {
  return (
    <>
      <div>|</div>
      <div>|</div>
      { pages.map(p => (<PageEntry key={p.id} page={p}/>))}
    </>
  );
}

// ONE MENU ENTRY

interface EntryProps {
  page: IPage,
}

const PageEntry: React.FC<EntryProps> = ({ page }) => {
  return (
    <div>| {page.short_name}</div>
  )
}
