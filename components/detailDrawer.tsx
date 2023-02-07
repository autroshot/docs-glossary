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

export default function DetailDrawer({ isOpen, onClose }: Props) {
  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
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
  isOpen: boolean;
  onClose: () => void;
}
