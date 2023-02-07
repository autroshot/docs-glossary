import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { RefObject } from 'react';

export default function DetailDrawer({
  finalFocusRef,
  isOpen,
  onClose,
}: Props) {
  return (
    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>용어 상세</DrawerHeader>

        <DrawerBody>내용</DrawerBody>

        <DrawerFooter>
          <Button onClick={onClose}>닫기</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface Props {
  finalFocusRef?: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}
