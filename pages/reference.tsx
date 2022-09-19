import {
  Container,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import Head from 'next/head';

export default function Reference() {
  return (
    <>
      <Head>
        <title>참고</title>
      </Head>
      <Container maxW="container.xl" my={5}>
        <Heading my={3}>참고</Heading>
        <UnorderedList spacing={3} my={5}>
          <ListItem>
            <Link href="https://wikidocs.net/book/4103" isExternal>
              IT 글쓰기와 번역 노트
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://en.dict.naver.com/" isExternal>
              네이버 영어사전
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://docs.google.com/spreadsheets/d/1fYaEI8vz26N3R2VaxrlNnk9fMQ8zIy4RpvjRp4jZd0Q/edit#gid=843106813"
              isExternal
            >
              모던 자바스크립트 튜토리얼의 용어집
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://transliterator.herokuapp.com/" isExternal>
              영어-한글 표기 변환기
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://kornorms.korean.go.kr/" isExternal>
              한국어 어문 규범
            </Link>
          </ListItem>
        </UnorderedList>
      </Container>
    </>
  );
}
