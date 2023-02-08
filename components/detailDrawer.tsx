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
import { Term } from '../pages/api/terms';
import Item from './item';

export default function DetailDrawer({
  term,
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
          <DrawerHeader fontSize="2xl">{term.english}</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack
              spacing={3}
              align="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <Item title="한국어" content={term.korean} />
              <Item title="유형" content={term.type} />
              <Item title="분야" content={term.field} />
              <Item title="설명" content={term.description} />
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
  term: Term;
  finalFocusRef?: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}
