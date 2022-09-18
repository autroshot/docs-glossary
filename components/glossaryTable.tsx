import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function GlossaryTable({ terms }: Props) {
  return (
    <TableContainer>
      <Table variant="simple" my={3}>
        <Thead>
          <Tr>
            <Th>영어</Th>
            <Th>한국어</Th>
            <Th>종류</Th>
            <Th>분야</Th>
            <Th>설명</Th>
          </Tr>
        </Thead>
        <Tbody>
          {terms.map((term) => {
            return (
              <Tr key={term.english}>
                <Td>{term.english}</Td>
                <Td>{term.korean}</Td>
                <Td>{term.type}</Td>
                <Td>{term.field}</Td>
                <Td>{term.comment}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

interface Props {
  terms: Term[];
}

export interface Term {
  english: string;
  korean: string;
  type: '일반' | '고유';
  field: string;
  comment: string;
}
