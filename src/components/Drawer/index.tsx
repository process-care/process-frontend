import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, Portal } from "@chakra-ui/react"

interface Props {
  content: JSX.Element
  buttonVariant?: string
  padding?: string
  onOverlayClick?: () => void
  isOpen: boolean
  size?: string
}

export default function CustomDrawer({
  content,
  isOpen,
  onOverlayClick,
  size,
  ...props
}: Props): JSX.Element {
  return (
    <Portal>
      <Drawer
        onClose={noop}
        placement="right"
        isFullHeight
        isOpen={isOpen}
        size="full"
        onOverlayClick={onOverlayClick}
        {...props}
        closeOnEsc={true}
      >
        <DrawerContent background="white" maxW="53%">
          <DrawerBody p="0">{content}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Portal>
  );
};

// ---- UTILS

function noop() {}