import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Link, Spacer, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import styles from './navbar.module.css';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={6}
      py={3}
      gap="5"
      align="center"
      direction={{ base: 'column', md: 'row' }}
      boxShadow="0px 1px 2px 0px #0000001a"
      bg={colorMode === 'dark' ? '#242526' : undefined}
    >
      <NextLink href="/">용어집</NextLink>
      <NextLink href="/reference">참고</NextLink>
      <Spacer display={{ base: 'none', md: 'block' }} />
      <Link href="https://autroshot.github.io/doc-archive/" isExternal>
        문서 보관소 <ExternalLinkIcon verticalAlign="0" />
      </Link>
      <Link
        href="https://github.com/autroshot/docs-glossary"
        isExternal
        className={
          colorMode === 'light' ? styles.githubLink : styles.githubLinkDark
        }
        aria-label="깃허브"
      />
      <IconButton
        aria-label="다크 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
