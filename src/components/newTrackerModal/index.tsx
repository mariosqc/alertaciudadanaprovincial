import React, { useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useTrackerContext } from "@/contexts";
import { useRouter } from "next/router";

export const NewTrackerModal = () => {
  const { newTrackerDetected, setNewTracker } = useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { push, pathname } = useRouter();

  useEffect(() => {
    newTrackerDetected && onOpen();
  }, [newTrackerDetected]);

  console.log(newTrackerDetected);

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva emergencia Detectada</ModalHeader>
        <ModalBody>Alguien ha enviado una emergencia</ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant="ghost"
            onClick={() => {
              onClose();
              // setNewTracker({ attending: false, tracker: undefined });
            }}
          >
            Cerrar
          </Button>
          <Button
            colorScheme="pri"
            onClick={() => {
              // setNewTracker({
              //   attending: true,
              //   tracker: undefined,
              // });
              pathname !== "/tracker" && push("/tracker");
              onClose();
            }}
          >
            Atender
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
