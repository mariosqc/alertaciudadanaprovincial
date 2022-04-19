import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card, CardContainer } from "@/layout";
import { NewDistrict } from "./newDistrict/NewDistrict";
import { DistrictTable } from "./districtTable/DistrictTable";
import { Divider, Flex, HStack, IconButton, Text, chakra } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";

export const DistrictTemplate: NextPage = () => {
  return (
    <WrapperPage title="Listado de Distritos" breadcrumb={{ routes: ["districts"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Listado de Distritos"
          subtitle="25 Resultados encontrados"
          optionsRight={[<NewDistrict key={1} />]}
        />
        <Card.Body px="0">
          <DistrictTable />
        </Card.Body>
        <Divider />
        <CardContainer>
          <HStack justifyContent="flex-end" spacing={1}>
            <IconButton
              size="sm"
              aria-label="fist page"
              icon={<ChevronsLeft size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
            />
            <IconButton
              size="sm"
              aria-label="fist page"
              icon={<ChevronLeft size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
            />
            <Flex>
              <Text userSelect="none" fontSize="sm" fontWeight="medium">
                <chakra.span color="pri.700">10-20</chakra.span> de 25
              </Text>
            </Flex>
            <IconButton
              size="sm"
              aria-label="last page"
              icon={<ChevronRight size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
            />
            <IconButton
              size="sm"
              aria-label="last page"
              icon={<ChevronsRight size="1.25rem" />}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
            />
          </HStack>
        </CardContainer>
      </Card.Wrapper>
    </WrapperPage>
  );
};
