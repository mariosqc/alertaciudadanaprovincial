import React from "react";

import { NextPage } from "next";

import { Button } from "@/components";
import { Box, HStack, Text } from "@chakra-ui/react";

export const HomePage: NextPage = () => {
  return (
    <Box padding="25">
      <HStack>
        <Button colorScheme="red">Sí, Eliminar usuario</Button>
        <Button colorScheme="blue">Saludo</Button>
        <Button colorScheme="green">Saludo</Button>
        <Button colorScheme="purple">Saludo</Button>
      </HStack>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium
        dolores perferendis ipsa voluptates quaerat debitis, itaque eum corporis
        ullam fugiat ducimus! Cupiditate error sunt veritatis vero reprehenderit
        ut natus praesentium!
      </Text>
    </Box>
  );
};
