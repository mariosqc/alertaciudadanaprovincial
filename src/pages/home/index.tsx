import React from "react";

import { NextPage } from "next";

import { Button } from "@/components";
import { Box, HStack } from "@chakra-ui/react";

export const HomePage: NextPage = () => {
  return (
    <HStack padding="25">
      <Button colorScheme="red">Saludo</Button>
      <Button colorScheme="blue">Saludo</Button>
      <Button colorScheme="green">Saludo</Button>
      <Button colorScheme="purple">Saludo</Button>
    </HStack>
  );
};
