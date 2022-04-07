import React, { FC } from "react";

import { Box, SimpleGrid, Stack } from "@chakra-ui/react";
import { Header } from "../header";

interface WrapperPageProps {
  title: string;
}

export const WrapperPage: FC<WrapperPageProps> = ({ children }) => {
  return (
    <Stack bgColor="#eceff3" h="100vh">
      <Header />
      <Box px="2">
        <SimpleGrid columns={12} gap={3}>
          {children}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};
