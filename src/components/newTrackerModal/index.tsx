import React, { useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useTrackerContext } from "@/contexts";
import { useRouter } from "next/router";

export const NewTrackerModal = () => {
  const { newTrackerDetected, setAttendEmergency } = useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { push, pathname } = useRouter();

  useEffect(() => {
    newTrackerDetected && onOpen();
  }, [newTrackerDetected]);

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
              setAttendEmergency({ attending: false, tracker: undefined });
            }}
          >
            Cerrar
          </Button>
          <Button
            colorScheme="pri"
            onClick={() => {
              setAttendEmergency({
                attending: true,
                tracker: newTrackerDetected,
              });
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
