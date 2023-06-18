import { InfoOutlineIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { RefObject, useEffect, useRef, useState } from 'react';
import MyStorage from '../classes/MyStorage';
import DetailDrawer from '../components/glossary/detail/drawer';
import GlossaryTable from '../components/glossary/list/table';
import Update from '../components/glossary/list/update';
import { GetResponseData, Term } from './api/terms';

export default function Home() {
  const [terms, setTerms] = useState<null | Term[]>(null);
  const [updatedTimestamp, setUpdatedTimestamp] = useState<null | number>(null);
  const [searchWord, setSearchWord] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<null | Term>(null);

  const searchWordInput = useRef<HTMLInputElement>(null);
  const detailOpenButtons = useRef<Map<Term, RefObject<HTMLButtonElement>>>(
    new Map()
  );

  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

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
      fetchTerms(myLocalStorage);
    }
  }, []);

  useEffect(() => {
    searchWordInput.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>용어집</title>
      </Head>
      <Container centerContent maxW="container.md" my={5}>
        <Heading my={3}>용어집</Heading>
        <Update
          isLoading={isLoading}
          isError={isError}
          updatedTimestamp={updatedTimestamp}
          onClick={handleUpdateClick}
        />
        <InputGroup my={3}>
          <Input
            placeholder="검색할 용어의 영어나 한국어를 입력하세요."
            ref={searchWordInput}
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
        <GlossaryTable>{createGlossaryTableContent()}</GlossaryTable>
      </Container>
      {terms !== null && selectedTerm !== null ? (
        <DetailDrawer
          term={selectedTerm ?? terms[0]}
          finalFocusRef={detailOpenButtons.current.get(selectedTerm)}
          isOpen={isDetailOpen}
          onClose={onDetailClose}
        />
      ) : null}
    </>
  );

  function createGlossaryTableContent(): React.ReactNode {
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
            <Spinner label="로딩 중..." />
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
          <Td overflow="hidden" textOverflow="ellipsis">
            {term.english}
          </Td>
          <Td overflow="hidden" textOverflow="ellipsis">
            {term.korean}
          </Td>
          <Td padding="0" textAlign="center">
            <IconButton
              icon={<InfoOutlineIcon />}
              aria-label="상세 보기"
              ref={(ref) => {
                if (ref !== null)
                  detailOpenButtons.current.set(term, { current: ref });
              }}
              onClick={() => {
                setSelectedTerm(term);
                onDetailOpen();
              }}
            />
          </Td>
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
    fetchTerms(new MyStorage(localStorage));
  }

  function fetchTerms(myLocalStorage: MyStorage) {
    axios
      .get<GetResponseData>('/api/terms')
      .then((res) => {
        const currentTimestamp = Date.now();

        const terms = res.data;
        const sortedTerms = terms.sort((a, b) =>
          a.english.localeCompare(b.english)
        );

        setIsError(false);
        setTerms(sortedTerms);
        setUpdatedTimestamp(currentTimestamp);

        myLocalStorage.setTerms(sortedTerms);
        myLocalStorage.setUpdatedTimestamp(currentTimestamp);
      })
      .catch(() => {
        setIsError(true);
      })
      .then(() => {
        setIsLoading(false);
      });
  }
}
