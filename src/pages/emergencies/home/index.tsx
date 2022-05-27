import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useEmergencyContext } from "@/contexts";

export const EmergenciesPage: NextPage = () => {
  const { emergencies } = useEmergencyContext();

  return (
    <WrapperPage fullScreen title="Emergencias" breadcrumb={{ routes: ["emergencies"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Emergencias" />
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
