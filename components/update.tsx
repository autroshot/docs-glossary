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

  function millisecondsToBriefText(milliseconds: number): string {
    const SECONDS_IN_A_YEAR = 31556926;
    const SECONDS_IN_A_MONTH = 2629743;
    const SECONDS_IN_A_WEEK = 604800;
    const SECONDS_IN_A_DAY = 86400;
    const SECONDS_IN_AN_HOUR = 3600;
    const SECONDS_IN_A_MINUTE = 60;

    const seconds = milliseconds / 1000;

    if (seconds >= SECONDS_IN_A_YEAR)
      return `${Math.floor(seconds / SECONDS_IN_A_YEAR)} 년`;
    if (seconds >= SECONDS_IN_A_MONTH)
      return `${Math.floor(seconds / SECONDS_IN_A_MONTH)} 개월`;
    if (seconds >= SECONDS_IN_A_WEEK)
      return `${Math.floor(seconds / SECONDS_IN_A_WEEK)} 주`;
    if (seconds >= SECONDS_IN_A_DAY)
      return `${Math.floor(seconds / SECONDS_IN_A_DAY)} 일`;
    if (seconds >= SECONDS_IN_AN_HOUR)
      return `${Math.floor(seconds / SECONDS_IN_AN_HOUR)} 시간`;
    if (seconds >= SECONDS_IN_A_MINUTE)
      return `${Math.floor(seconds / SECONDS_IN_A_MINUTE)} 분`;
    return '조금';
  }
}

interface Props {
  updatedTimestamp: null | number;
}
