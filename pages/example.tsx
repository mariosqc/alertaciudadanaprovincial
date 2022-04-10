import React, { useState, useRef, useMemo, FC } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Polygon, Marker, MarkerProps } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

export const ExamplePage = () => {
  const [markers, setMarkers] = useState<Coords[]>([]);

  const markerList = useMemo(
    () => markers.map(({ lat, lng }, i) => <Marker position={{ lat, lng }} cursor="pointer" key={i} />),
    [markers]
  );

  // @ts-ignore
  const MapLoader = withScriptjs(() => (
    <GoogleMaps
      center={{ lat: 19.41050702557079, lng: -70.64527523623106 }}
      onClick={({ coords }) => {
        console.log(coords);
        setMarkers([...markers, { lat: coords.lat, lng: coords.lng }]);
      }}
      markers={markers}
      markerList={markerList}
    />
  ));

  return (
    <div>
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=drawing"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

interface GoogleMapsProps {
  center?: Coords;
  onClick?(value: { coords: Coords; e: any }): void;
  // Marker list props
  markers?: Coords[];
  markerList: any;
}

const GoogleMaps: FC<GoogleMapsProps> = ({ center, onClick, markers = [], markerList }) => {
  const [addNewZone, setAddNewZone] = useState(false);

  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={10}
      center={center}
      defaultOptions={{ maxZoom: 10 }}
      onClick={(e) => onClick?.({ coords: { lat: e.latLng.lat(), lng: e.latLng.lng() }, e })}
    >
      {props.children}
      {markerList}
    </GoogleMap>
  ));

  return (
    <div>
      <GoogleMapExample
        containerElement={<div style={{ height: `95vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default ExamplePage;
/* {addNewZone && (
        <DrawingManager
          defaultDrawingMode={googleObject.maps.drawing.OverlayType.POLYGON}
          defaultOptions={{
            drawingControl: true,
            drawingControlOptions: {
              position: googleObject.maps.ControlPosition.TOP_CENTER,
              drawingModes: [googleObject.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: { editable: true, draggable: true },
          }}
          onPolygonComplete={(value) => {
            const coordinates = (value.getPath().getArray() as Coordinates[]).map((coord) => ({
              lat: coord.lat(),
              lng: coord.lng(),
            }));

            // setAddNewZone(false);
            console.log(coordinates);
          }}
        />
      )}
      {polygon !== null &&
        polygon.map((poly, index) => (
          <Polygon key={index} ref={useRef} paths={poly.coord} /* onMouseDown={() => onMousedown(index)} editable />
          ))} */
