import React, { useMemo } from "react";

import { Avatar, Center, Tag, Text } from "@chakra-ui/react";

import moment from "moment";
import { useUserContext } from "@/contexts";
import { UserModal } from "./UserModal";
import { InactivateUser } from "./InactivateUser";
import { User } from "@alerta-ciudadana/entity";
import { createColumnHelper } from "@tanstack/react-table";
import { Table } from "@/components";

interface TableRowType {
  isSelected: boolean;
}

interface TableDataType extends User, TableRowType {}

const columnHelper = createColumnHelper<TableDataType>();

export const UsersTable = () => {
  const { users } = useUserContext();

  const columns = useMemo(
    () => [
      columnHelper.accessor("avatarUrl", {
        cell: ({ getValue }) => {
          return <Avatar w="8" h="8" src={getValue()} />;
        },
        header: "Avatar",
        enableColumnFilter: false,
      }),
      columnHelper.accessor("name", { cell: ({ getValue }) => getValue(), header: "Nombre" }),
      columnHelper.accessor("email", { cell: ({ getValue }) => getValue(), header: "Correo electrónico" }),
      columnHelper.accessor("phone", { cell: ({ getValue }) => getValue(), header: "Teléfono" }),
      columnHelper.accessor("date", {
        cell: ({ getValue }) => <Text lineHeight="none">{moment(getValue()).format("LLL")}</Text>,
        header: "Fecha de Creación",
      }),
      columnHelper.accessor("sex", { cell: ({ getValue }) => getValue(), header: "Sexo" }),
      columnHelper.accessor("points", {
        cell: ({ getValue }) => (
          <Center>
            <Tag variant="solid" colorScheme="cyan">
              {getValue()}
            </Tag>
          </Center>
        ),
        header: "Puntos",
        enableColumnFilter: false,
      }),
      columnHelper.accessor("isSelected", {
        cell: ({ row }) => <InactivateUser user={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
      columnHelper.accessor("imei", {
        cell: ({ row }) => <UserModal user={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
    ],
    []
  );

  return <Table columns={columns} data={users as TableDataType[]} />;
};
