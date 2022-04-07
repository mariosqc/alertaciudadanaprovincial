import { Box, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const [items] = useState([
    {
      label: "Dashboard",
      pathname: "/dashboard",
    },
    {
      label: "Usuarios",
      pathname: "/users",
    },
    {
      label: "Seguimiento",
      pathname: "/tracker",
    },
    {
      label: "Emergencias",
      pathname: "/emergencies",
    },
    {
      label: "Denuncias",
      pathname: "/complaints",
    },
  ]);

  return (
    <div>
      <HStack>
        {items.map((item, i) => {
          const isActive = asPath === item.pathname;

          return (
            <Box
              key={i}
              cursor="pointer"
              _hover={{ bgColor: "pri.50", color: "pri.500" }}
              borderBottomWidth="4px"
              borderBottomColor={isActive ? "pri.600" : "transparent"}
              px="2"
              userSelect="none"
              color={isActive ? "pri.600" : "black"}
              fontWeight="medium"
              py="4"
              onClick={() => push(item.pathname)}
            >
              {item.label}
            </Box>
          );
        })}
      </HStack>
    </div>
  );
};
