import React, { FC } from "react";

import { Box, BoxProps } from "@chakra-ui/react";

import Scrollbar from "react-scrollbars-custom";

export interface CardContainerProps extends BoxProps {
  activeScrollbar?: boolean;
}

export const CardContainer: FC<CardContainerProps> = ({ children, activeScrollbar, ...props }) => {
  return (
    <Box p="4" {...props} pr={activeScrollbar ? "1" : "auto"} pb={activeScrollbar ? "1" : "auto"}>
      {activeScrollbar ? <Scrollbar>{children}</Scrollbar> : children}
    </Box>
  );
};
