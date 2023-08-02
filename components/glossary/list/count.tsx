import { Text } from '@chakra-ui/react';
import { Term } from '../../../pages/api/terms';

export default function Count({ terms }: Props) {
  return (
    <Text>{terms !== null ? `용어 ${terms.length}개` : '개수 세는 중...'}</Text>
  );
}

interface Props {
  terms: null | Term[];
}
