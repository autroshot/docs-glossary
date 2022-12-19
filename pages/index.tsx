import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import Head from 'next/head';
import GlossaryTable, { Term } from '../components/glossaryTable';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GetResponseData } from './api/get-terms';

export default function Home() {
  const [terms, setTerms] = useState<null | Term[]>(null);
  const [searchWord, setSearchWord] = useState('');
  const [error, setError] = useState<null | string>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get<GetResponseData>('/api/get-terms')
      .then(async (res) => {
        if (res.data) {
          setTerms(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, []);

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  let filteredTerms: Term[] = [];
  if (terms !== null) {
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
            placeholder="검색할 용어의 영어나 한국어를 입력하세요."
            ref={inputElement}
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
