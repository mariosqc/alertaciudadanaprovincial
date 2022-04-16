import React from "react";

import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";

import { MoreVertical } from "react-feather";
import { ChangeNameModal } from "./options/changeName/ChangeNameModal";
import { EditUserModal } from "./options/editUser/EditUserModal";

export const DistrictTableMenuOptions = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="ghost"
        size="sm"
        _focus={{}}
        icon={<MoreVertical size="1.25rem" />}
      />
      <MenuList>
        <ChangeNameModal />
        <EditUserModal />
        <MenuItem>Eliminar</MenuItem>
      </MenuList>
    </Menu>
  );
};
