import { Box, Heading, Text } from '@chakra-ui/react';

export default function Item({ title, content }: Props) {
  return (
    <Box>
      <Heading size="xs">{title}</Heading>
      <Text mt="2">{content}</Text>
    </Box>
  );
}

interface Props {
  title: string;
  content: string;
}
