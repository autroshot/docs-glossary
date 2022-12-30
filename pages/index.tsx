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
import GlossaryTable from '../components/glossaryTable';
import { SearchIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { GetResponseData, Term } from './api/terms';
import MyStorage from '../classes/MyStorage';
import Update from '../components/update';

export default function Home() {
  const [terms, setTerms] = useState<null | Term[]>(null);
  const [updatedTimestamp, setUpdatedTimestamp] = useState<null | number>(null);
  const [searchWord, setSearchWord] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const myLocalStorage = new MyStorage(localStorage);
    setIsLoading(true);

    const termsFromStorage = myLocalStorage.getTerms();
    const updatedTimestampFromStorage = myLocalStorage.getUpdatedTimestamp();

    if (termsFromStorage !== null && updatedTimestampFromStorage !== null) {
      setTerms(termsFromStorage);
      setUpdatedTimestamp(updatedTimestampFromStorage);
      setIsLoading(false);
    } else {
      getTermsFromServer(myLocalStorage);
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
        <Update
          updatedTimestamp={updatedTimestamp}
          onClick={handleUpdateClick}
        />
        <InputGroup my={3}>
          <Input
            placeholder="검색할 용어의 영어나 한국어를 입력하세요."
            ref={inputElement}
            value={searchWord === null ? '' : searchWord}
            onChange={(event) =>
              setSearchWord(
                event.currentTarget.value === ''
                  ? null
                  : event.currentTarget.value
              )
            }
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

    function getFilteredTerms(): Term[] {
      if (terms === null) return [];
      if (searchWord === null) return [...terms];
      return terms.filter((term) => {
        return (
          term.english.toLowerCase().includes(searchWord.toLowerCase()) ||
          term.korean.includes(searchWord)
        );
      });
    }
  }

  function handleUpdateClick() {
    setIsLoading(true);
    setTerms(null);
    setUpdatedTimestamp(null);
    getTermsFromServer(new MyStorage(localStorage));
  }

  function getTermsFromServer(myLocalStorage: MyStorage) {
    axios
      .get<GetResponseData>('/api/terms')
      .then((res) => {
        const currentTimestamp = Date.now();

        setTerms(res.data);
        setUpdatedTimestamp(currentTimestamp);

        myLocalStorage.setTerms(res.data);
        myLocalStorage.setUpdatedTimestamp(currentTimestamp);
      })
      .catch((err) => {
        setIsError(true);
      })
      .then(() => {
        setIsLoading(false);
      });
  }
}
