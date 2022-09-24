import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import GlossaryTable, { Term } from '../components/glossaryTable';
import { readFile } from 'fs/promises';
import Papa from 'papaparse';
import path from 'path';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

export default function Home({
  terms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchWord, setSearchWord] = useState('');

  let filteredTerms: Term[] = [];
  if (searchWord.length === 0) {
    filteredTerms = [...terms];
  } else {
    filteredTerms = terms.filter((term) => {
      return (
        term.english.toLowerCase().includes(searchWord.toLowerCase()) ||
        term.korean.includes(searchWord)
      );
    });
  }

  return (
    <>
      <Head>
        <title>용어집</title>
      </Head>
      <Container centerContent maxW="container.xl" my={5}>
        <Heading my={3}>용어집</Heading>
        <InputGroup my={3}>
          <Input
            placeholder="검색할 영어나 한국어를 입력하세요."
            value={searchWord}
            onChange={(event) => setSearchWord(event.currentTarget.value)}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <GlossaryTable terms={filteredTerms} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const terms: Term[] = [];

  const file = await readFile(
    path.join(process.cwd(), 'public', '/glossary.csv'),
    'utf-8'
  );

  Papa.parse<string[]>(file, {
    complete(results) {
      if (results.data.length !== 0) {
        results.data.map((term, index) => {
          if (index >= results.data.length - 1) return;
          terms.push({
            english: term[0] ?? '',
            korean: term[1] ?? '',
            comment: term[2] ?? '',
            type: (term[3] ?? '') as '일반' | '고유',
            field: term[4] ?? '',
          });
        });
      }
    },
  });

  return { props: { terms } };
}
