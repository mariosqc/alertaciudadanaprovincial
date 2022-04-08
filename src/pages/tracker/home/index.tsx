import React, { useState } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Map } from "@/components";

import { MarkerProps } from "src/components/map/Marker";

export const TrackerPage: NextPage = () => {
  const [positions, setPositions] = useState<MarkerProps[]>([
    { lat: 19.410289483836525, lng: -70.64524957675236, text: "" },
    { lat: 13.3289483836525, lng: -40.45236, text: "" },
    { lat: 19.336525, lng: -70.5, text: "" },
    { lat: 19.59483836525, lng: -70.3675236, text: "" },
  ]);

  return (
    <WrapperPage fullScreen title="Seguimientos">
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
        <Card.Body h="95%">
          <Map.Map
            trackerPositions={positions}
            onClick={(value) => {
              setPositions((prev) => [{ lat: value.lat, lng: value.lng, text: "Example" }]);
            }}
          />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
