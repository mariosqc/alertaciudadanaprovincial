import React, { useCallback, useState } from "react";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { colors } from "src/themes/original/colors";

function MyComponent() {
  const [center] = useState({ lat: 19.410694, lng: -70.643761 });

  const [map, setMap] = useState(null);

  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ];

  const options = {
    fillColor: colors.pri["300"],
    fillOpacity: 0.7,
    strokeColor: colors.pri["500"],
    strokeOpacity: 0.7,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const onLoadPolygon = (polygon: any) => {
    console.log("polygon: ", polygon);
  };

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
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=places"
          async
          defer
        ></script>
      </Head>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        options={{
          maxZoom: 15,
          minZoom: 5,
          center,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>

        <Polygon onLoad={onLoadPolygon} paths={paths} options={options} />
      </GoogleMap>
    </Box>
  );
}

export default MyComponent;
