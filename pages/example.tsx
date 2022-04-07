import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { query, get } from "firebase/database";

import { database } from "@/firebase";
import { WrapperPage } from "@/templates";

const example = () => {
  async function getValues() {
    const response = await get(query(database.ref("Provincia/Emergency")));

    console.log(response.val());
  }

  useEffect(() => {
    getValues();
  }, []);

  return (
    <WrapperPage title="Example page">
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
    </WrapperPage>
  );
};

export default example;
