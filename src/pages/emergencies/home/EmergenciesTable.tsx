import React from "react";

import { Tag, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import moment from "moment";
import { EmergencyModal } from "./EmergencyModal";

export const EmergenciesTable = () => {
  const { emergencies } = useEmergencyContext();

  return (
    <TableContainer py="3">
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th w="0"></Th>
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
          {emergencies.length === 0 && (
            <>
              <Tr>
                <Td colSpan={6}>
                  <Text py="2" textAlign="center" fontWeight="semibold">
                    No se han encontrado emergencias
                  </Text>
                </Td>
              </Tr>{" "}
            </>
          )}
          {emergencies.map((emergency) => (
            <Tr key={emergency.id}>
              <Td w="0"></Td>
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
            <Th w="0"></Th>
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
    </TableContainer>
  );
};
