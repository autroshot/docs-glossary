import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RefObject } from 'react';

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
              <Box>
                <Heading size="xs">한국어</Heading>
                <Text mt="2">프로퍼티</Text>
              </Box>
              <Box>
                <Heading size="xs">유형</Heading>
                <Text mt="2">일반</Text>
              </Box>
              <Box>
                <Heading size="xs">분야</Heading>
                <Text mt="2">리액트</Text>
              </Box>
              <Box>
                <Heading size="xs">설명</Heading>
                <Text mt="2">
                  원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용
                  원래 뜻은 속성이지만 attribute와의 구분을 위해 프로퍼티를 사용
                </Text>
              </Box>
              <Box>
                <Heading size="xs">출처</Heading>
                <Text mt="2">
                  http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2http://terms.tta.or.kr/dictionary/dictionaryView.do?word_seq=053425-2
                </Text>
              </Box>
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
