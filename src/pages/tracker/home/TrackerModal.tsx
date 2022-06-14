import React, { useMemo } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { useTrackerContext } from "@/contexts";
import { Tracker } from "@alerta-ciudadana/entity";

export const TrackerModal = () => {
  const { attendEmergency, setAttendEmergency } = useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (attendEmergency.attending) {
  }
  const attendingCurrentEmergency = useMemo<Tracker | undefined>(() => {
    if (attendEmergency.attending) {
      onOpen();
      return attendEmergency.tracker;
    } else return undefined;
  }, [attendEmergency]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      {attendingCurrentEmergency && (
        <>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{attendingCurrentEmergency.tipe}</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button
                colorScheme="pri"
                mr={3}
                onClick={() => {
                  onClose();
                  setAttendEmergency({ attending: false, tracker: undefined });
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};
