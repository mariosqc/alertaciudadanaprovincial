import React, { FC } from "react";

import { Box, Image } from "@chakra-ui/react";
import { Coords } from "google-map-react";

export interface MarkerProps extends Coords {
  text: string;
  onClick?(): void;
}

export const Marker: FC<MarkerProps> = ({ onClick }) => {
  return (
    <Box pos="relative" color="red.500">
      <Image
        cursor="pointer"
        onClick={onClick}
        pos="absolute"
        top="-1.25rem"
        left="-5"
        w="10"
        src="https://cdn-icons.flaticon.com/png/512/3585/premium/3585243.png?token=exp=1649368549~hmac=b542171c9d7a0713a035a20bfa31e370"
        alt=""
      />
    </Box>
  );
};
