import { Button } from "@/components";
import { Box } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoogleMaps } from "src/components/googleMaps";

interface SelectCoordinatesProps {
  value: google.maps.LatLngLiteral[];
  onChange?(coordinates: google.maps.LatLngLiteral[]): void;
}

export const SelectCoordinates: FC<SelectCoordinatesProps> = ({ value, onChange }) => {
  const [isActiveDrawing, setIsActiveDrawing] = useState(true);
  const [polygon, setPolygon] = useState<google.maps.LatLngLiteral[]>(value);

  return (
    <>
      <Box borderWidth="2px" h="md">
        <GoogleMaps
          polygonPathList={polygon ? [polygon] : undefined}
          isDrawing={isActiveDrawing}
          onPolygonCompleteDrawingManager={({ coordinates }) => {
            setPolygon(coordinates);
            setIsActiveDrawing(false);
            onChange?.(coordinates);
          }}
          onEditPolygon={(paths) => {
            setPolygon(paths);
            onChange?.(paths);
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
