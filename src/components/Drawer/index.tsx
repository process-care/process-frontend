import { Drawer, DrawerBody, DrawerContent, Portal } from "@chakra-ui/react";

import React, { ReactChild } from "react";

interface Props {
  content: ReactChild;
  buttonVariant?: string;
  padding?: string;
  onOverlayClick?: () => void;
  isOpen: boolean;
  size?: string;
}
const CustomDrawer: React.FC<Props> = ({
  content,

  isOpen,
  onOverlayClick,
  size,
  ...props
}) => {
  return (
    <>
      <Portal>
        <Drawer
          onClose={() => console.log("_")}
          placement="right"
          isFullHeight
          isOpen={isOpen}
          size={size}
          motionPreset="scale"
          isCentered
          onOverlayClick={onOverlayClick}
          {...props}
        >
          <DrawerContent background="white">
            <DrawerBody p="0 10px">{content}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
};

export default CustomDrawer;
