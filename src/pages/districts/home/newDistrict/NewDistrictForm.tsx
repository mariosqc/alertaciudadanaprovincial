import { FormProvider, InputControl } from "@/components";
import { HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { EnterPolygonCoordinates } from "./enterPolygonCoordinates/EnterPolygonCoordinates";

export const NewDistrictForm = () => {
  return (
    <FormProvider
      id="new-district-form"
      onSubmit={(values) => {
        const { name, coordinates } = values;
        console.log({ name, coordinates });
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
