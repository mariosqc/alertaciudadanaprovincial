import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";

export const EmergenciesPage: NextPage = () => {
  return (
    <WrapperPage fullScreen title="Emergencias" breadcrumb={{ routes: ["emergencies"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Emergencias" />
        <Card.Body h="95%">
          <GoogleMaps />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
