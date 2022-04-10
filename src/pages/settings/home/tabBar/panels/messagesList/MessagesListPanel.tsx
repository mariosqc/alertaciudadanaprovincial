import React from "react";

import { Flex, List, ListItem, Text } from "@chakra-ui/react";

import { Card } from "@/layout";
import { Button } from "@/components";

import { NewMessageModal } from "./newMessage/NewMessageModal";

export const MessagesListPanel = () => {
  return (
    <>
      <Card.Header
        title="Listado de Mensajes"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
        optionsRight={[<NewMessageModal key="new-message" />]}
      />

      <Card.Body>
        <List spacing={2} w="3xl" pl="5" listStyleType="disc">
          <ListItem>
            <Flex justifyContent="space-between" alignItems="center">
              <Text flex="1" mr="5" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontWeight="medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur
                adipisicing elit.it amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                elit.it amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Button _focus={{}} colorScheme="red" variant="ghost" size="sm">
                Eliminar
              </Button>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex justifyContent="space-between" alignItems="center">
              <Text flex="1" mr="5" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontWeight="medium">
                Lorem ipsum dolor sit amet consectetur.
              </Text>
              <Button _focus={{}} colorScheme="red" variant="ghost" size="sm">
                Eliminar
              </Button>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex justifyContent="space-between" alignItems="center">
              <Text flex="1" mr="5" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" fontWeight="medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </Text>
              <Button _focus={{}} colorScheme="red" variant="ghost" size="sm">
                Eliminar
              </Button>
            </Flex>
          </ListItem>
        </List>
      </Card.Body>
    </>
  );
};
