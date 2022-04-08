import React, { useState, useRef, useMemo } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Polygon } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

const data = [
  {
    area: "Zone2",
    cartamount: "",
    extra_shippingamount: "",
    polygon: [
      {
        id_polygon: 1,
        coord: [
          {
            lat: 11.174036305817275,
            lng: 76.3754534171875,
          },
          {
            lat: 10.526644973776667,
            lng: 76.6061663078125,
          },
          {
            lat: 10.75339097376777,
            lng: 77.47957939375,
          },
        ],
      },
      {
        id_polygon: 2,
        coord: [
          {
            lat: 11.28179683077826,
            lng: 75.89857811201172,
          },
          {
            lat: 10.774977003245414,
            lng: 76.16774315107422,
          },
          {
            lat: 11.292570666429365,
            lng: 76.91481346357422,
          },
        ],
      },
    ],
    shippingamount: "",
  },
  {
    area: "Zone3",
    cartamount: "",
    extra_shippingamount: "",
    polygon: [
      {
        id_polygon: 1,
        coord: [
          {
            lat: 11.174036305817275,
            lng: 76.3754534171875,
          },
          {
            lat: 10.526644973776667,
            lng: 76.6061663078125,
          },
          {
            lat: 10.75339097376777,
            lng: 77.47957939375,
          },
        ],
      },
      {
        id_polygon: 2,
        coord: [
          {
            lat: 11.28179683077826,
            lng: 75.89857811201172,
          },
          {
            lat: 10.774977003245414,
            lng: 76.16774315107422,
          },
          {
            lat: 11.292570666429365,
            lng: 76.91481346357422,
          },
        ],
      },
    ],
    shippingamount: "",
  },
];

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
  const [center, setCenter] = useState({ lat: 19.41050702557079, lng: -70.64527523623106 });
  const [addNewZone, setAddNewZone] = useState(false);
  const [polygon, setPolygon] = useState<any>(null);
  const [polygonData, setPolygonData] = useState(data);
  const [zoneIndex, setZoneIndex] = useState(null);
  const polygonRef = useRef<any>(null);

  // @ts-ignore
  const googleObject = useMemo(() => google, [google]);

  const onMousedown = (ref) => {
    //get the reference of the polygon then used the ref as it's index so that you can get the specific polygon
    const polygon = polygonRef[ref].getPath();
    console.log(polygon);
    //add event listeners for the polygon changes and pass the polygon as parameter to the function you need, you also need to pass the ref (or index)
    googleObject.maps.event.addListener(polygon, "set_at", () => getPolygonNewPaths(polygon, ref));
    googleObject.maps.event.addListener(polygon, "insert_at", () => getPolygonNewPaths(polygon, ref));
    googleObject.maps.event.addListener(polygon, "remove_at", () => getPolygonNewPaths(polygon, ref));
  };

  const getPolygonNewPaths = (polygon, ref) => {
    let polygonPaths = [];
    polygon.getArray().forEach((path) => {
      const line = {
        lat: path.lat(),
        lng: path.lng(),
      };
      polygonPaths.push(line);
    });
    //this is the new polygon paths which includes what you editted
    console.log("new polygonpaths", polygonPaths);
    //you will see the current value of that polygon paths in your state
    console.log("current polygonpaths from state", polygonData[zoneIndex].polygon[ref].coord);
    //put this current value of your polygonData to a variable holder
    const newPolygon = polygonData;
    //change the value of the polygon path to the variable that holds yout current polygonData
    newPolygon[zoneIndex].polygon[ref].coord = polygonPaths;
    //This is now the value of your changed polygonData
    console.log("changed polygon data in variable hiolder", newPolygon);
    //now change the polygon Data state to the changed polygonData

    setPolygonData(newPolygon);
    console.log("changed Polygon Data in state", polygonData);
  };

  //function will be called when the zone button will be clicked. If your zone are in different locations, you can put the logic in this function to change the state of the center to that zone coords.
  const zoneBtnClicked = (zone: any, index: any) => {
    console.log("current zone", zone);
    setPolygon(zone.polygon);
    /* setCenter(zone.polygon[0].coord[2]);
    setZoneIndex(index); */
  };

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
            var coordinates = value.getPath().getArray();
            console.log(value.getPath().getArray());
          }}
        />
      )}
      {polygon !== null &&
        polygon.map((poly, index) => (
          <Polygon
            key={index}
            ref={useRef}
            paths={poly.coord}
            onMouseDown={() => {
              onMousedown(index);
            }}
            editable
          />
        ))}
    </GoogleMap>
  ));
  return (
    <div>
      {polygonData.map((zone, index) => (
        <button key={index} id={zone.area} onClick={() => zoneBtnClicked(zone, index)}>
          {zone.area}
        </button>
      ))}
      <button onClick={() => setAddNewZone(true)}>Add New Zone</button>
      <GoogleMapExample
        containerElement={<div style={{ height: `500px`, width: "500px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default ExamplePage;
