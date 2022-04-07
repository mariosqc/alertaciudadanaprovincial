import React, { useState } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import ReactList from "react-list";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Divider,
  Flex,
  HStack,
  List,
  ListItem,
  Text,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Card } from "@/layout";
import { MoreVertical, Plus } from "react-feather";

export const EmergencyTypesPage: NextPage = () => {
  const [items] = useState(["dd", 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  return (
    <WrapperPage title="Tipos de Emergencias">
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Tipos de Emergencias"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id architecto velit, corporis facere aliquam."
          optionsRight={[
            <IconButton
              key="1"
              colorScheme="pri"
              rounded="md"
              variant="outline"
              size="sm"
              aria-label="New"
              icon={<Plus />}
            />,
          ]}
        />
        <List>
          <ReactList
            length={items.length}
            itemRenderer={(index, key) => {
              return (
                <>
                  {index !== 0 && <Divider />}
                  <Card.Body>
                    <ListItem>
                      <Flex alignItems="center" justifyContent="space-between">
                        <HStack>
                          <Avatar w="10" h="10" />
                          <Box>
                            <Text lineHeight="none" fontWeight="semibold">
                              Sospechoso
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              12/12/2022
                            </Text>
                          </Box>
                        </HStack>
                        <Box>
                          <Menu>
                            <MenuButton
                              size="sm"
                              rounded="md"
                              _focus={{}}
                              variant="ghost"
                              as={IconButton}
                              icon={<MoreVertical size="1.25rem" />}
                            />
                            <MenuList rounded="md">
                              <MenuItem>
                                <Text>Editar</Text>
                              </MenuItem>
                              <MenuItem>
                                <Text>Eliminar</Text>
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Box>
                      </Flex>
                    </ListItem>
                  </Card.Body>
                </>
              );
            }}
          />
        </List>
      </Card.Wrapper>
    </WrapperPage>
  );
};
