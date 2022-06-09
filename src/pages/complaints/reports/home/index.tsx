import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { useComplaintContext } from "@/contexts";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";

export const ComplaintReportsPage: NextPage = () => {
  const { complaints } = useComplaintContext();
  return (
    <WrapperPage fullScreen title="Reportes de Denuncias" breadcrumb={{ routes: ["complaints", "complaintReports"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Reportes de Denuncias" subtitle={`${complaints.length} Resultados encontrados`} />
        <Card.Body h="95%">
          <GoogleMaps
            markerList={complaints.map(({ coordinates, user }) => ({
              position: { lat: coordinates[0], lng: coordinates[1] },
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
