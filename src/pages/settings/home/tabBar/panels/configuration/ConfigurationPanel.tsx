import React, { useState } from "react";

import { Card, CardContainer } from "@/layout";

import { SetCenterCoordinates } from "./SetCenterCoordinates";
import { Box, Divider, Flex, HStack, Stack } from "@chakra-ui/react";
import { FormControl, Button, FormProvider, InputControl, InputMaskControl } from "@/components";

export const ConfigurationPanel = () => {
  const [isEditting, setIsEditting] = useState(false);

  return (
    <>
      <Card.Header
        title="Configuración de la aplicación"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
      />
      <Card.Body>
        <FormProvider id="" onSubmit={() => {}}>
          <Stack maxW="2xl">
            <FormControl
              name="coords"
              label="Coordenadas del centro"
              helperText="Especifique la ubicación donde estará el centro del mapa."
            >
              <Flex flexDir={["column", null, null, "row"]}>
                <HStack mb={["2", null, null, "0"]} mr="2" alignItems="center">
                  <InputControl name="lat" inputProps={{ isReadOnly: true }} />
                  <InputControl name="lng" inputProps={{ isReadOnly: true }} />
                </HStack>
                <SetCenterCoordinates />
              </Flex>
            </FormControl>
            <InputControl
              formControl={{
                label: "Google Map Api",
                helperText: "Identificación para el uso de la aplicación con Google Maps.",
              }}
              name="googleApiKey"
            />
            <InputMaskControl
              mask="+1 (999) 999-9999"
              formControl={{ label: "Teléfono", helperText: "Teléfono de contacto." }}
              name="phone"
            />
            <InputControl
              formControl={{ label: "Versión", helperText: "Versión actual de la aplicación." }}
              name="version"
            />
          </Stack>
        </FormProvider>
      </Card.Body>
      <Divider />
      <CardContainer>
        <Flex justifyContent="space-between">
          {isEditting ? (
            <Button colorScheme="red" variant="ghost">
              Restablecer Formulario
            </Button>
          ) : (
            <Box />
          )}

          {isEditting ? (
            <HStack>
              <Button colorScheme="pri">Guardar Cambios</Button>
              <Button onClick={() => setIsEditting(false)}>Cancelar</Button>
            </HStack>
          ) : (
            <Button onClick={() => setIsEditting(true)} colorScheme="orange">
              Editar Configuración
            </Button>
          )}
        </Flex>
      </CardContainer>
    </>
  );
};
