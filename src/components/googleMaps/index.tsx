import Head from "next/head";
import React, { FC, useCallback, useRef, useState } from "react";
import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";
import { Marker } from "./marker";

interface GoogleMapsProps {
  defaultCenter?: google.maps.LatLngLiteral;
  markerList?: google.maps.LatLngLiteral[];
  onClick?(event: google.maps.MapMouseEvent): void;
}

export const GoogleMaps: FC<GoogleMapsProps> = ({ defaultCenter, markerList, onClick }) => {
  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);

  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);
  const drawingManagerRef = useRef<any>(null);

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

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(defaultCenter || { lat: 19.410694, lng: -70.643761 });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const list = polygon
      .getPaths()
      .getArray()[0]
      .Ed.map((item: any) => ({ lat: item.lat(), lng: item.lng() }));
    setPath(list);

    setIsDrawing(false);
    drawingManagerRef.current = null;
  };

  // Clean up refs
  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onLoadDrawingManager = (drawingManager: any) => {};

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
        options={{ maxZoom: 20, minZoom: 3 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        {markerList && <Marker positions={markerList} />}

        <Polygon
          // Make the Polygon editable / draggable
          editable
          draggable
          path={path}
          // Event used when manipulating and adding points
          onMouseUp={onEdit}
          // Event used when dragging the whole Polygon
          onDragEnd={onEdit}
          onLoad={onLoadPolygon}
          onUnmount={onUnmountPolygon}
        />
        {isDrawing && (
          <DrawingManager
            options={
              typeof window !== "undefined"
                ? {
                    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                    polylineOptions: {
                      editable: true,
                      draggable: true,
                    },
                  }
                : undefined
            }
            onLoad={onLoadDrawingManager}
            onPolygonComplete={onPolygonComplete}
            ref={drawingManagerRef}
          />
        )}
      </GoogleMap>
    </>
  );
};
/* */
