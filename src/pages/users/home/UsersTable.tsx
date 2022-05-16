import React, { useEffect, useState } from "react";

import { User } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { Avatar, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import moment from "moment";

export const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      database.ref("users").on("value", (snapshot) => {
        let data = snapshot.val();
        const users = Object.keys(data).map((userId) => Object.values(data[userId])[0]) as User[];
        resolve(users);
      });
    });
  }

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

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
              <Td></Td>
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
