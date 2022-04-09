import React, { FC, useMemo } from "react";

import {
  Box,
  Breadcrumb as _Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  GridItem,
} from "@chakra-ui/react";
import { ChevronRight, Home } from "react-feather";
import Link from "next/link";

export type RoutesBreadcrumbType =
  | "users"
  | "tracker"
  | "complaints"
  | "complaintTypes"
  | "complaintReports"
  | "emergencies"
  | "emergenciesTypes"
  | "emergenciesReports"
  | "districts";

type RouteObj = {
  label: string;
  href: string;
};

const Routes: Record<RoutesBreadcrumbType, RouteObj> = {
  users: {
    label: "Usuarios",
    href: "/users",
  },
  complaints: {
    label: "Denuncias",
    href: "/complaints",
  },
  emergencies: {
    label: "Emergencias",
    href: "/emergencies",
  },
  complaintTypes: {
    label: "Tipos de Denuncias",
    href: "/complaints/types",
  },
  complaintReports: {
    label: "Reportes de Denuncias",
    href: "/complaints/reports",
  },
  emergenciesTypes: {
    label: "Tipos de Emergencias",
    href: "/emergencies/types",
  },
  emergenciesReports: {
    label: "Reportes de Emergencias",
    href: "/emergencies/reports",
  },
  tracker: {
    label: "Seguimiento",
    href: "/tracker",
  },
  districts: {
    label: "Distritos",
    href: "/districts",
  },
};

interface BreadcrumbProps {
  routes?: RoutesBreadcrumbType[];
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ routes = [] }) => {
  const items = useMemo(
    () =>
      routes
        .filter((route) => Object.keys(Routes).includes(route))
        .map((key) => {
          return Routes[key as RoutesBreadcrumbType];
        }),
    [routes]
  );

  return (
    <GridItem colSpan={12}>
      <HStack ml="4">
        <Box color="blue.500">
          <Link href="/dashboard">
            <a>
              <Flex alignItems="center">
                <Home size="1.25rem" />
                <ChakraLink ml="1" fontWeight="medium">
                  Inicio
                </ChakraLink>
              </Flex>
            </a>
          </Link>
        </Box>
        {items.length > 0 && <Text color="gray.500">|</Text>}
        <_Breadcrumb
          separator={
            <Box color="gray.500">
              <ChevronRight size="1rem" />
            </Box>
          }
          spacing="8px"
        >
          {items.map((item) => (
            <BreadcrumbItem key={item.href}>
              <BreadcrumbLink fontWeight="medium">
                <Link href={item.href}>
                  <a>
                    <ChakraLink color="blue.500">{item.label}</ChakraLink>
                  </a>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </_Breadcrumb>
      </HStack>
    </GridItem>
  );
};
