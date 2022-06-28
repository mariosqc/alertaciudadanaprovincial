import React, { useMemo, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  GridItem,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { useTrackerContext } from "@/contexts";
import { Tracker } from "@alerta-ciudadana/entity";
import ReactPlayer from "react-player";

export const TrackerModal = () => {
  const { attendEmergency, setAttendEmergency } = useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comodin, setComodin] = useState<any>();

  if (attendEmergency.attending) {
  }
  const attendingCurrentEmergency = useMemo<Tracker | undefined>(() => {
    if (attendEmergency.attending) {
      onOpen();
      setComodin(attendEmergency.tracker);
      return attendEmergency.tracker;
    } else return undefined;
  }, [attendEmergency]);

  return (
    <Modal closeOnEsc={false} closeOnOverlayClick={false} size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
      {comodin && (
        <>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{comodin.tipe}</ModalHeader>
            <ModalBody>
              <SimpleGrid columns={12}>
                <GridItem colSpan={6}>
                  <List spacing={3}>
                    <ListItem>
                      <strong>Nombre:</strong> {comodin.user}
                    </ListItem>
                    <ListItem>
                      <strong>Teléfono:</strong> {comodin.phone}
                    </ListItem>
                    <ListItem>
                      <strong>Dirección:</strong> {comodin.place}
                    </ListItem>
                    <ListItem>
                      <strong>Tipo de emergencia:</strong> {comodin.tipe}
                    </ListItem>
                  </List>
                </GridItem>
                <GridItem colSpan={6}>
                  {/* @ts-ignore */}
                  <ReactPlayer config={{}} width="100%" controls url={comodin.video} />
                </GridItem>
              </SimpleGrid>
            </ModalBody>
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
