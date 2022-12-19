import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Td,
  Tr,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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
        setIsError(true);
      })
      .then(() => {
        setIsLoading(false);
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
        <GlossaryTable>{getGlossaryTableContent()}</GlossaryTable>
      </Container>
    </>
  );

  function getGlossaryTableContent(): React.ReactNode {
    if (isError) {
      return (
        <Tr>
          <Td colSpan={100} textAlign={'center'}>
            서버에서 오류가 발생했습니다.
          </Td>
        </Tr>
      );
    }
    if (isLoading) {
      return (
        <Tr>
          <Td colSpan={100} textAlign={'center'}>
            <Spinner label="로딩 중입니다..." />
          </Td>
        </Tr>
      );
    }
    return filteredTerms.map((term) => {
      return (
        <Tr key={term.english}>
          <Td>{term.english}</Td>
          <Td>{term.korean}</Td>
          <Td>{term.type}</Td>
          <Td>{term.field}</Td>
          <Td>{term.description}</Td>
        </Tr>
      );
    });
  }
}
