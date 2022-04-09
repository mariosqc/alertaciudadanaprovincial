import { Card } from "@/layout";
import React from "react";

import { List, ListItem } from "@chakra-ui/react";
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
        <List>
          <ListItem>
            <p>three!</p>
          </ListItem>
          <ListItem>
            <p>three!</p>
          </ListItem>
          <ListItem>
            <p>three!</p>
          </ListItem>
          <ListItem>
            <p>three!</p>
          </ListItem>
          <ListItem>
            <p>three!</p>
          </ListItem>
        </List>
      </Card.Body>
    </>
  );
};
