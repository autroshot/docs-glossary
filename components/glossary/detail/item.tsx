import { Box, Heading, Link, Text, useColorMode } from '@chakra-ui/react';

export default function Item({ title, content, isLink }: Props) {
  const { colorMode } = useColorMode();

  return (
    <Box>
      <Heading
        fontSize="xs"
        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
      >
        {title}
      </Heading>
      <Box mt="2">
        {isLink ? (
          <Link href={content} isExternal>
            {content}
          </Link>
        ) : (
          <Text>{content}</Text>
        )}
      </Box>
    </Box>
  );
}

interface Props {
  title: string;
  content: string;
  isLink?: boolean;
}
