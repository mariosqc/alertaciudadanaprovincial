import React from "react";

import { NextPage } from "next";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { Card } from "@/layout";
import { Button, FormProvider, Input } from "@/components";

export const SigninPage: NextPage = () => {
  return (
    <Flex bgColor="#eceff3" h="100vh" w="100vw" alignItems="center" justifyContent="center">
      <Card.Wrapper w="sm">
        <Card.Container>
          <FormProvider id="" onSubmit={() => {}}>
            <Stack>
              <Input name="Correo electrónico" />
              <Input name="Contraseña" />
              <Button colorScheme="pri">Iniciar Sesión</Button>
            </Stack>
          </FormProvider>
        </Card.Container>
      </Card.Wrapper>
    </Flex>
  );
};
