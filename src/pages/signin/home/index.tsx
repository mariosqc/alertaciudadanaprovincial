import React from "react";

import { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { Card } from "@/layout";
import { Form } from "./signinForm/Form";

export const SigninPage: NextPage = () => {
  async function onSubmit(values: SigninFormOnSubmit) {
    console.log(values);
  }

  return (
    <Flex bgColor="#eceff3" h="100vh" w="100vw" alignItems="center" justifyContent="center">
      <Card.Wrapper w="sm">
        <Card.Header title="Iniciar Sesión" />
        <Card.Container>
          <Form onSubmit={onSubmit} />
        </Card.Container>
      </Card.Wrapper>
    </Flex>
  );
};
