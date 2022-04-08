import React, { FC, useEffect, useState } from "react";

export interface MarkerProps {
  lat: number;
  lng: number;
  text: string;
}

export const Marker: FC<any> = (options) => {
  const [marker, setMarker] = useState<any>();

  console.log(marker);

  useEffect(() => {
    if (!marker) {
      // @ts-ignore
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
