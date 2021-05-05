import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Box,
  Portal,
} from "@chakra-ui/react";

import React from "react";

interface Props {
  content: string;
  buttonVariant: string;
  padding: string;
  isAlwaysOpen: boolean;
  headerTitle: string;
  headerSubtitle: string;
  onOverlayClick: () => void;
  isOpen: boolean;
  size: string;
  onClose: () => void;
}
const CustomDrawer: React.FC<Props> = ({
  content,
  headerTitle,
  headerSubtitle,
  isOpen,
  onClose,
  onOverlayClick,
  size,
  ...props
}) => {
  return (
    <>
      <Portal>
        <Drawer
          isFullHeight
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size={size}
          isCentered
          onOverlayClick={onOverlayClick}
          {...props}>
          <DrawerOverlay />
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
