import React, { useState } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Box, Image } from "@chakra-ui/react";
import { Card } from "@/layout";
import GoogleMapReact from "google-map-react";
import { MapPin } from "react-feather";

const AnyReactComponent = ({ text }: any) => (
  <Box pos="relative" color="red.500">
    <Image
      pos="absolute"
      top="-1.25rem"
      left="-5"
      w="10"
      src="https://cdn-icons.flaticon.com/png/512/3585/premium/3585243.png?token=exp=1649368549~hmac=b542171c9d7a0713a035a20bfa31e370"
      alt=""
    />
  </Box>
);

export const TrackerPage: NextPage = () => {
  const [position, setPosition] = useState({ lat: 19.410289483836525, lng: -70.64524957675236 });
  return (
    <WrapperPage fullScreen title="Seguimientos">
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
        <Card.Body h="95%">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA6oiUPztz63oNG_746746GFVro2xX_Rs4" }}
            center={{ lat: 19.41050702557079, lng: -70.64527523623106 }}
            defaultZoom={15}
            onClick={(value) => {
              const { lat, lng } = value;

              setPosition({ lat, lng });

              // console.log(newItem);
            }}
          >
            <AnyReactComponent lat={position.lat} lng={position.lng} text="My Marker" />
          </GoogleMapReact>
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
