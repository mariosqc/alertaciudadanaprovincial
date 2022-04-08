import React, { FC } from "react";

import GoogleMapReact, { ChangeEventValue, ClickEventValue, Coords } from "google-map-react";

import { Marker, MarkerProps } from "../Marker";

interface MapProps {
  center?: Coords;
  trackerPositions?: MarkerProps[];
  onChange?(value: ChangeEventValue): void;
  onClick?(value: ClickEventValue): void;
}

export const Map: FC<MapProps> = ({
  onClick,
  onChange,
  center = { lat: 19.41050702557079, lng: -70.64527523623106 },
  trackerPositions = [],
}) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: String(process.env.NEXT_PUBLIC_MAP_KEY) }}
      center={center}
      onChange={onChange}
      zoom={8}
      defaultZoom={8}
      options={{ minZoom: 5, maxZoom: 19, draggableCursor: "pointer" }}
      onClick={onClick}
    >
      {trackerPositions.map((item, i) => (
        <Marker key={i} lat={item.lat} lng={item.lng} text="My Marker" />
      ))}
    </GoogleMapReact>
  );
};
