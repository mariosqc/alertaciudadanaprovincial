import React from "react";

import { Tag, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, Box, IconButton } from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import { EmergencyModal } from "./EmergencyModal";
import moment from "moment";
import { FormProvider, Input, Pagination } from "@/components";
import { useDebouncedCallback } from "use-debounce";
import { Emergency } from "@alerta-ciudadana/entity";
import { Check } from "react-feather";
import { AttendEmergencyModal } from "./AttendEmergencyModal";

export const EmergenciesTable = () => {
  const pagination = useEmergencyContext();

  const debounced = useDebouncedCallback(findEmergencies, 250);

  async function findEmergencies(values: { field: string; query: string }) {
    if (values.query === "") {
      return;
    }

    const emergenciesFinded = pagination.allEmergencies.filter((e) => {
      const field = e[values.field as keyof Emergency];
      const query = values.query;
      return String(field).toLowerCase().includes(query.toLowerCase());
    });
  }

  return (
    <FormProvider id="" onSubmit={() => {}}>
      <TableContainer py="3">
        <Table mb="4" size="sm" variant="striped">
          <Thead>
            <Tr>
              {[
                { label: "Fecha", field: "date", finded: true },
                { label: "Emergencia", field: "emergency", finded: true },
                { label: "Usuario", field: "user", finded: true },
                { label: "Lugar", field: "place", finded: true },
                { label: "Teléfono", field: "phone", finded: true },
                { label: "Estado", field: "status", finded: false },
                { label: "Valoración", field: "values", finded: false },
              ].map((column) => (
                <Th key={column.label}>
                  <Box mb="1">
                    <Text mb="1">{column.label}</Text>
                    {column.finded && (
                      <Input
                        name="date"
                        inputProps={{
                          onChange: (e) => debounced({ field: column.field, query: e.target.value }),
                        }}
                      />
                    )}
                  </Box>
                </Th>
              ))}
              <Th w="0"></Th>
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
                <Td>
                  <Tag size="sm" colorScheme={emergency.values === "Verdadero" ? "green" : "red"}>
                    {String(emergency.values)}
                  </Tag>
                </Td>
                <Td>
                  <AttendEmergencyModal emergency={emergency} />
                </Td>
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
    </FormProvider>
  );
};
