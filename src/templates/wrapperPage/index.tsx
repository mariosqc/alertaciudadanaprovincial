import React, { FC } from "react";

import { Box, Flex, SimpleGrid, Stack } from "@chakra-ui/react";

import { NextSeo } from "next-seo";

import { Header } from "../header";

interface WrapperPageProps {
  title: string;
  description?: string;
}

export const WrapperPage: FC<WrapperPageProps> = ({ children, title, description }) => {
  return (
    <>
      <NextSeo title={`${title} | Alerta Ciudadana`} description={description} />
      <Stack bgColor="#eceff3" minH="100vh">
        <Header />
        <Flex flexDir="column" pb="2" flex="1" px="2">
          <SimpleGrid flex="1" columns={12} gap={2}>
            {children}
          </SimpleGrid>
        </Flex>
      </Stack>
    </>
  );
};
