import React, { useMemo } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import { Hexagon } from "react-feather";

import { Button, GoogleMaps } from "@/components";

export const PolygonInformationModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const centerMap = useMemo(() => {
    if (typeof window !== "undefined") {
      var bounds = new window.google.maps.LatLngBounds();

      for (let i = 0; i < polygonPath.length; i++) {
        bounds.extend(polygonPath[i]);
      }
      return bounds.getCenter().toJSON();
    }
  }, []);

  return (
    <>
      <HStack w="max-content">
        <Button
          onClick={onOpen}
          pl="2"
          leftIcon={
            <Box mr="-0.5">
              <Hexagon />
            </Box>
          }
          size="sm"
          colorScheme="pri"
        >
          25 Lados
        </Button>
      </HStack>
      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Distrito</ModalHeader>
          <ModalBody>
            <Box h="lg" borderWidth="2px">
              <GoogleMaps defaultZoom={15} polygonPathList={[{ path: polygonPath }]} defaultCenter={centerMap} />
            </Box>
          </ModalBody>

          <ModalFooter pt="0">
            <Button colorScheme="red" variant="ghost" _focus={{}} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const polygonPath = [
  {
    lat: 19.412385647467676,
    lng: -70.64717872256583,
  },
  {
    lat: 19.41239935585041,
    lng: -70.6467570821711,
  },
  {
    lat: 19.41248030710746,
    lng: -70.6463574330341,
  },
  {
    lat: 19.412566317773926,
    lng: -70.64603288574835,
  },
  {
    lat: 19.412692803965456,
    lng: -70.64571638508951,
  },
  {
    lat: 19.412576436672865,
    lng: -70.64568419858183,
  },
  {
    lat: 19.412429712576536,
    lng: -70.64567078753696,
  },
  {
    lat: 19.412186858608877,
    lng: -70.64565469428314,
  },
  {
    lat: 19.411874087658983,
    lng: -70.645631205616,
  },
  {
    lat: 19.411556257235983,
    lng: -70.64561844585518,
  },
  {
    lat: 19.411209879043234,
    lng: -70.64559215558847,
  },
  {
    lat: 19.410871090084758,
    lng: -70.6455685476359,
  },
  {
    lat: 19.41053969234112,
    lng: -70.64555245438206,
  },
  {
    lat: 19.410848322322472,
    lng: -70.64622032441638,
  },
  {
    lat: 19.41091785804793,
    lng: -70.64641930278529,
  },
  {
    lat: 19.411002572056255,
    lng: -70.6466209635532,
  },
  {
    lat: 19.41107783217005,
    lng: -70.64678457815364,
  },
  {
    lat: 19.411148032680103,
    lng: -70.64692539408948,
  },
  {
    lat: 19.411266930626955,
    lng: -70.64711717221326,
  },
  {
    lat: 19.41132190609106,
    lng: -70.64720769023853,
  },
  {
    lat: 19.411420566084004,
    lng: -70.64734448289614,
  },
  {
    lat: 19.41149519347481,
    lng: -70.64742763137434,
  },
  {
    lat: 19.41157235057165,
    lng: -70.64750541543457,
  },
  {
    lat: 19.411706844282747,
    lng: -70.64763944981834,
  },
  {
    lat: 19.411841337889555,
    lng: -70.64778153105755,
  },
  {
    lat: 19.412139812914464,
    lng: -70.64809138554962,
  },
  {
    lat: 19.412218989463433,
    lng: -70.64817344965564,
  },
  {
    lat: 19.41253267570798,
    lng: -70.64853554786701,
  },
  {
    lat: 19.412785648045034,
    lng: -70.64884131968995,
  },
  {
    lat: 19.412545324334197,
    lng: -70.64798033060954,
  },
  {
    lat: 19.412479551467204,
    lng: -70.64776038947376,
  },
  {
    lat: 19.41242659185798,
    lng: -70.64749568141019,
  },
  {
    lat: 19.412393705403783,
    lng: -70.64727842248334,
  },
];
