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
            <Link href="https://en.dict.naver.com/" isExternal>
              네이버 영어사전
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://kornorms.korean.go.kr/" isExternal>
              한국어 어문 규범
            </Link>
          </ListItem>
          <ListItem>
            <Link href="http://terms.tta.or.kr/" isExternal>
              TTA 정보통신용어사전
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://wikidocs.net/book/4103" isExternal>
              IT 글쓰기와 번역 노트
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
            <Link
              href="https://github.com/mdn/translated-content/blob/main/docs/ko/translation-guide.md#%EC%9A%A9%EC%96%B4-%EC%A7%80%EC%B9%A8"
              isExternal
            >
              MDN 번역 지침의 용어 지침
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href="https://msit.powerbi.com/view?r=eyJrIjoiODJmYjU4Y2YtM2M0ZC00YzYxLWE1YTktNzFjYmYxNTAxNjQ0IiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9"
              isExternal
            >
              마이크로소프트 용어집
            </Link>
          </ListItem>
        </UnorderedList>
      </Container>
    </>
  );
}
