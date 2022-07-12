import React from "react";

import { Avatar, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import moment from "moment";
import { useUserContext } from "@/contexts";
import { UserModal } from "./UserModal";
import { InactivateUser } from "./InactivateUser";

export const UsersTable = () => {
  const { users } = useUserContext();

  return (
    <TableContainer>
      <Table size="sm" variant="striped">
        <Thead>
          <Tr>
            <Th w="0"></Th>
            <Th>Nombre</Th>
            <Th>Teléfono</Th>
            <Th>Fecha de Creación</Th>
            <Th>Sexo</Th>
            <Th w="0"></Th>
            <Th w="0"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length === 0 && (
            <>
              <Tr>
                <Td colSpan={6}>
                  <Text py="2" textAlign="center" fontWeight="semibold">
                    No se han encontrado usuarios
                  </Text>
                </Td>
              </Tr>{" "}
            </>
          )}
          {users.map((user) => (
            <Tr key={user.uid}>
              <Td w="0">
                <Avatar w="8" h="8" src={user.avatarUrl} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.phone}</Td>
              <Td>
                <Text lineHeight="none">{moment(user.date).format("LLL")}</Text>
              </Td>
              <Td>{user.sex}</Td>
              <Td>
                <InactivateUser />
              </Td>
              <Td>
                <UserModal user={user} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th w="0"></Th>
            <Th>Nombre</Th>
            <Th>Teléfono</Th>
            <Th>Fecha de Creación</Th>
            <Th>Sexo</Th>
            <Th w="0"></Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
