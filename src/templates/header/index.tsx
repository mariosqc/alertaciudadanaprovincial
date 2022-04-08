import { Card } from "@/layout";
import { Avatar, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Bell, Settings } from "react-feather";
import { Navbar } from "../navbar";

export const Header = () => {
  const { push } = useRouter();

  return (
    <div>
      <Card.Wrapper rounded="none" shadow="sm">
        <Flex px="6" justifyContent="space-between">
          <Flex>
            <Text mr="12">Titulo aqui</Text>
            <Navbar />
          </Flex>
          <HStack>
            <IconButton
              aria-label="Settings"
              size="sm"
              variant="ghost"
              _focus={{}}
              colorScheme="blue"
              icon={<Settings size="1.25rem" />}
              onClick={() => push("/settings")}
            />
            <IconButton
              aria-label="Settings"
              size="sm"
              variant="ghost"
              _focus={{}}
              colorScheme="green"
              icon={<Bell size="1.25rem" />}
            />
            <Avatar size="sm" />
          </HStack>
        </Flex>
      </Card.Wrapper>
    </div>
  );
};
