import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function GlossaryTable() {
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
          <Tr>
            <Td>application</Td>
            <Td>앱, 애플리케이션</Td>
            <Td>일반</Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>assert</Td>
            <Td>단언하다</Td>
            <Td>일반</Td>
            <Td>테스트</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>assertion</Td>
            <Td>단언</Td>
            <Td>일반</Td>
            <Td>테스트</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>attribute</Td>
            <Td>속성</Td>
            <Td>일반</Td>
            <Td>CSS</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Edge</Td>
            <Td>엣지</Td>
            <Td>고유</Td>
            <Td></Td>
            <Td>https://www.microsoft.com/ko-kr/edge</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
