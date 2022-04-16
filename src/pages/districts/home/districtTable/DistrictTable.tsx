import React, { useEffect, useState } from "react";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import { FormProvider } from "@/components";
import { DistrictTableMenuOptions } from "./DistrictTableMenuOptions/DistrictTableMenuOptions";
import { PolygonInformationModal } from "./polygonInformationModal/PolygonInformationModal";
import { database } from "@/firebase";
import moment from "moment";
import numeral from "numeral";

export const DistrictTable = () => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    database.ref("/admin/districts").on("value", (snapshot) => {
      let districts = snapshot.val();

      districts = Object.keys(districts || {})
        .map((key: any) => ({
          id: key,
          ...districts[key],
          polygon: districts[key].polygon.map((path: string) =>
            /* Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto */
            path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
          ),
        }))
        .sort((a: District, b: District) => moment(b.createdAt).diff(moment(a.createdAt)));

      setDistricts(districts);
    });
  }, []);

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
              <Th>Área</Th>
              <Th>Polígono</Th>
              <Th w="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {districts.length === 0 && (
              <>
                <Tr>
                  <Td colSpan={6}>
                    <Text py="2" textAlign="center" fontWeight="semibold">
                      No se han encontrado distritos
                    </Text>
                  </Td>
                </Tr>{" "}
              </>
            )}
            {districts.map((district: District) => (
              <Tr key={district.id}>
                <Td>{district.name}</Td>
                <Td>
                  <Text lineHeight="none">{district.user.name}</Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="semibold">
                    {district.user.credentials.username}
                  </Text>
                </Td>
                <Td>
                  <Text lineHeight="none">{moment(district.createdAt).format("LLL")}</Text>
                </Td>
                <Td>{numeral(district.area).format("0,0.00")} km²</Td>
                <Td>
                  <PolygonInformationModal polygon={district.polygon} />
                </Td>
                <Td>
                  <DistrictTableMenuOptions district={district} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario Encargado</Th>
              <Th>Fecha de Creación</Th>
              <Th>Área</Th>
              <Th>Polígono</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </FormProvider>
  );
};
