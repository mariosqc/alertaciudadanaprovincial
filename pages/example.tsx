import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useEffect } from "react";

import { database } from "@/firebase";

const example = () => {
  async function getValues() {
    const response = await database.ref("Admin").get();

    console.log(response.val());
  }

  useEffect(() => {
    getValues();
  }, []);

  return (
    <Box m="52">
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
    </Box>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = database.ref("Admin");
//   console.log(response);

//   return {
//     props: {},
//   };
// };

export default example;
