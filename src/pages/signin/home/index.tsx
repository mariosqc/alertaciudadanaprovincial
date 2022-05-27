import React, { useState } from "react";

import { NextPage } from "next";
import { Flex, useToast } from "@chakra-ui/react";
import { Card } from "@/layout";
import { Form } from "./signinForm/Form";
import { auth } from "@/firebase";

export const SigninPage: NextPage = () => {
  const { onSubmit, isLoading } = useLogin();

  return (
    <Flex bgColor="#eceff3" h="100vh" w="100vw" alignItems="center" justifyContent="center">
      <Card.Wrapper w="sm">
        <Card.Header title="Iniciar Sesión" />
        <Card.Container>
          <Form onSubmit={onSubmit} isLoading={isLoading} />
        </Card.Container>
      </Card.Wrapper>
    </Flex>
  );
};

const useLogin = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: SigninFormOnSubmit) {
    setIsLoading(true);
    try {
      const response = await auth.signInWithEmailAndPassword(values.email, values.password);

      console.log(response);
      setIsLoading(false);
    } catch (err) {
      const error: any = err;
      console.log(error.code);
      if (["auth/user-not-found", "auth/wrong-password"].includes(error.code)) {
        toast({
          position: "top-right",
          title: "Credenciales inválidas",
          description: "El identificador o la contraseña son incorrectos",
          status: "error",
          variant: "left-accent",
        });
      }

      if (error.code === "auth/too-many-requests") {
        toast({
          position: "top-right",
          title: "Demasiados intentos",
          description: "Demasiados intentos de inicio de sesión, inténtalo más tarde",
          status: "error",
          variant: "left-accent",
        });
      }
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading };
};
