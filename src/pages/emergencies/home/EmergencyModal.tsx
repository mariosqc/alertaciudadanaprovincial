import { Button, Divider, Flex, IconButton, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import React, { FC } from "react";
import { Info } from "react-feather";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box } from "@chakra-ui/react";
import { Emergency } from "@alerta-ciudadana/entity";
import { GoogleMaps } from "@/components";
import moment from "moment";

interface EmergencyModalProps {
  emergency: Emergency;
}

export const EmergencyModal: FC<EmergencyModalProps> = ({ emergency }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onOpen}
        _focus={{}}
        size="sm"
        colorScheme="pri"
        variant="ghost"
        aria-label="emegergency-modal-button"
        icon={<Info />}
      />

      <Modal size="5xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="sm">
          <ModalHeader>Detalles de la emergencia</ModalHeader>

          <ModalBody>
            <Flex>
              <Box mr="4" flex="1">
                <List>
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Fecha:
                    </Text>
                    <Text fontWeight="semibold">{moment(emergency.date).format("LLL")}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Emergencia:
                    </Text>
                    <Text fontWeight="semibold">{emergency.emergency}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Usuario:
                    </Text>
                    <Text fontWeight="semibold">{emergency.user}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Lugar:
                    </Text>
                    <Text fontWeight="semibold">{emergency.place}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Estado:
                    </Text>
                    <Text fontWeight="semibold">{emergency.status}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Valoración:
                    </Text>
                  </ListItem>
                  <Divider my="2" />
                </List>
              </Box>
              <Box flex="1.5">
                <GoogleMaps
                  defaultCenter={{ lat: emergency.coor[0], lng: emergency.coor[1] }}
                  markerList={[{ position: { lat: emergency.coor[0], lng: emergency.coor[1] } }]}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button _focus={{}} onClick={onClose} variant="ghost">
              Cerrar Ventana
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
