import { Container } from '@chakra-ui/react';
import Head from 'next/head';

export default function Reference() {
  return (
    <>
      <Head>
        <title>출처</title>
      </Head>
      <Container maxW="container.xl" my={5}>
        출처
      </Container>
    </>
  );
}
