import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { colors } from "src/themes/original/colors";

function MyComponent() {
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);

  const [path, setPath] = useState([
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ]);

  const [center] = useState({ lat: 19.410694, lng: -70.643761 });

  const [map, setMap] = useState(null);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

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

  // Bind refs to current Polygon and listeners
  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  const onLoadDrawingManager = (drawingManager: any) => {
    console.log(drawingManager);
  };

  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      map.fitBounds(bounds);
      setMap(map);
    },
    [center]
  );

  const onPolygonComplete = (polygon: any) => {
    console.log(polygon);
  };

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    [center]
  );

  console.log("The path state is", path);
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
          center,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>

        <Polygon
          editable
          draggable
          path={path}
          onLoad={onLoadPolygon}
          paths={path}
          options={options}
          onMouseUp={onEdit}
          onDragEnd={onEdit}
          onUnmount={onUnmountPolygon}
        />
        {/* <DrawingManager
          // drawingMode={"polyline"}
          options={{ polygonOptions: { editable: true, draggable: true } }}
          onLoad={onLoadDrawingManager}
          onPolygonComplete={onPolygonComplete}
        /> */}
      </GoogleMap>
    </Box>
  );
}

export default MyComponent;
