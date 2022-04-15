import Head from "next/head";
import React, { FC, useCallback, useState } from "react";
import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";
import { Marker } from "./Marker";

interface GoogleMapsProps {
  defaultCenter?: google.maps.LatLngLiteral;
  markerList?: google.maps.LatLngLiteral[];
  onClick?(event: google.maps.MapMouseEvent): void;
}

export const GoogleMaps: FC<GoogleMapsProps> = ({ defaultCenter, markerList, onClick }) => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(defaultCenter || { lat: 19.410694, lng: -70.643761 });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=places&libraries=drawing"
          async
          defer
        ></script>
      </Head>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ maxZoom: 10, minZoom: 3 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        {markerList && <Marker positions={markerList} />}
      </GoogleMap>
    </>
  );
};
/*  */
