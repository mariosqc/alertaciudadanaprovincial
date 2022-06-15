import React, { useMemo, useState } from "react";

import { NextPage } from "next";
import store from "store";

import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useDistrictContext, useTrackerContext } from "@/contexts";
import { TrackerModal } from "./TrackerModal";
import Cookies from "universal-cookie";

export const TrackerPage: NextPage = () => {
  const { trackers, setAttendEmergency } = useTrackerContext();
  const { districts } = useDistrictContext();

  const polygon = useMemo<google.maps.LatLngAltitude[]>(() => {
    const districtId = new Cookies().get("district_id");
    const district = districts.find((d) => d.id === districtId);
    return district?.polygon || [];
  }, [districts]);

  return (
    <>
      <WrapperPage fullScreen title="Seguimientos" breadcrumb={{ routes: ["tracker"] }}>
        <Card.Wrapper colSpan={12} flex="1">
          <Card.Header title="Seguimiento" />
          <Card.Body h="95%">
            <GoogleMaps
              polygonPathList={[{ path: polygon }]}
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
