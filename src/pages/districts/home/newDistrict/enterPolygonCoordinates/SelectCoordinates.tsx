import { Button } from "@/components";
import { Box } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { GoogleMaps } from "src/components/googleMaps";

export const SelectCoordinates = () => {
  const [isActiveDrawing, setIsActiveDrawing] = useState(true);
  const [polygon, setPolygon] = useState<google.maps.LatLngLiteral[]>();

  return (
    <>
      <Box borderWidth="2px" h="md">
        <GoogleMaps
          polygonPathList={polygon ? [polygon] : undefined}
          isDrawing={isActiveDrawing}
          onPolygonCompleteDrawingManager={({ coordinates }) => {
            console.log({ coordinates });
            setPolygon(coordinates);
            setIsActiveDrawing(false);
          }}
        />
      </Box>
      <Button
        w="full"
        mt="2"
        colorScheme="red"
        onClick={() => {
          setPolygon([]);
          setIsActiveDrawing(true);
        }}
      >
        Restablecer Polígono
      </Button>
    </>
  );
};
