import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { ChangeNameForm } from "./ChangeNameForm";

export const ChangeNameModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Cambiar Nombre</MenuItem>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar Nombre del Distrito</ModalHeader>
          <ModalBody>
            <ChangeNameForm onSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="pri" form="change-name-form">
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
