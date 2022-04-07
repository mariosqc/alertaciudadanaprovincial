import React, { FC } from "react";

import { Box, SimpleGrid, Stack } from "@chakra-ui/react";

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
      <Stack bgColor="#eceff3" h="100vh">
        <Header />
        <Box px="2">
          <SimpleGrid columns={12} gap={2}>
            {children}
          </SimpleGrid>
        </Box>
      </Stack>
    </>
  );
};
