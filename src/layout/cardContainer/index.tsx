import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Scrollbar from "react-scrollbars-custom";

interface CardContainerProps extends BoxProps {
  activeScrollbar?: boolean;
}

export const CardContainer: FC<CardContainerProps> = ({
  children,
  activeScrollbar,
  ...props
}) => {
  return (
    <Box
      p="4"
      {...props}
      pr={activeScrollbar ? "1" : "auto"}
      pb={activeScrollbar ? "1" : "auto"}
    >
      {activeScrollbar ? <Scrollbar>{children}</Scrollbar> : children}
    </Box>
  );
};
