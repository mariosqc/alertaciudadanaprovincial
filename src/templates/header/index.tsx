import { Card } from "@/layout";
import { Avatar, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Bell, Menu, Settings } from "react-feather";
import { Navbar } from "../navbar";
import { MenuDrawer } from "./MenuDrawer";

export const Header = () => {
  const { push, pathname } = useRouter();

  return (
    <Card.Wrapper rounded="none" shadow="sm">
      <Flex h={["16", null, null, "auto"]} px="6" alignItems="center" justifyContent="space-between">
        <Flex>
          <Text mr="12">Titulo aqui</Text>
          <Navbar />
        </Flex>
        <HStack>
          <IconButton
            aria-label="Settings"
            size="sm"
            variant={pathname !== "/settings" ? "ghost" : undefined}
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
          <MenuDrawer />
        </HStack>
      </Flex>
    </Card.Wrapper>
  );
};
