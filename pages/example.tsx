import { Box } from "@chakra-ui/react";
import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

const example = () => {
  return (
    <div>
      <Scrollbar style={{ width: 250, height: 250 }}>
        <Box h="96" w="">
          Hola
        </Box>
      </Scrollbar>
    </div>
  );
};

export default example;
