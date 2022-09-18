import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    heading: `'Malgun Gothic', sans-serif`,
    body: `'Malgun Gothic', sans-serif`,
  },
  ...config,
});

export default theme;
