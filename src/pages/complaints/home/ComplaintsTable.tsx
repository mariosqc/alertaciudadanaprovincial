import React, { useMemo } from "react";

import { Text } from "@chakra-ui/react";
import { useComplaintContext } from "@/contexts";
import { Table } from "@/components";
import { ComplaintModal } from "./EmergencyModal";
import { createColumnHelper } from "@tanstack/react-table";
import { Complaint } from "@alerta-ciudadana/entity";

interface TableRowType {
  isSelected: boolean;
}

interface TableDataType extends Complaint, TableRowType {}

const columnHelper = createColumnHelper<TableDataType>();

export const ComplaintsTable = () => {
  const pagination = useComplaintContext();
  const columns = useMemo(
    () => [
      columnHelper.accessor("date", { cell: ({ getValue }) => getValue(), header: "Date" }),
      columnHelper.accessor("user", { cell: ({ getValue }) => getValue(), header: "Usuario" }),
      columnHelper.accessor("type", {
        cell: ({ getValue }) => (getValue() ? getValue() : <Text textAlign="center">-</Text>),
        header: "Tipo de Denuncia",
      }),
      columnHelper.accessor("status", { cell: ({ getValue }) => getValue(), header: "Estado" }),
      columnHelper.accessor("phone", { cell: ({ getValue }) => getValue(), header: "Teléfono" }),
      columnHelper.accessor("place", { cell: ({ getValue }) => getValue(), header: "Lugar" }),
      columnHelper.accessor("description", {
        cell: ({ getValue }) => {
          const description = getValue();
          return description.length > 50 ? description.substring(0, 49).concat("...") : description;
        },
        header: "Denuncia",
      }),
      columnHelper.accessor("isSelected", {
        cell: ({ row }) => <ComplaintModal complaint={row.original} />,
        header: "",
        enableColumnFilter: false,
      }),
    ],
    []
  );

  return <Table columns={columns} data={pagination.complaints as TableDataType[]} />;
};
