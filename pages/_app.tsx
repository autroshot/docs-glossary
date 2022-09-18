import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          heading: `'Malgun Gothic', sans-serif`,
          body: `'Malgun Gothic', sans-serif`,
        },
      })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
