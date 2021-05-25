import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { removeAllInputs, toggleCollapseView } from "redux/slices/formBuilder";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCollapse = useAppSelector(
    (state) => state.formBuilder.is_collapse_view
  );
  return (
    <Flex justifyContent="space-between" w="100%" alignItems="center" my="50px">
      <ButtonGroup>
        <Button variant="rounded" mr={5}>
          Vérifier
        </Button>
        <Button
          variant="link"
          fontSize="10px"
          onClick={() => dispatch(removeAllInputs())}
        >
          Supprimer toutes les question
        </Button>
      </ButtonGroup>
      {/* <Text fontSize="12px">TITRE DE LA PAGE</Text> */}

      <ButtonGroup>
        <Button variant="ghost" onClick={() => dispatch(toggleCollapseView())}>
          {isCollapse ? "-" : "="}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
