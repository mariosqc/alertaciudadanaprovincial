import React, { FC, useEffect, useRef } from "react";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Marker } from "../Marker";

interface MapProps {
  center?: Center;
}

export const Map: FC<MapProps> = ({ center }) => {
  const render = (status: "LOADING" | "SUCCESS" | "FAILURE") => {
    switch (status) {
      case Status.LOADING:
        return <p>Cargando...</p>;
      case Status.FAILURE:
        return <p>Error...</p>;
      case Status.SUCCESS:
        return (
          <>
            <Marker position={{ lat: 19.4136, lng: -70.6473 }} />
            <GoogleMap center={{ lat: 19.4136014, lng: -70.6473487 }}>
              <Marker position={{ lat: 19.4136, lng: -70.6473 }} />
            </GoogleMap>
          </>
        );
      default:
        return <>Default</>;
    }
  };

  return (
    <div>
      <Wrapper apiKey="AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4" render={render} />
    </div>
  );
};

interface GoogleMapProps {
  center: Center;
}

const GoogleMap: FC<GoogleMapProps> = ({ center }) => {
  const ref = useRef<any>();

  useEffect(() => {
    new (window as any).google.maps.Map(ref.current, {
      center,
      zoom: 0,
    });
  });

  return <div ref={ref} style={{ height: "50rem" }} />;
};
