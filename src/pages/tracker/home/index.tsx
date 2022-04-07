import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Box, GridItem } from "@chakra-ui/react";
import { Card } from "@/layout";

export const TrackerPage: NextPage = () => {
  return (
    <WrapperPage title="Seguimientos">
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
      </Card.Wrapper>
    </WrapperPage>
  );
};
