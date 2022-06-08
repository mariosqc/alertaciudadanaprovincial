import React from "react";

import {
  Tag,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
  HStack,
  Divider,
  chakra,
} from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import { EmergencyModal } from "./EmergencyModal";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";
import moment from "moment";
import { Pagination } from "@/components";

export const EmergenciesTable = () => {
  const pagination = useEmergencyContext();

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
            {pagination.pagination.items.map((emergency, i) => (
              <Tr key={emergency.id}>
                <Td>{moment(emergency.date).format("LLL")}</Td>
                <Td>{emergency.emergency}</Td>
                <Td>{emergency.user}</Td>
                <Td>{emergency.place}</Td>
                <Td>{emergency.phone}</Td>
                <Td>
                  <Tag variant="solid" size="sm" colorScheme={emergency.status === "Por Atender" ? "red" : "green"}>
                    {emergency.status}
                  </Tag>
                </Td>
                <Td></Td>
                <Td>
                  <EmergencyModal emergency={emergency} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
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
          </Tfoot>
        </Table>
        <Pagination {...pagination} />
      </TableContainer>
    </>
  );
};
