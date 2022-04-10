import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Box, Flex, GridItem, Heading, HStack } from "@chakra-ui/react";
import { Button, Map } from "@/components";

export const EmergenciesPage: NextPage = () => {
  return (
    <WrapperPage fullScreen title="Emergencias" breadcrumb={{ routes: ["emergencies"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Emergencias" />
        <Card.Body h="95%">
          <Map.Map />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
