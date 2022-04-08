import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { Plus } from "react-feather";

import { Button } from "@/components";

interface GeneralModalAddProps {
  isLoading: boolean;
}

export const GeneralModalAdd: FC<GeneralModalAddProps> = ({ isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        onClick={onOpen}
        key="1"
        colorScheme="pri"
        rounded="md"
        variant="outline"
        size="sm"
        aria-label="New"
        icon={<Plus />}
      />
      <Modal closeOnEsc={!isLoading} closeOnOverlayClick={!isLoading} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>sadasd</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} isLoading={isLoading} loadingText="Guardando...">
              Guardar
            </Button>
            <Button isDisabled={isLoading} onClick={isLoading ? undefined : onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
