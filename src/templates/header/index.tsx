import { Card } from "@/layout";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../navbar";

export const Header = () => {
  return (
    <div>
      <Card.CardWrapper rounded="none" shadow="sm">
        <Flex px="6">
          <Flex>
            <Text mr="12">Titulo aqui</Text>
            <Navbar />
          </Flex>
        </Flex>
      </Card.CardWrapper>
    </div>
  );
};
