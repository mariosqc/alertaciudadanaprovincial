import React from "react";

import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useComplaintContext } from "@/contexts";

export const ComplaintsTable = () => {
  const { complaints } = useComplaintContext();

  // console.log(complaints);

  return (
    <>
      <TableContainer py="3">
        <Table mb="4" size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Emergencia</Th>
              <Th>Usuario</Th>
              <Th>Lugar</Th>
              <Th>Teléfono</Th>
              <Th>Estado</Th>
              <Th>Valoración</Th>
              <Th w="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={9}>
                <Text py="2" textAlign="center" fontWeight="semibold">
                  No se han encontrado emergencias
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
