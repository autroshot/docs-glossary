import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Center, Container, Heading, HStack, Link } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import GlossaryTable, { Term } from '../components/glossaryTable';
import { readFile } from 'fs/promises';
import Papa from 'papaparse';
import path from 'path';
import Navbar from '../components/navbar';

export default function Home({
  terms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>용어집</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Container centerContent maxW="container.xl" my={5}>
          <Heading my={3}>용어집</Heading>
          <GlossaryTable terms={terms} />
        </Container>
      </main>
      <footer>
        <Center py={8} bgColor="#303846" color="#EBEDF0">
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
        </Center>
      </footer>
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
