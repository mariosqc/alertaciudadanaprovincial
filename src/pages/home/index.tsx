import React from "react";

import { NextPage } from "next";

import { Button } from "@/components";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";

export const HomePage: NextPage = () => {
  return (
    <Stack padding="25">
      <HStack>
        {/*  <Button colorScheme="red">Sí, Eliminar usuario</Button>
      <Button colorScheme="pri">Sí, Eliminar usuario</Button>
      <Button colorScheme="blue">Saludo</Button>
      <Button colorScheme="green">Saludo</Button>
      <Button colorScheme="purple">Saludo</Button> */}
        <Box w="20" h="20" bgColor="pri.100" />
        <Box w="20" h="20" bgColor="pri.200" />
        <Box w="20" h="20" bgColor="pri.300" />
        <Box w="20" h="20" bgColor="pri.400" />
        <Box w="20" h="20" bgColor="pri.500" />
        <Box w="20" h="20" bgColor="pri.600" />
        <Box w="20" h="20" bgColor="pri.700" />
        <Box w="20" h="20" bgColor="pri.800" />
        <Box w="20" h="20" bgColor="pri.900" />
      </HStack>
      <HStack>
        <Box w="20" h="20" bgColor="sec.100" />
        <Box w="20" h="20" bgColor="sec.200" />
        <Box w="20" h="20" bgColor="sec.300" />
        <Box w="20" h="20" bgColor="sec.400" />
        <Box w="20" h="20" bgColor="sec.500" />
        <Box w="20" h="20" bgColor="sec.600" />
        <Box w="20" h="20" bgColor="sec.700" />
        <Box w="20" h="20" bgColor="sec.800" />
        <Box w="20" h="20" bgColor="sec.900" />
      </HStack>
      <HStack>
        <Button colorScheme="red">Sí, Eliminar usuario</Button>
        <Button colorScheme="pri" variant="outline">
          Sí, Eliminar usuario
        </Button>
        <Button colorScheme="sec">Sí, Eliminar usuario</Button>
        <Button colorScheme="blue">Saludo</Button>
        <Button colorScheme="green">Saludo</Button>
        <Button colorScheme="purple">Saludo</Button>
      </HStack>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium dolores perferendis ipsa voluptates
        quaerat debitis, itaque eum corporis ullam fugiat ducimus! Cupiditate error sunt veritatis vero reprehenderit ut
        natus praesentium!
      </Text>
    </Stack>
  );
};
