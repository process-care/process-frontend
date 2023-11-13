import React, { useCallback } from "react"
import { Box, Flex, Text } from "@chakra-ui/layout"

import { useAppDispatch, useAppSelector } from "@/redux/hooks/index.js"
import { setIsRemoving } from "@/redux/slices/formBuilder/index.ts"
import { actions, selectors } from "@/redux/slices/scientistData.js"
import { PageRedux, SurveyRedux } from "@/redux/slices/types/index.js"
import { isInactive } from "./utils/index.ts"

import {  LockIcon, PlusIcon, MinusIcon, SplitIcon } from "lucide-react"
import ButtonIcon from "@/components/ButtonIcon.tsx"
import { cn } from "@/utils/ui.ts"

// ---- TYPES

interface Props {
  survey: SurveyRedux;
}

// ---- COMPONENT

export default function PageBuilder({ survey }: Props): JSX.Element {
  const dispatch = useAppDispatch()

  const pages = useAppSelector(selectors.pages.selectPages)
  const selectedCondition = useAppSelector(selectors.conditions.selectSelectedCondition)
  const selectedPage = useAppSelector(selectors.pages.selectSelectedPage)

  const isEditingCondition = selectedCondition !== undefined

  const handlePage = useCallback(() => {
    dispatch(actions.createPage({ id: survey.id }))
  }, [dispatch, survey.id])
  
  return (
    <Flex flexDirection="column" alignItems="center" pt={5} backgroundColor="white" width="100%" position="relative">
      <Box
        onClick={handlePage}
        mb="10"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        _hover={{
          cursor: "pointer",
        }}
      >
        <ButtonIcon icon={PlusIcon} />  
        <Text variant="xs" mt="2">
          Ajouter une page
        </Text>
      </Box>
      
      {pages?.map((page, i) => {
        const inactive = isInactive(selectedCondition, pages, i)
        
        return (
          <PageDisplay
            key={page.id}
            idx={i}
            page={page}
            selectedPage={selectedPage}
            inactive={inactive}
            isEditingCondition={isEditingCondition}
          />
        )
      })}
    </Flex>
  );
};

// ---- SUB COMPONENT

interface PageDisplayProps {
  page: PageRedux
  selectedPage: PageRedux | undefined
  inactive: boolean
  idx: number
  isEditingCondition?: boolean
}

function PageDisplay({
  idx,
  page,
  selectedPage,
  inactive,
  isEditingCondition,
}: PageDisplayProps): JSX.Element {
  const dispatch = useAppDispatch()
  const isSelected = selectedPage?.id === page.id

  const selectPage = useCallback(() => {
    dispatch(actions.setSelectedPage(page.id))
  }, [dispatch, page.id])

  const deletePage = useCallback(() => {
    dispatch(actions.setSelectedPage(page.id))
    dispatch(setIsRemoving(page.id))
  }, [dispatch, page.id])

  // FIXME: Update this, it's too consuming...
  const pagesConditions = useAppSelector(selectors.conditions.selectAllPagesConditions)

  return (
    <div key={page.id} className={cn(
      "w-full mb-6 flex flex-col items-center relative",
      inactive ? "hidden" : "visible"
    )}>
      {/* Page display */}
      <div key={page.id} onClick={selectPage}
        className={cn(
          "flex flex-col space-y-1 items-center justify-center w-[55px] h-[70px] border hover:cursor-pointer",
          isSelected ? "bg-blue-200 border-blue-500" : "bg-transparent border-gray-300"
        )}
      >
        {/* Status Icons */}
        {pagesConditions.some((c) => c?.attributes?.referer_page?.data?.id === page.id) && (
          <SplitIcon size={17} color="gray" />
        )}

        {page?.attributes?.is_locked && (
          <LockIcon size={17} color="gray" />
        )}
      </div>

      {/* Delete shortcut */}
      {idx !== 0 && !isEditingCondition && (
        <ButtonIcon
          icon={MinusIcon}
          size={10}
          type="delete"
          className="absolute top-[-9px] left-[-2px]"
          onClick={deletePage}
        />
      )}

      {/* Page title */}
      <Text mt={1} color="blue.500" fontSize="10" fontWeight={isSelected ? "bold" : ""}>
        {page?.attributes?.name}
      </Text>
    </div>
  )
}