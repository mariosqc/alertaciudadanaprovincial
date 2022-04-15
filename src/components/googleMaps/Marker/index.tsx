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
        <_Marker
          /* icon={{
              url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }} */
          key={i}
          position={position}
        />
      ))}
    </div>
  );
};
