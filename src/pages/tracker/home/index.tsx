import React, { useState } from "react";

import { NextPage } from "next";

import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Map } from "@/components";

import { MarkerProps } from "src/components/map/Marker";

export const TrackerPage: NextPage = () => {
  const [positions, setPositions] = useState<MarkerProps[]>([]);

  return (
    <WrapperPage fullScreen title="Seguimientos">
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
        <Card.Body h="95%">
          <Map.Map trackerPositions={positions} />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
