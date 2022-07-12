import { Button } from "@/components";
import { User } from "@alerta-ciudadana/entity";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  VStack,
  Avatar,
  Text,
  ListItem,
  List,
  Divider,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Info } from "react-feather";

interface UserModalProps {
  user: User;
}

export const UserModal: FC<UserModalProps> = ({ user }) => {
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

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader px="4">Detalles del usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="4">
            <VStack mb="4" spacing={0}>
              <Avatar src={user.avatarUrl} size="2xl" />
              <Text fontWeight="medium" fontSize="2xl">
                {user.name}
              </Text>
              <Text>{user.email}</Text>
              <Text>{user.phone}</Text>
            </VStack>
            <List spacing={3}>
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  UId
                </Text>
                <Text fontWeight="medium">{user.uid}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  IMEI
                </Text>
                <Text fontWeight="medium">{user.imei}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  Estado
                </Text>
                <Text fontWeight="medium">{String(user.access)}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  Puntos
                </Text>
                <Text fontWeight="medium">{user.points}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  Sexo
                </Text>
                <Text fontWeight="medium">{user.sex}</Text>
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter px="4">
            <Button colorScheme="pri" w="full" onClick={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
