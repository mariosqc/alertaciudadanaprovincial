import React, { useMemo, useState } from "react";

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
  HStack,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { useTrackerContext } from "@/contexts";
import { Tracker } from "@alerta-ciudadana/entity";
import ReactPlayer from "react-player";
import Cookies from "universal-cookie";
import { database } from "@/firebase";

export const TrackerModal = () => {
  const { attendEmergency, setAttendEmergency } = useTrackerContext();
  const { isOpen, onClose } = useDisclosure();
  const [comodin, setComodin] = useState<Tracker>();

  const districtId = useMemo(() => new Cookies().get("district_id"), []);
  async function attendedEmergency() {
    const pathRef = `district/${districtId}/follow/location/${attendEmergency.tracker?.id}`;
    await database.ref(pathRef).update({ activator: false });
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
              <HStack>
                <Button colorScheme="pri" mr={3} onClick={attendedEmergency}>
                  Atendida
                </Button>
                {/* <RecordAudio userToken={comodin.token} /> */}
              </HStack>
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
