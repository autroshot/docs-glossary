import { Container, Heading } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import GlossaryTable, { Term } from '../components/glossaryTable';
import { readFile } from 'fs/promises';
import Papa from 'papaparse';
import path from 'path';

export default function Home({
  terms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>용어집</title>
      </Head>
      <main>
        <Container centerContent maxW="container.xl" my={5}>
          <Heading my={3}>용어집</Heading>
          <GlossaryTable terms={terms} />
        </Container>
      </main>
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
