import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import Head from 'next/head';
import GlossaryTable from '../components/glossaryTable';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GetResponseData, Term } from './api/terms';

export default function Home() {
  const [terms, setTerms] = useState<null | Term[]>(null);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const terms = getTermsFromLocalStorage();
    if (terms !== null) {
      setTerms(terms);
      setIsLoading(false);
    } else {
      axios
        .get<GetResponseData>('/api/terms')
        .then(async (res) => {
          if (res.data) {
            setTerms(res.data);

            localStorage.setItem('terms', JSON.stringify(res.data));
            localStorage.setItem('updatedTimestamp', String(Date.now()));
          }
        })
        .catch((err) => {
          console.error(err);
          setIsError(true);
        })
        .then(() => {
          setIsLoading(false);
        });
    }

    function getTermsFromLocalStorage() {
      const value = localStorage.getItem('terms');
      if (value === null) return null;

      const parsedValue = JSON.parse(value);
      if (!isTermArray(parsedValue)) return null;
      return parsedValue;
    }

    function getUpdatedTimestampFromLocalStorage() {
      const value = localStorage.getItem('updatedTimestamp');
      if (value === null) return null;
      return Number(value);
    }

    function isTermArray(object: any): object is Term[] {
      return (
        object &&
        Array.isArray(object) &&
        typeof object[0].english === 'string' &&
        typeof object[0].korean === 'string' &&
        typeof object[0].type === 'string' &&
        typeof object[0].field === 'string' &&
        typeof object[0].description === 'string'
      );
    }
  }, []);

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>용어집</title>
      </Head>
      <Container centerContent maxW="container.xl" my={5}>
        <Heading my={3}>용어집</Heading>
        <Center>
          <Text>3시간 전에 갱신됨</Text>
          <Button ms={3}>갱신</Button>
        </Center>
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
    if (terms?.length === 0) {
      return (
        <Tr>
          <Td colSpan={100} textAlign={'center'}>
            DB에 데이터가 존재하지 않습니다.
          </Td>
        </Tr>
      );
    }
    return getFilteredTerms().map((term) => {
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

  function getFilteredTerms(): Term[] {
    if (terms === null) return [];
    if (searchWord.length === 0) return [...terms];
    return terms.filter((term) => {
      return (
        term.english.toLowerCase().includes(searchWord.toLowerCase()) ||
        term.korean.includes(searchWord)
      );
    });
  }
}
