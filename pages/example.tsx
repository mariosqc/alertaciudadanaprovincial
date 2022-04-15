import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polygon, DrawingManager, Marker } from "@react-google-maps/api";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

function MyComponent() {
  const [center, setCenter] = useState({ lat: 19.410694, lng: -70.643761 });
  const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>([]);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    [center]
  );

  return (
    <Box h="100vh">
      <Head>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=places&libraries=drawing"
          async
          defer
        ></script>
      </Head>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        options={{
          maxZoom: 10,
          minZoom: 3,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          const newPosition = e.latLng?.toJSON();

          console.log(newPosition);

          if (newPosition) {
            setPositions((prev) => [...prev, newPosition]);
          }
        }}
      >
        {positions.map((position, i) => (
          <Marker
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            key={i}
            position={position}
          />
        ))}
      </GoogleMap>
    </Box>
  );
}

export default MyComponent;
