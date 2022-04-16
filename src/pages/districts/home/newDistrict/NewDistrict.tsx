import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { NewDistrictForm } from "./NewDistrictForm";
import { EnterPolygonCoordinates } from "./enterPolygonCoordinates/EnterPolygonCoordinates";

export const NewDistrict = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size="sm" colorScheme="pri" onClick={onOpen}>
        Nuevo Distrito
      </Button>

      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent mx="2">
          <ModalHeader>Agrega un nuevo distrito</ModalHeader>
          <ModalBody>
            <NewDistrictForm />
          </ModalBody>

          <ModalFooter pt="0">
            <Button mr={3} variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" form="new-district-form" colorScheme="pri">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};