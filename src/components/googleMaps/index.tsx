import React, { FC, useCallback, useRef, useState } from "react";
import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";
import { Marker } from "./marker";

interface GoogleMapsProps {
  defaultCenter?: google.maps.LatLngLiteral;
  markerList?: google.maps.LatLngLiteral[];
  polygonPathList?: google.maps.LatLngLiteral[][];
  isDrawing?: boolean;
  onClick?(event: google.maps.MapMouseEvent): void;
  onPolygonCompleteDrawingManager?({
    coordinates,
    polygon,
  }: {
    coordinates: google.maps.LatLngLiteral[];
    polygon: google.maps.Polygon;
  }): void;
  onEditPolygon?(paths: google.maps.LatLngLiteral[]): void;
}

export const GoogleMaps: FC<GoogleMapsProps> = ({
  defaultCenter,
  markerList,
  onClick,
  isDrawing,
  polygonPathList,
  onPolygonCompleteDrawingManager,
  onEditPolygon,
}) => {
  // Store Polygon path in state

  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState<google.maps.Polygon | null>(null);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);
  const drawingManagerRef = useRef<any>(null);

  // Call setPath with new edited path
  const _onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      onEditPolygon?.(nextPath);
    }
  }, [onEditPolygon]);

  // Bind refs to current Polygon and listeners
  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", _onEditPolygon),
        path.addListener("insert_at", _onEditPolygon),
        path.addListener("remove_at", _onEditPolygon)
      );
    },
    [_onEditPolygon]
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
    const coordinates: google.maps.LatLngLiteral[] = polygon
      .getPaths()
      .getArray()[0]
      .Ed.map((item: any) => ({ lat: item.lat(), lng: item.lng() }));
    onPolygonCompleteDrawingManager?.({ coordinates, polygon });
  };

  // Clean up refs
  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onLoadDrawingManager = (drawingManager: any) => {};

  return (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ maxZoom: 20, minZoom: 3 }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
      >
        {markerList && <Marker positions={markerList} />}

        {polygonPathList &&
          polygonPathList.map((coordinates, index) => (
            <Polygon
              key={index}
              // Make the Polygon editable / draggable
              editable
              draggable
              path={coordinates}
              // Event used when manipulating and adding points
              onMouseUp={_onEditPolygon}
              // Event used when dragging the whole Polygon
              onDragEnd={_onEditPolygon}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
            />
          ))}

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
