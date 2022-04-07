import React, { FC } from "react";

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
  VStack,
} from "@chakra-ui/react";
import { Card } from "@/layout";
import { MoreVertical, Frown } from "react-feather";

interface GeneralListItem {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
}

interface GeneralListProps {
  items: GeneralListItem[];
}

export const GeneralList: FC<GeneralListProps> = ({ items }) => {
  return (
    <List>
      {items.length === 0 && (
        <Card.Body>
          <ListItem>
            <VStack color="gray.300">
              <Frown strokeWidth="1.5" size="3rem" />
              <Text fontSize="lg" fontWeight="medium">
                No hay datos registrados
              </Text>
            </VStack>
          </ListItem>
        </Card.Body>
      )}
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
                          {items[index].title}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {items[index].subtitle}
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
  );
};
