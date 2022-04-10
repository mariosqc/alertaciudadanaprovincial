import React from "react";

import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

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
        <List spacing={2} maxW="3xl" pl="5" listStyleType="disc">
          {[1, 2, 3, 4, 5].map((i) => (
            <ListItem key={i}>
              <Flex justifyContent="space-between" alignItems="center">
                <Box flex="1" overflow="auto" mr={["3", null, null, "5"]}>
                  <Text w="max-content" flex="1" fontWeight="medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.it amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur
                    adipisicing elit.it
                  </Text>
                </Box>
                <Button _focus={{}} colorScheme="red" variant="ghost" size="sm">
                  Eliminar
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Card.Body>
    </>
  );
};
