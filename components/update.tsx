import { Button, Center, Text } from '@chakra-ui/react';

export default function Update({ updatedTimestamp }: Props) {
  return (
    <Center>
      {updatedTimestamp === null ? null : (
        <Text>{`${new Date(
          Date.now() - updatedTimestamp
        ).getSeconds()} 전에 갱신됨`}</Text>
      )}
      <Button ms={3}>갱신</Button>
    </Center>
  );
}

interface Props {
  updatedTimestamp: null | number;
}
