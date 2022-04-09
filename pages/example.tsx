import React, { useState, useRef, useMemo } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

export const ExamplePage = () => {
  // @ts-ignore
  const MapLoader = withScriptjs(GoogleMaps);

  return (
    <div>
      <MapLoader
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4&libraries=drawing"
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

const GoogleMaps = () => {
  const [center] = useState({ lat: 19.41050702557079, lng: -70.64527523623106 });
  const [addNewZone, setAddNewZone] = useState(false);
  const [polygon, setPolygon] = useState<any[]>([]);

  // @ts-ignore
  const googleObject = useMemo(() => google, [google]);

  const zoneBtnClicked = (zone: any, index: any) => {
    console.log("current zone", zone);
    setPolygon(zone.polygon);
  };

  interface Coordinates {
    lat(): number;
    lng(): number;
  }

  const GoogleMapExample = withGoogleMap(() => (
    <GoogleMap defaultZoom={8} center={center}>
      {addNewZone && (
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
          <Polygon key={index} ref={useRef} paths={poly.coord} /* onMouseDown={() => onMousedown(index)}  */ editable />
        ))}
    </GoogleMap>
  ));
  return (
    <div>
      <button onClick={() => setAddNewZone(true)}>Add New Zone</button>
      <GoogleMapExample
        containerElement={<div style={{ height: `95vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default ExamplePage;
