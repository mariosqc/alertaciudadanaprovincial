import React from "react";

import { HStack, Stack } from "@chakra-ui/react";

import { FormProvider, InputControl } from "@/components";

import { EnterPolygonCoordinates } from "./enterPolygonCoordinates/EnterPolygonCoordinates";

export const NewDistrictForm = () => {
  return (
    <FormProvider
      id="new-district-form"
      onSubmit={(values, methods) => {
        const { name, coordinates, user } = values;
        if (!coordinates) {
          methods.setError("coordinates", { message: "Debe ingresar un polígono válido", type: "required" });
          return;
        }
        if (coordinates?.length < 3) {
          methods.setError("coordinates", { message: "Debe ingresar las coordenadas del polígono", type: "required" });
          return;
        }
        console.log({ name, coordinates, user });
      }}
    >
      <Stack>
        <HStack>
          <InputControl
            name="name"
            rules={{ required: true }}
            formControl={{ label: "Nombre del Distrito" }}
            inputProps={{ placeholder: "abc..." }}
          />
          <InputControl
            name="user.name"
            rules={{ required: true }}
            formControl={{ label: "Nombre del Usuario" }}
            inputProps={{ placeholder: "Juan Manuel Estrella..." }}
          />
        </HStack>
        <HStack>
          <InputControl
            name="user.username"
            rules={{ required: true }}
            formControl={{ label: "Nombre de Usuario" }}
            inputProps={{ placeholder: "juan_manuel_estrella_01..." }}
          />
          <InputControl
            name="user.password"
            rules={{ required: true }}
            formControl={{ label: "Contraseña" }}
            inputProps={{ placeholder: "••••••••", type: "password" }}
          />
        </HStack>
        <EnterPolygonCoordinates />
      </Stack>
    </FormProvider>
  );
};