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
} from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import { EmergencyModal } from "./EmergencyModal";
import { ChevronLeft, ChevronRight } from "react-feather";
import moment from "moment";

export const EmergenciesTable = () => {
  const { pagination, prevPage, nextPage, changeNumberPerPage } = useEmergencyContext();

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
            {pagination.items.length === 0 && (
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
            {pagination.items.map((emergency, i) => (
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
        <Divider my="3" />
        <Flex justifyContent="space-between" px="3">
          <HStack>
            {[10, 25, 50, 100].map((perPage) => (
              <IconButton
                key={perPage}
                variant={perPage === pagination.perPage ? "solid" : "ghost"}
                colorScheme="pri"
                onClick={() => changeNumberPerPage(perPage)}
                _focus={{}}
                size="sm"
                aria-label=""
                icon={<>{perPage}</>}
              />
            ))}
          </HStack>
          <HStack>
            <IconButton
              isDisabled={!pagination.take}
              onClick={prevPage}
              _focus={{}}
              size="sm"
              aria-label=""
              icon={<ChevronLeft size="1.25rem" />}
            />
            <Text userSelect="none">
              {pagination.take + 1}-{pagination.skip > pagination.total ? pagination.total : pagination.skip} de{" "}
              {pagination.total}
            </Text>
            <IconButton
              isDisabled={pagination.skip > pagination.total}
              onClick={nextPage}
              _focus={{}}
              size="sm"
              aria-label=""
              icon={<ChevronRight size="1.25rem" />}
            />
          </HStack>
        </Flex>
      </TableContainer>
    </>
  );
};
