import React from "react";

import { NextPage } from "next";

import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useTrackerContext } from "@/contexts";
import { TrackerModal } from "./TrackerModal";

export const TrackerPage: NextPage = () => {
  const { trackers, newTrackerDetected, setAttendEmergency } = useTrackerContext();

  return (
    <>
      <WrapperPage fullScreen title="Seguimientos" breadcrumb={{ routes: ["tracker"] }}>
        <Card.Wrapper colSpan={12} flex="1">
          <Card.Header title="Seguimiento" />
          <Card.Body h="95%">
            <GoogleMaps
              markerList={trackers.map((tracker) => ({
                position: { lat: tracker.l[0], lng: tracker.l[1] },
                onClick: () => {
                  setAttendEmergency({ attending: true, tracker });
                },
              }))}
            />
          </Card.Body>
        </Card.Wrapper>
      </WrapperPage>
      <TrackerModal />
    </>
  );
};
