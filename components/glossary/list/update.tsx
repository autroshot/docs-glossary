import { Button, Center, Spinner } from '@chakra-ui/react';

export default function Update({
  isLoading,
  isError,
  updatedTimestamp,
  onClick,
}: Props) {
  return (
    <Center>
      {getDescription()}
      <Button ms={3} disabled={isLoading} onClick={onClick}>
        갱신
      </Button>
    </Center>
  );

  function getDescription(): React.ReactNode {
    if (isError) return '오류';
    if (isLoading) return <Spinner label="로딩 중..." />;
    if (updatedTimestamp === null) return '오류';
    return (
      <>{`${millisecondsToBriefReadableTime(
        Date.now() - updatedTimestamp
      )} 전에 갱신됨`}</>
    );
  }
}

export function millisecondsToBriefReadableTime(milliseconds: number): string {
  const SECONDS_IN_A_YEAR = 31556926; // 대략 365.24 * 24 * 60 * 60
  const SECONDS_IN_A_MONTH = 2629743; // 대략 30.44 * 24 * 60 * 60
  const SECONDS_IN_A_WEEK = 604800; // 7 * 24 * 60 * 60
  const SECONDS_IN_A_DAY = 86400; // 24 * 60 * 60
  const SECONDS_IN_AN_HOUR = 3600; // 60 * 60
  const SECONDS_IN_A_MINUTE = 60;

  const seconds = milliseconds / 1000;

  if (seconds >= SECONDS_IN_A_YEAR)
    return `${Math.floor(seconds / SECONDS_IN_A_YEAR)}년`;
  if (seconds >= SECONDS_IN_A_MONTH)
    return `${Math.floor(seconds / SECONDS_IN_A_MONTH)}개월`;
  if (seconds >= SECONDS_IN_A_WEEK)
    return `${Math.floor(seconds / SECONDS_IN_A_WEEK)}주`;
  if (seconds >= SECONDS_IN_A_DAY)
    return `${Math.floor(seconds / SECONDS_IN_A_DAY)}일`;
  if (seconds >= SECONDS_IN_AN_HOUR)
    return `${Math.floor(seconds / SECONDS_IN_AN_HOUR)}시간`;
  if (seconds >= SECONDS_IN_A_MINUTE)
    return `${Math.floor(seconds / SECONDS_IN_A_MINUTE)}분`;
  return '조금';
}

interface Props {
  updatedTimestamp: null | number;
  isLoading: boolean;
  isError: boolean;
  onClick: () => void;
}
