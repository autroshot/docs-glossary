import {
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { RefObject } from 'react';
import Item from './item';

export default function DetailDrawer({
  finalFocusRef,
  isOpen,
  onClose,
}: Props) {
  return (
    <Drawer
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Container maxW="container.md" maxH="100%" overflowY="auto">
          <DrawerHeader fontSize="2xl">accessibility</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack
              spacing={3}
              align="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Item title="한국어" content="프로퍼티" />
              <Item title="유형" content="일반" />
              <Item title="분야" content="리액트" />
              <Item
                title="설명"
                content="원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용
                  원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용 원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용 원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용 원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용"
              />
              <Item
                title="출처"
                content="http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2"
              />
            </VStack>
          </DrawerBody>
        </Container>
      </DrawerContent>
    </Drawer>
  );
}

interface Props {
  finalFocusRef?: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}
