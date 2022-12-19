import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import styles from './glossaryTable.module.css';

export default function GlossaryTable({ children }: Props) {
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
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  );
}

interface Props {
  children: React.ReactNode;
}
