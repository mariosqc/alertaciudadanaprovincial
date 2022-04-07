import { Box, Divider, Flex, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { Settings } from "react-feather";
import { Card } from "@/layout";
import { FormProvider, Input } from "@/components";
import { WrapperPage } from "@/templates";

const DashboardPage = () => {
  return (
    <WrapperPage title="Dashboard">
      <GridItem colSpan={12}>
        <Card.Wrapper>
          <Card.Header title="Sales Graph" subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
          <Card.Body>
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
          </Card.Body>
          <Divider />
          <Flex px="4" py="2" alignItems="center" justifyContent="space-between">
            <Text color="pri.800" fontWeight="bold">
              Sales Graph
            </Text>
            <Box color="sec.800">
              <Settings size="1.25rem" />
            </Box>
          </Flex>
        </Card.Wrapper>
      </GridItem>
    </WrapperPage>
  );
};

export default DashboardPage;

{
  /* <GridItem colSpan={1}>
        <Box borderWidth="1px" borderColor="gray.300" shadow="md" rounded="md" p="5" textAlign="center" bgColor="white">
          <Text fontSize="3xl" fontWeight="bold">
            3,432
          </Text>
          <Text fontWeight="medium" color="gray.600">
            New Orders
          </Text>
        </Box>
      </GridItem>
      <GridItem colSpan={1}>
        <Box borderWidth="1px" borderColor="gray.300" shadow="md" rounded="md" p="5" textAlign="center" bgColor="white">
          <Text fontSize="3xl" fontWeight="bold">
            3,432
          </Text>
          <Text fontWeight="medium" color="gray.600">
            New Orders
          </Text>
        </Box>
      </GridItem> */
}
