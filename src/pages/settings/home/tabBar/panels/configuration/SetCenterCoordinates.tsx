import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Button, FormProvider, Input, Map } from "@/components";
import { MarkerProps } from "src/components/map/Marker";

export const SetCenterCoordinates = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [centerCoord, setCenterCoord] = useState<MarkerProps>({
    lat: 19.097612354575226,
    lng: -72.1192613916425,
    text: "",
  });

  async function handleUpdate() {
    console.log("centerCoord", centerCoord);
  }

  return (
    <div>
      <Button colorScheme="pri" onClick={onOpen}>
        Cambiar
      </Button>

      <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay rounded="sm" />
        <ModalContent>
          <ModalHeader pb="0">
            <Text lineHeight="none" fontSize="lg" fontWeight="medium">
              Cambiar Coordenadas del centro
            </Text>
            <Text lineHeight="none" fontSize="sm" fontWeight="normal" color="gray.600">
              Seleccione un punto en el mapa y luego haga click en Guardar
            </Text>
          </ModalHeader>
          <ModalBody>
            <Box h="xl">
              <Map.Map
                center={centerCoord}
                trackerPositions={[centerCoord]}
                onClick={(value) => {
                  const { lat, lng } = value;
                  setCenterCoord({ lat, lng, text: `${lat},${lng}` });
                }}
              />
            </Box>
          </ModalBody>

          <ModalFooter pt="0" justifyContent="space-between">
            <FormProvider onSubmit={() => {}} id="">
              <HStack>
                <Input
                  name="lat"
                  inputProps={{
                    isReadOnly: true,
                    value: centerCoord.lat.toFixed(10),
                    width: "36",
                    textAlign: "center",
                  }}
                />
                ,
                <Input
                  name="lng"
                  inputProps={{
                    isReadOnly: true,
                    value: centerCoord.lng.toFixed(10),
                    width: "36",
                    textAlign: "center",
                  }}
                />
              </HStack>
            </FormProvider>
            <Box>
              <Button colorScheme="pri" mr={3} onClick={handleUpdate}>
                Guardar Cambios
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
