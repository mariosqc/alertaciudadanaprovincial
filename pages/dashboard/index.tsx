import {
  Box,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Settings } from "react-feather";
import { Card } from "@/layout";

const DashboardPage = () => {
  return (
    <Box py="12" px="6" bgColor="#eceff3" h="100vh">
      <SimpleGrid columns={12} gap={4}>
        <GridItem colSpan={12}>
          <Card.CardWrapper>
            <Card.CardHeader
              title="Sales Graph"
              subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
            />
            <Divider />
            <Card.CardContainer height="xl" activeScrollbar>
              <Box border="2px" height="5xl" w="200vw">
                Hola
              </Box>
            </Card.CardContainer>
            <Divider />
            <Flex
              px="4"
              py="2"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="pri.800" fontWeight="bold">
                Sales Graph
              </Text>
              <Box color="sec.800">
                <Settings size="1.25rem" />
              </Box>
            </Flex>
          </Card.CardWrapper>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            borderWidth="1px"
            borderColor="gray.300"
            shadow="md"
            rounded="md"
            p="5"
            textAlign="center"
            bgColor="white"
          >
            <Text fontSize="3xl" fontWeight="bold">
              3,432
            </Text>
            <Text fontWeight="medium" color="gray.600">
              New Orders
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            borderWidth="1px"
            borderColor="gray.300"
            shadow="md"
            rounded="md"
            p="5"
            textAlign="center"
            bgColor="white"
          >
            <Text fontSize="3xl" fontWeight="bold">
              3,432
            </Text>
            <Text fontWeight="medium" color="gray.600">
              New Orders
            </Text>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default DashboardPage;
