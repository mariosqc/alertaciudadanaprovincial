import React, { useMemo, useRef } from "react";
import { UserCheck, UserX } from "react-feather";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components";

export const InactivateUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const isActive = useMemo(() => true, []);
  return (
    <>
      <IconButton
        onClick={onOpen}
        _focus={{}}
        size="sm"
        colorScheme={isActive ? "green" : "red"}
        aria-label="emegergency-modal-button"
        icon={isActive ? <UserCheck size="1.25rem" /> : <UserX size="1.25rem" />}
      />

      <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alerta de Seguridad
            </AlertDialogHeader>

            <AlertDialogBody>Desea desactivar este usuario?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" ml={3}>
                Desactivar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
