import React, { FC, useEffect } from "react";

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
import { AddingTypeForm } from "./AddingTypeForm";

interface GeneralModalAddProps {
  isLoading: boolean;
  onSubmit: (data: any) => void;
}

export const GeneralModalAdd: FC<GeneralModalAddProps> = ({ isLoading, onSubmit }) => {
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
          <ModalBody>
            <AddingTypeForm onSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button
              form="adding-type-form"
              type="submit"
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
              loadingText="Guardando..."
            >
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
