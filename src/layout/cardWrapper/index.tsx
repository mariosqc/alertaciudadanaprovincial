import React, { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

interface CardWrapperProps extends BoxProps {}

export const CardWrapper: FC<CardWrapperProps> = ({ children, ...props }) => {
  return (
    <Box borderWidth="1px" borderColor="gray.300" shadow="md" rounded="md" bgColor="white" {...props}>
      {children}
    </Box>
  );
};
