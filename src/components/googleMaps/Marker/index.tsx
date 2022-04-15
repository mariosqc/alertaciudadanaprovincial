import React, { FC } from "react";
import { Marker as _Marker } from "@react-google-maps/api";

interface MarkerProps {
  positions: google.maps.LatLngLiteral[];
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export const Marker: FC<MarkerProps> = ({ positions }) => {
  return (
    <div>
      {positions.map((position, i) => (
        <_Marker key={i} position={position} />
      ))}
    </div>
  );
};
