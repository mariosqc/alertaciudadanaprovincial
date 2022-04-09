import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";

export const UsersPage: NextPage = () => {
  return (
    <WrapperPage title="Usuarios" breadcrumb={{ routes: ["users"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Usuarios" />
        <Card.Body>
          EmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPageEmergenciesPage
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
