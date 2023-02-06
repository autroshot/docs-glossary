import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import styles from './glossaryTable.module.css';

export default function GlossaryTable({ children }: Props) {
  return (
    <TableContainer>
      <Table variant="simple" my={3} className={styles.table} w="37.5rem">
        <Thead>
          <Tr>
            <Th w="40%">영어</Th>
            <Th w="45%">한국어</Th>
            <Th w="15%" textAlign="center">
              상세
            </Th>
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
