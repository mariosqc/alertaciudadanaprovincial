import React from "react";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import { FormProvider } from "@/components";
import { DistrictTableMenuOptions } from "./DistrictTableMenuOptions/DistrictTableMenuOptions";
import { PolygonInformationModal } from "./polygonInformationModal/PolygonInformationModal";

export const DistrictTable = () => {
  return (
    <FormProvider id="" onSubmit={() => {}}>
      <TableContainer>
        <Table size="sm" variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario Encargado</Th>
              <Th>Fecha de Creación</Th>
              <Th>Polígono</Th>
              <Th w="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Canabacoa</Td>
              <Td>
                <Text lineHeight="none">Erickson Manuel Holguín</Text>
                <Text color="gray.600" fontSize="sm" fontWeight="semibold">
                  (erickson01d@gmail.com)
                </Text>
              </Td>
              <Td>
                <Text lineHeight="none">16-04-2022</Text>
              </Td>
              <Td>
                <PolygonInformationModal />
              </Td>
              <Td>
                <DistrictTableMenuOptions />
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario Encargado</Th>
              <Th>Fecha de Creación</Th>
              <Th>Polígono</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </FormProvider>
  );
};
