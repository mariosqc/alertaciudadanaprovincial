import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";

export const ComplaintsPage: NextPage = () => {
  return (
    <WrapperPage title="Denuncias">
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Denuncias" />
        <Card.Body>Denuncias</Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
