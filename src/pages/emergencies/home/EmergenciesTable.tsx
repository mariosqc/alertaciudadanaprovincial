import React, { useState, useMemo } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  Column,
  Table,
} from "@tanstack/react-table";

import {
  chakra,
  Table as _Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  HStack,
  Tag,
} from "@chakra-ui/react";
import { useEmergencyContext } from "@/contexts";
import moment from "moment";
import "moment/locale/es";
import { FormProvider, Input, InputNormal, Pagination } from "@/components";
import { ArrowDown, ArrowUp } from "react-feather";

interface TableDataType {
  date: string;
  emergency: string;
  user: string;
  place: string;
  phone: string;
  status: string;
  values: string;
}
const columnHelper = createColumnHelper<TableDataType>();

export const EmergenciesTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { emergencies } = useEmergencyContext();

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        cell: ({ getValue }) => <Text>{moment(getValue()).locale("es-do").format("ll")}</Text>,
        header: "Fecha",
      }),
      columnHelper.accessor("emergency", { cell: ({ getValue }) => getValue(), header: "Emergencias" }),
      columnHelper.accessor("user", { cell: ({ getValue }) => getValue(), header: "Usuarios" }),
      columnHelper.accessor("place", { cell: ({ getValue }) => getValue(), header: "Lugar" }),
      columnHelper.accessor("phone", { cell: ({ getValue }) => getValue(), header: "Teléfono" }),
      columnHelper.accessor("status", {
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <Tag variant="solid" size="sm" colorScheme={value === "Por Atender" ? "red" : "green"}>
              {value}
            </Tag>
          );
        },
        header: "Estado",
      }),
      columnHelper.accessor("values", {
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <Tag size="sm" colorScheme={value === "Verdadero" ? "green" : "red"}>
              {String(value)}
            </Tag>
          );
        },
        header: "Valoración",
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: emergencies,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    debugTable: true,
  });

  function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue();
    return (
      <InputNormal
        name="date"
        value={(columnFilterValue ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
    );
  }

  // console.log("CAlle");

  return (
    <FormProvider id="" onSubmit={() => {}}>
      <TableContainer py="3">
        <_Table mb="4" size="sm" variant="striped">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th cursor="pointer" key={header.id} p="4">
                      <HStack onClick={header.column.getToggleSortingHandler()} mb="1" spacing={1}>
                        <Text userSelect="none">{flexRender(header.column.columnDef.header, header.getContext())}</Text>
                        <chakra.span>
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <Box>
                                <ArrowUp size="1rem" />
                              </Box>
                            ) : (
                              <Box>
                                <ArrowDown size="1rem" />
                              </Box>
                            )
                          ) : null}
                        </chakra.span>
                      </HStack>
                      <Filter column={header.column} />
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr _hover={{ bgColor: "main.100" }} cursor="pointer" key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        border="none"
                        key={cell.id}
                        p="4"
                        onClick={() => {
                          table.getToggleAllRowsSelectedHandler();
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </_Table>
        {/* <Pagination
          changeNumberPerPage={() => {}}
          goToFirstPage={() => {}}
          goToLastPage={() => {}}
          nextPage={() => {}}
        /> */}
      </TableContainer>
    </FormProvider>
  );
};
