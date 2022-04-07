import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Box, Flex, GridItem, Heading, HStack } from "@chakra-ui/react";
import { Button } from "@/components";

export const EmergenciesPage: NextPage = () => {
  return (
    <WrapperPage title="Emergencias">
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Emergencias" />
        <Card.Body>
          EmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPage
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
