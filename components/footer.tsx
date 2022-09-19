import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Center, HStack, Link } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Center py={8} bgColor="#303846" color="#EBEDF0">
      <HStack spacing="3rem">
        <Link href="https://autroshot.github.io/docs-repository/" isExternal>
          문서 저장소 <ExternalLinkIcon verticalAlign="0" />
        </Link>
        <Link href="https://autroshot.github.io/docs-repository/" isExternal>
          GitHub <ExternalLinkIcon verticalAlign="0" />
        </Link>
      </HStack>
    </Center>
  );
}
