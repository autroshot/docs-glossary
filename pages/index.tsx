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
import MyStorage from '../classes/MyStorage';

export default function Home() {
  const [terms, setTerms] = useState<null | Term[]>(null);
  const [updatedTimestamp, setUpdatedTimestamp] = useState<null | number>(null);
  const [searchWord, setSearchWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const myLocalStorage = new MyStorage(localStorage);
    const termsFromStorage = myLocalStorage.getTerms();
    const updatedTimestampFromStorage = myLocalStorage.getUpdatedTimestamp();

    if (termsFromStorage !== null && updatedTimestampFromStorage !== null) {
      setTerms(termsFromStorage);
      setUpdatedTimestamp(updatedTimestampFromStorage);
      setIsLoading(false);
    } else {
      axios
        .get<GetResponseData>('/api/terms')
        .then(async (res) => {
          if (res.data) {
            const currentTimestamp = Date.now();

            setTerms(res.data);
            setUpdatedTimestamp(currentTimestamp);

            myLocalStorage.setTerms(res.data);
            myLocalStorage.setUpdatedTimestamp(currentTimestamp);
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
          {updatedTimestamp === null ? null : (
            <Text>{`${new Date(
              Date.now() - updatedTimestamp
            ).getSeconds()} 전에 갱신됨`}</Text>
          )}
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
