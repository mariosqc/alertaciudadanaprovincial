import { Button } from "@/components";
import { Complaint } from "@alerta-ciudadana/entity";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  List,
  ListItem,
  Text,
  Divider,
  Box,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import React, { FC } from "react";

interface ComplaintReportModalProps {
  complaint?: Complaint;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintReportModal: FC<ComplaintReportModalProps> = ({ complaint, isOpen, onClose }) => {
  return (
    <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Denuncia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Fecha
              </Text>
              <Text>{moment(complaint?.date).format("lll")}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Denuncia
              </Text>
              <Text>{complaint?.type}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Usuario
              </Text>
              <Text>{complaint?.user}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Lugar
              </Text>
              <Text>{complaint?.place}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Teléfono
              </Text>
              <Text>{complaint?.phone}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Estado
              </Text>
              <Text>{complaint?.status}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Descripción
              </Text>
              <Text>{complaint?.description}</Text>
            </ListItem>
          </List>
          <Box mt="5">
            <Image src={complaint?.avatarUrl} alt="" />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="pri" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
