import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel, GridItem } from "@chakra-ui/react";
import { Card } from "@/layout";
import { ConfigurationPanel } from "./panels/configuration/ConfigurationPanel";
import { MessagesListPanel } from "./panels/messagesList/MessagesListPanel";

export const SettingsTabBar = () => {
  return (
    <GridItem colSpan={12}>
      <Tabs>
        <Card.Wrapper shadow="sm" mb="2">
          <TabList borderColor="gray.200" borderBottomWidth="1px">
            <Tab _focus={{}}>Configuración</Tab>
            <Tab _focus={{}}>Listado de Mensajes</Tab>
            <Tab _focus={{}}>Cambiar Contraseña</Tab>
          </TabList>
        </Card.Wrapper>

        <Card.Wrapper>
          <TabPanels>
            <TabPanel p="0">
              <ConfigurationPanel />
            </TabPanel>
            <TabPanel p="0">
              <MessagesListPanel />
            </TabPanel>
            <TabPanel p="0">
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Card.Wrapper>
      </Tabs>
    </GridItem>
  );
};
