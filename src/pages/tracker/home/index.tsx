import React, { useMemo } from "react";

import { NextPage } from "next";
import removeAccents from "remove-accents";

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
              markerList={trackers.map((tracker) => {
                const url =
                  tracker.tipe === "Esperando..."
                    ? "https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/icons%2Fspin.gif?alt=media&token=5dcf56c3-5f0e-413a-b75d-37ddf49db10e"
                    : `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/emergency-types%2F${removeAccents(
                        tracker.tipe.toLowerCase()
                      )}?alt=media`;

                return {
                  position: { lat: tracker.l[0], lng: tracker.l[1] },
                  icon: {
                    url,
                    scaledSize: new google.maps.Size(36, 36),
                  },
                  onClick: () => {
                    setAttendEmergency({ attending: true, tracker });
                  },
                };
              })}
            />
          </Card.Body>
        </Card.Wrapper>
      </WrapperPage>
      <TrackerModal />
    </>
  );
};
