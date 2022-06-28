import { useComplaintContext, useEmergencyContext } from "@/contexts";
import { Card } from "@/layout";
import { GeneralList, GeneralModalAdd } from "@/templates";
import { Flex, GridItem, List, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

export const ListingsPanel = () => {
  const { typesOfEmergencies, createEmergencyType } = useEmergencyContext();
  const { typesOfComplaints } = useComplaintContext();

  console.log(typesOfComplaints);

  return (
    <div>
      <Card.Header
        title="Ajusta los listados"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
      />
      <Card.Body>
        <SimpleGrid gap={5} columns={12}>
          <GridItem colSpan={6}>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="semibold">
                Tipos de emergencias
              </Text>
              <GeneralModalAdd onSubmit={createEmergencyType} isLoading={false} />
            </Flex>
            <GeneralList items={typesOfEmergencies} />
          </GridItem>
          <GridItem colSpan={6}>
            <GridItem colSpan={6}>
              <Flex justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  Tipos de Denuncias
                </Text>
                <GeneralModalAdd onSubmit={() => {}} isLoading={false} />
              </Flex>
              <GeneralList items={typesOfComplaints} />
            </GridItem>
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </div>
  );
};
