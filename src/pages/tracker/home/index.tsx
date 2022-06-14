import React from "react";

import { NextPage } from "next";

import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useTrackerContext } from "@/contexts";

export const TrackerPage: NextPage = () => {
  const { trackers } = useTrackerContext();

  return (
    <WrapperPage fullScreen title="Seguimientos" breadcrumb={{ routes: ["tracker"] }}>
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
        <Card.Body h="95%">
          <GoogleMaps markerList={trackers.map((traket) => ({ position: { lat: traket.l[0], lng: traket.l[1] } }))} />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
