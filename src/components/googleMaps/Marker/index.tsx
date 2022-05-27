import React, { FC } from "react";
import { Marker as _Marker } from "@react-google-maps/api";

export interface MarkerProps {
  position: google.maps.LatLngLiteral;
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export const Marker: FC<MarkerProps> = ({ ...props }) => {
  return (
    <div>
      {/* @ts-ignore */}
      <_Marker {...props} />
    </div>
  );
};
