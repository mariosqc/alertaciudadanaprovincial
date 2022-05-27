import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useEmergencyContext } from "@/contexts";

export const EmergencyReportsPage: NextPage = () => {
  const { emergencies } = useEmergencyContext();
  return (
    <WrapperPage
      fullScreen
      title="Reportes de Emergencias"
      breadcrumb={{ routes: ["emergencies", "emergenciesReports"] }}
    >
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Reportes de Emergencias" subtitle={`${emergencies.length} Resultados encontrados`} />
        <Card.Body h="95%">
          <GoogleMaps
            markerList={emergencies.map(({ coor, user }) => ({
              position: { lat: coor[0], lng: coor[1] },
              onClick: () => {
                console.log(user);
              },
            }))}
          />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
