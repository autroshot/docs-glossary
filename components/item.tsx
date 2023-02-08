import { Box, Heading, Text, useColorMode } from '@chakra-ui/react';

export default function Item({ title, content }: Props) {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Heading
        fontSize="xs"
        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
      >
        {title}
      </Heading>
      <Text mt="2">{content}</Text>
    </Box>
  );
}

interface Props {
  title: string;
  content: string;
}
