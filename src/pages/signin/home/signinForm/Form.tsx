import { Button, FormProvider, InputControl } from "@/components";
import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";

import { signinSchema } from "./schema";

export interface SigninFormProps {
  onSubmit: (values: SigninFormOnSubmit) => void;
}

export const Form: FC<SigninFormProps> = ({ onSubmit }) => {
  return (
    <FormProvider id="" onSubmit={onSubmit} schema={signinSchema}>
      <Stack>
        <InputControl formControl={{ label: "Correo electrónico" }} name="email" />
        <InputControl formControl={{ label: "Contraseña" }} name="password" inputProps={{ type: "password" }} />
        <Button type="submit" colorScheme="pri">
          Iniciar Sesión
        </Button>
      </Stack>
    </FormProvider>
  );
};
