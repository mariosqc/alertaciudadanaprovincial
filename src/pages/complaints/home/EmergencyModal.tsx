import { Button, Divider, Flex, IconButton, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { Info } from "react-feather";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box } from "@chakra-ui/react";
import { Complaint } from "@alerta-ciudadana/entity";
import { GoogleMaps } from "@/components";
import moment from "moment";
import removeAccents from "remove-accents";

interface ComplaintModalProps {
  complaint: Complaint;
}

export const ComplaintModal: FC<ComplaintModalProps> = ({ complaint }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const urlIcon = useMemo(() => {
    return `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/complaint-types%2F${removeAccents(
      complaint?.type?.toLowerCase() || ""
    ).replace(/ /, "_")}?alt=media`;
  }, [complaint]);

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
          <ModalHeader>Detalles de la denuncia</ModalHeader>

          <ModalBody>
            <Flex>
              <Box mr="4" flex="1">
                <List>
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Fecha:
                    </Text>
                    <Text fontWeight="semibold">{moment(complaint.date).format("LLL")}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Usuario:
                    </Text>
                    <Text fontWeight="semibold">{complaint.user}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      description:
                    </Text>
                    <Text fontWeight="semibold">{complaint.description}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Teléfono:
                    </Text>
                    <Text fontWeight="semibold">{complaint.phone}</Text>
                  </ListItem>{" "}
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Lugar:
                    </Text>
                    <Text fontWeight="semibold">{complaint.place}</Text>
                  </ListItem>
                  <Divider my="2" />
                </List>
              </Box>
              <Box flex="1.5">
                <GoogleMaps
                  defaultCenter={{ lat: complaint.coordinates[0], lng: complaint.coordinates[1] }}
                  markerList={[
                    {
                      position: { lat: complaint.coordinates[0], lng: complaint.coordinates[1] },
                      icon: {
                        scaledSize: new google.maps.Size(36, 36),
                        url: urlIcon,
                      },
                    },
                  ]}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button _focus={{}} onClick={onClose} variant="ghost">
              Cerrar Ventana
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
