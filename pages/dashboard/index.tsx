import { Box, Divider, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { Settings } from "react-feather";
import { Card } from "@/layout";
import { FormProvider, Input } from "@/components";

const DashboardPage = () => {
  return (
    <Box bgColor="#eceff3" h="100vh">
      <Card.CardWrapper rounded="none" shadow="sm" mb="3">
        <Flex px="6">
          <Flex>
            <Text mr="12">Titulo aqui</Text>
            <Box>
              <Box
                cursor="pointer"
                _hover={{ bgColor: "pri.50" }}
                borderBottomWidth="4px"
                // borderColor="transparent"
                borderBottomColor="pri.600"
                px="2"
              >
                <Text userSelect="none" color="pri.600" fontWeight="medium" py="3">
                  Dashboard
                </Text>
              </Box>
              {/* <Box h="1.5" bgColor="pri.500"></Box> */}
            </Box>
          </Flex>
        </Flex>
      </Card.CardWrapper>

      <Box px="3">
        <SimpleGrid columns={12} gap={3}>
          <GridItem colSpan={12}>
            <Card.CardWrapper>
              <Card.CardHeader
                title="Sales Graph"
                subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              />
              <Divider />
              <Card.CardBody>
                <Box>
                  <FormProvider
                    id="example-form"
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    <Input name="example" />
                  </FormProvider>
                </Box>
              </Card.CardBody>
              <Divider />
              <Flex px="4" py="2" alignItems="center" justifyContent="space-between">
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
    </Box>
  );
};

export default DashboardPage;
