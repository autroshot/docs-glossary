import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Center, HStack, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Center py={8} bgColor="#303846" color="#EBEDF0">
      <HStack spacing="3rem">
        <Link href="https://autroshot.github.io/doc-archive/" isExternal>
          문서 보관소 <ExternalLinkIcon verticalAlign="0" />
        </Link>
        <Link href="https://github.com/autroshot/docs-glossary" isExternal>
          깃허브 <ExternalLinkIcon verticalAlign="0" />
        </Link>
      </HStack>
    </Center>
  );
}
