import React, { FC } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import { Settings } from "react-feather";

import { CardContainer } from "../cardContainer";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ title, subtitle }) => {
  return (
    <CardContainer>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text
            fontFamily="Open Sans, sans-serif"
            color="pri.800"
            fontWeight="bold"
            lineHeight="5"
          >
            {title}
          </Text>
          <Text
            fontFamily="Open Sans, sans-serif"
            fontWeight="medium"
            color="gray.500"
            fontSize="sm"
            lineHeight="4"
            maxW="4xl"
            textAlign="justify"
          >
            {subtitle}
          </Text>
        </Box>
        <Box color="sec.800">
          <Settings size="1.25rem" />
        </Box>
      </Flex>
    </CardContainer>
  );
};
