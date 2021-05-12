import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  // DrawerOverlay,
  Box,
  Portal,
} from "@chakra-ui/react";

import React, { ReactChild } from "react";

interface Props {
  content: ReactChild;
  buttonVariant?: string;
  padding?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  onOverlayClick?: () => void;
  isOpen: boolean;
  size?: string;
  onClose?: () => void;
}
const CustomDrawer: React.FC<Props> = ({
  content,
  headerTitle,
  headerSubtitle,
  isOpen,
  onOverlayClick,
  onClose,
  size,
  ...props
}) => {
  return (
    <>
      <Portal>
        <Drawer
          onClose={onClose}
          placement="right"
          isFullHeight
          isOpen={isOpen}
          size={size}
          motionPreset="scale"
          isCentered
          onOverlayClick={onOverlayClick}
          {...props}>
          {/* <DrawerOverlay /> */}
          <DrawerContent background="white">
            <DrawerHeader textAlign="center" pt="20px" pb="5px" color="black">
              <p>{headerTitle}</p>
              <Box fontSize="0.6em" as="span">
                {headerSubtitle}
              </Box>
            </DrawerHeader>
            <DrawerBody p="7px 10px">{content}</DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
};

export default CustomDrawer;
