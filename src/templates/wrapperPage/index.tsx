import React, { FC } from "react";

import { Flex, SimpleGrid, Stack } from "@chakra-ui/react";

import { NextSeo } from "next-seo";

import { Header } from "../header";

import { Breadcrumb, RoutesBreadcrumbType } from "@/components";

interface WrapperPageProps {
  title: string;
  description?: string;
  fullScreen?: boolean;
  breadcrumb?: {
    routes: RoutesBreadcrumbType[];
  };
  rows?: number;
}

export const WrapperPage: FC<WrapperPageProps> = ({ children, title, description, fullScreen, breadcrumb }) => {
  return (
    <>
      <NextSeo title={`${title} - Alerta Ciudadana`} description={description} />
      <Stack spacing={["1", null, null, "2"]} bgColor="#eceff3" minH={["100vh"]}>
        <Header />
        <Stack pb={["1", null, null, "2"]} flex="1" px={["1", null, null, "2"]}>
          {breadcrumb && <Breadcrumb {...breadcrumb} />}
          <SimpleGrid flex={fullScreen ? "1" : undefined} columns={12} gap={[1, null, null, 2]}>
            {children}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};
