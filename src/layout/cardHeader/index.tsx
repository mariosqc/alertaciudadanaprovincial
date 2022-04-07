import React, { FC } from "react";

import {
  Box,
  Divider,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { Settings } from "react-feather";

import { CardContainer } from "../cardContainer";
import { Button } from "@/components";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <CardContainer>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="lg" fontFamily="Open Sans, sans-serif" color="pri.800" fontWeight="bold" lineHeight="5">
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
          <Box>
            <Menu>
              <MenuButton as={Button}>Actions</MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
            {/*   <HStack>
              <Button size="sm" variant="outline" colorScheme="orange">
                Reportes
              </Button>
              <Button size="sm" variant="outline" colorScheme="pri">
                Tipos de Emergencias
              </Button>
            </HStack> */}
          </Box>
        </Flex>
      </CardContainer>
      <Divider />
    </>
  );
};
