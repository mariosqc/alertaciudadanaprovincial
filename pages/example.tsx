import React, { useEffect } from "react";

import { database } from "@/firebase";
import { Box } from "@chakra-ui/react";

const ExamplePage = () => {
  async function getData() {
    const response = await database.ref("/admin/districts").get();

    console.log(response.val());
  }

  useEffect(() => {
    getData();
  }, []);

  return <Box m="24">ExamplePage</Box>;
};

export default ExamplePage;
