import { GoogleMaps } from "@/components";
import { Complaint } from "@alerta-ciudadana/entity";
import { Box } from "@chakra-ui/react";
import React, { FC } from "react";

interface ComplaintMapProps {
  complaint: Complaint;
  polygon: google.maps.LatLngLiteral[];
  urlIcon: string;
}

export const ComplaintMap: FC<ComplaintMapProps> = ({ complaint, polygon, urlIcon }) => {
  return (
    <GoogleMaps
      polygonPathList={[{ path: polygon }]}
      defaultCenter={{ lat: complaint.coordinates[0], lng: complaint.coordinates[1] }}
      markerList={[
        {
          position: { lat: complaint.coordinates[0], lng: complaint.coordinates[1] },
          icon: {
            scaledSize: new google.maps.Size(36, 36),
            url: urlIcon,
          },
        },
      ]}
    />
  );
};
