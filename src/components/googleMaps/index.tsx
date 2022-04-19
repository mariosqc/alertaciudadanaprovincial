import React, { FC, useCallback, useRef, useState } from "react";

import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";

import { OriginalTheme } from "@/themes";

import { Marker } from "./marker";

/*TODO: Verificar si un punto está dentro de un polígono https://developers.google.com/maps/documentation/javascript/examples/poly-containsLocation */
interface GoogleMapsProps {
  defaultCenter?: google.maps.LatLngLiteral;
  defaultZoom?: number;
  markerList?: google.maps.LatLngLiteral[];
  polygonPathList?: { draggable?: boolean; editable?: boolean; path: google.maps.LatLngLiteral[] }[];
  isDrawing?: boolean;
  onClick?({ event, coords }: { event: google.maps.MapMouseEvent; coords: google.maps.LatLngLiteral }): void;
  onPolygonCompleteDrawingManager?({
    coordinates,
    polygon,
  }: {
    coordinates: google.maps.LatLngLiteral[];
    polygon: google.maps.Polygon;
  }): void;
  onPolygonCompleteDrawingManagerClean?: boolean;
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
  onPolygonCompleteDrawingManagerClean,
  defaultZoom,
}) => {
  const [map, setMap] = useState(null);

  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);
  const drawingManagerRef = useRef<any>(null);

  const _onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      onEditPolygon?.(nextPath);
    }
  }, [onEditPolygon]);

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
    onPolygonCompleteDrawingManagerClean && polygon.setMap(null);
    onPolygonCompleteDrawingManager?.({ coordinates, polygon });
  };

  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onLoadDrawingManager = (drawingManager: any) => {};

  return (
    <>
      {/* @ts-ignore */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ maxZoom: 15, minZoom: 3, zoom: defaultZoom }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          const coords = e.latLng?.toJSON();
          coords && onClick?.({ event: e, coords });
        }}
      >
        {markerList && <Marker positions={markerList} />}

        {polygonPathList &&
          polygonPathList.map((polygonList, index) => (
            <Polygon
              key={index}
              {...polygonList}
              onMouseUp={_onEditPolygon}
              onDragEnd={_onEditPolygon}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
              options={{
                geodesic: true,
                strokeColor: OriginalTheme.components.colors.pri["500"],
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: OriginalTheme.components.colors.pri["500"],
              }}
            />
          ))}

        {isDrawing && (
          <DrawingManager
            options={
              typeof window !== "undefined"
                ? {
                    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                    polylineOptions: { editable: true, draggable: true },
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
