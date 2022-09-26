import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import styles from './glossaryTable.module.css';

export default function GlossaryTable({ terms }: Props) {
  return (
    <TableContainer whiteSpace="normal">
      <Table variant="simple" my={3} className={styles.table} w="75rem">
        <Thead>
          <Tr>
            <Th w="20%">영어</Th>
            <Th w="24%">한국어</Th>
            <Th w="8%">종류</Th>
            <Th w="13%">분야</Th>
            <Th w="35%">설명</Th>
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
