import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { GoogleMaps } from "@/components";

function MyComponent() {
  const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>([]);

  return (
    <Box h="100vh">
      <GoogleMaps
        onClick={(e) => {
          if (e.latLng?.toJSON()) setPositions([...positions, e.latLng?.toJSON()]);
        }}
      />
    </Box>
  );
}

export default MyComponent;
