import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer, useColorMode } from '@chakra-ui/react';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex px={6} py={4} gap="5" align="center">
      <Box>용어집</Box>
      <Box>출처</Box>
      <Spacer />
      <IconButton
        aria-label="다크 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
