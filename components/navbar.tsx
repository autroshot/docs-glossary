import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      px={6}
      py={3}
      gap="5"
      align="center"
      boxShadow="0px 1px 2px 0px #0000001a"
      bg={colorMode === 'dark' ? '#242526' : undefined}
    >
      <Link href="/">용어집</Link>
      <Link href="/reference">출처</Link>
      <Spacer />
      <Link href="https://autroshot.github.io/docs-repository/">
        <a>
          문서 저장소 <ExternalLinkIcon verticalAlign="0" />
        </a>
      </Link>
      <Link href="https://autroshot.github.io/docs-repository/">
        <a>
          GitHub <ExternalLinkIcon verticalAlign="0" />
        </a>
      </Link>
      <IconButton
        aria-label="다크 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
