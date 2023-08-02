import React, { ReactChild } from "react";
import { Drawer, DrawerBody, DrawerContent, Portal } from "@chakra-ui/react";


interface Props {
  content: ReactChild;
  buttonVariant?: string;
  padding?: string;
  onOverlayClick?: () => void;
  isOpen: boolean;
  size?: string;
}

export default function CustomDrawer({
  content,
  isOpen,
  onOverlayClick,
  size,
  ...props
}: Props): JSX.Element {
  return (
    <>
      <Portal>
        <Drawer
          onClose={() => console.log("_")}
          placement="right"
          isFullHeight
          isOpen={isOpen}
          size="full"
          onOverlayClick={onOverlayClick}
          {...props}
        >
          <DrawerContent background="white" maxW="53%">
            <DrawerBody p="0">{content}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
};
