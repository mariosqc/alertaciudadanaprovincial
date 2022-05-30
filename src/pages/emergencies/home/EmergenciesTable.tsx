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

export const EmergenciesTable = () => {
  const { pagination, prevPage, nextPage, changeNumberPerPage, goToFirstPage, goToLastPage } = useEmergencyContext();

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
            {/* <IconButton
              size="sm"
              aria-label="fist page"
              icon={<ChevronsLeft size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              isDisabled={!pagination.take}
              onClick={goToFirstPage}
            /> */}
            <IconButton
              size="sm"
              aria-label="fist page"
              icon={<ChevronLeft size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              isDisabled={!pagination.take}
              onClick={prevPage}
            />
            <Flex>
              <Text userSelect="none" fontSize="sm" fontWeight="medium">
                <chakra.span color="pri.500">
                  {pagination.take + 1}-{pagination.skip > pagination.total ? pagination.total : pagination.skip}{" "}
                </chakra.span>{" "}
                de {pagination.total}
              </Text>
            </Flex>
            <IconButton
              size="sm"
              aria-label="last page"
              icon={<ChevronRight size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              isDisabled={pagination.skip > pagination.total - 1}
              onClick={nextPage}
            />
            {/* <IconButton
              size="sm"
              aria-label="last page"
              icon={<ChevronsRight size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              isDisabled={pagination.skip > pagination.total - 1}
              onClick={goToLastPage}
            /> */}
          </HStack>
        </Flex>
      </TableContainer>
    </>
  );
};
