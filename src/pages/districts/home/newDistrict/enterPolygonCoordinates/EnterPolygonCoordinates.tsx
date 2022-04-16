import React from "react";
import { GoogleMaps } from "src/components/googleMaps";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text } from "@chakra-ui/react";
import { SelectCoordinates } from "./SelectCoordinates";
import { EnterCoordinatesManually } from "./EnterCoordinatesManually";

export const EnterPolygonCoordinates = () => {
  return (
    <Box>
      <Tabs colorScheme="pri">
        <TabList>
          <Tab _focus={{}}>
            <Text fontWeight="medium">Seleccionar Coordenadas</Text>
          </Tab>
          <Tab _focus={{}}>
            <Text fontWeight="medium">Ingresar Coordenadas</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel pb="1" px="0">
            <SelectCoordinates />
          </TabPanel>
          <TabPanel>
            <EnterCoordinatesManually />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
