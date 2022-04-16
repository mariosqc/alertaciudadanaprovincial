import React from "react";
import { GoogleMaps } from "src/components/googleMaps";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text } from "@chakra-ui/react";
import { SelectCoordinates } from "./SelectCoordinates";
import { EnterCoordinatesManually } from "./EnterCoordinatesManually";
import { Controller, useFormContext } from "react-hook-form";

export const EnterPolygonCoordinates = () => {
  const { control, setValue } = useFormContext();

  return (
    <Box>
      <Tabs colorScheme="pri">
        <TabList>
          <Tab onClick={() => setValue("coordinates", [])} _focus={{}}>
            <Text fontWeight="medium">Seleccionar Coordenadas</Text>
          </Tab>
          <Tab onClick={() => setValue("coordinates", [])} _focus={{}}>
            <Text fontWeight="medium">Ingresar Coordenadas</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel pb="1" px="0">
            <Controller
              name="coordinates"
              render={({ field }) => <SelectCoordinates onChange={field.onChange} value={field.value} />}
            />
          </TabPanel>
          <TabPanel>
            <EnterCoordinatesManually />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
