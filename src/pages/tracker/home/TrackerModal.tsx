import React, { useEffect, useMemo, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  SimpleGrid,
  GridItem,
  List,
  ListItem,
  Box,
  Image,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { useEmergencyContext, useTrackerContext } from "@/contexts";
import { Tracker } from "@alerta-ciudadana/entity";
import ReactPlayer from "react-player";
import Cookies from "universal-cookie";
import { database } from "@/firebase";

export const TrackerModal = () => {
  const { attendEmergency, setAttendEmergency } = useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comodin, setComodin] = useState<Tracker>();
  const { emergencies } = useEmergencyContext();

  const districtId = useMemo(() => new Cookies().get("district_id"), []);

  const attendingCurrentEmergency = useMemo<Tracker | undefined>(() => {
    if (attendEmergency.attending) {
      onOpen();
      setComodin(attendEmergency.tracker);
      return attendEmergency.tracker;
    } else return undefined;
  }, [attendEmergency]);

  async function attendedEmergency() {
    const emergency = emergencies[emergencies.length - 1];
    const pathRef = `district/${districtId}/follow/location/${attendEmergency.tracker?.id}`;
    await database.ref(pathRef).update({ activator: false });
    await database.ref(`district/${districtId}/emergency/${attendingCurrentEmergency?.id}/${emergency.id}`).remove();
    onClose();
  }
  return (
    <Modal closeOnEsc={false} closeOnOverlayClick={false} size="3xl" isCentered isOpen={isOpen} onClose={onClose}>
      {comodin && (
        <>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{comodin.tipe}</ModalHeader>
            <ModalBody>
              <SimpleGrid spacing={5} columns={12}>
                <GridItem colSpan={6}>
                  <List spacing={3}>
                    <ListItem>
                      <strong>Foto:</strong>
                      <Image rounded="md" w="10" src={comodin.foto} alt="" />
                    </ListItem>
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
                    <ListItem>
                      <strong>Audios:</strong>
                      <Box>
                        <List>
                          {Object.values(comodin?.voz || {}).map(({ mensaje_voz }) => (
                            <ListItem className="audio-container" key={mensaje_voz}>
                              {/* @ts-ignore */}
                              <ReactPlayer url={mensaje_voz} controls />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </ListItem>
                  </List>
                </GridItem>
                <GridItem colSpan={6}>
                  {/* @ts-ignore */}
                  <ReactPlayer config={{}} width="100%" controls url={comodin.video} />
                </GridItem>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Button colorScheme="pri" mr={3} onClick={attendedEmergency}>
                Atendida
              </Button>
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
