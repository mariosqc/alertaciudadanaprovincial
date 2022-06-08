import React from "react";

import { Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useComplaintContext } from "@/contexts";
import moment from "moment";
import { Pagination } from "@/components";
import { ComplaintModal } from "./EmergencyModal";

export const ComplaintsTable = () => {
  const pagination = useComplaintContext();

  return (
    <>
      <TableContainer py="3">
        <Table mb="4" size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Usuario</Th>
              <Th>Teléfono</Th>
              <Th>Lugar</Th>
              <Th>Denuncia</Th>
              <Th w="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {pagination.pagination.items.length === 0 && (
              <>
                <Tr>
                  <Td colSpan={9}>
                    <Text py="2" textAlign="center" fontWeight="semibold">
                      No se han encontrado emergencias
                    </Text>
                  </Td>
                </Tr>
              </>
            )}
            {pagination.pagination.items.map((complaint, i) => (
              <Tr key={complaint.id}>
                <Td>{moment(complaint.date).format("LLL")}</Td>
                <Td>{complaint.user}</Td>
                <Td>{complaint.phone}</Td>
                <Td>{complaint.place}</Td>
                <Td>
                  {complaint.description.length > 50
                    ? complaint.description.substring(0, 49).concat("...")
                    : complaint.description}
                </Td>
                <Td>
                  {" "}
                  <ComplaintModal complaint={complaint} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Fecha</Th>
              <Th>Usuario</Th>
              <Th>Teléfono</Th>
              <Th>Lugar</Th>
              <Th>Denuncia</Th>

              <Th w="0"></Th>
            </Tr>
          </Tfoot>
        </Table>
        <Pagination {...pagination} />
      </TableContainer>
    </>
  );
};
