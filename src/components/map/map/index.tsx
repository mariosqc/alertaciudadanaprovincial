import React, { FC } from "react";

import GoogleMapReact, { ChangeEventValue, ClickEventValue, Coords } from "google-map-react";

import { Marker, MarkerProps } from "../Marker";
import { log } from "console";

interface MapProps {
  center?: Coords;
  draggableCursor?: "default" | "pointer";
  trackerPositions?: MarkerProps[];
  onChange?(value: ChangeEventValue): void;
  onClick?(value: ClickEventValue): void;
}

export const Map: FC<MapProps> = ({
  onClick,
  onChange,
  center = { lat: 19.41050702557079, lng: -70.64527523623106 },
  trackerPositions = [],
  draggableCursor,
}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: String(process.env.NEXT_PUBLIC_MAP_KEY) }}
      center={center}
      onChange={onChange}
      zoom={8}
      defaultZoom={8}
      options={{
        minZoom: 5,
        maxZoom: 19,
        draggableCursor,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        keyboardShortcuts: false,
      }}
      onClick={onClick}
    >
      {trackerPositions.map((item, i) => (
        <Marker key={i} {...item} />
      ))}
    </GoogleMapReact>
  );
};
