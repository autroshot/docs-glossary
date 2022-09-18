import { ExternalLinkIcon, MoonIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Spacer,
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import GlossaryTable from '../components/glossaryTable';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>용어집</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Flex px={6} py={4} gap="5" align="center">
          <Box>용어집</Box>
          <Box>출처</Box>
          <Spacer />
          <IconButton aria-label="다크 모드" icon={<MoonIcon />} />
        </Flex>
      </nav>
      <main>
        <Container centerContent maxW="container.xl" my={3}>
          <Heading>용어집</Heading>
          <GlossaryTable />
        </Container>
      </main>
      <footer>
        <Container centerContent maxW="container.xl" my={3}>
          <HStack spacing="3rem">
            <Link
              href="https://autroshot.github.io/docs-repository/"
              isExternal
            >
              문서 저장소 <ExternalLinkIcon verticalAlign="0" />
            </Link>
            <Link href="#" isExternal>
              GitHub <ExternalLinkIcon verticalAlign="0" />
            </Link>
          </HStack>
        </Container>
      </footer>
    </>
  );
};

export default Home;
