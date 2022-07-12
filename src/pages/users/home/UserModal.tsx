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
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Info } from "react-feather";

interface UserModalProps {
  user: User;
}

export const UserModal: FC<UserModalProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(user);

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
          <ModalHeader>Detalles del usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={0}>
              <Avatar src={user.avatarUrl} size="2xl" />
              <Text fontWeight="medium" fontSize="2xl">
                {user.name}
              </Text>
              <Text>{user.email}</Text>
              <Text>{user.phone}</Text>
            </VStack>
            <VStack>sdad</VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" w="full" onClick={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
