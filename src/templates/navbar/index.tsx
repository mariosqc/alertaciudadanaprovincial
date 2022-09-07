import { useAdmin } from "@/hooks";
import { Box, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const itemsMenu = [
  { label: "Dashboard", pathname: "/dashboard" },
  { label: "Usuarios", pathname: "/users" },
  { label: "Seguimiento", pathname: "/tracker" },
  { label: "Emergencias", pathname: "/emergencies" },
  { label: "Denuncias", pathname: "/complaints" },
  { label: "Directorios", pathname: "/directories" },
  { label: "Distritos", pathname: "/districts" },
  { label: "Banners", pathname: "/banners" },
];

export const Navbar = () => {
  const { pathname, push } = useRouter();
  const [items] = useState(itemsMenu);
  const { hasSuperAdmin } = useAdmin();

  return (
    <HStack display={["none", null, null, "flex"]}>
      {items
        .filter((item) => (!hasSuperAdmin ? item.pathname !== "/districts" : true))
        .map((item, i) => (
          <Box
            key={i}
            cursor="pointer"
            _hover={{ bgColor: "pri.50", color: "pri.500" }}
            borderBottomWidth="4px"
            borderBottomColor={pathname.includes(item.pathname) ? "pri.600" : "transparent"}
            px="2"
            userSelect="none"
            color={pathname.includes(item.pathname) ? "pri.600" : "black"}
            fontWeight="medium"
            py="4"
            onClick={() => push(item.pathname)}
          >
            {item.label}
          </Box>
        ))}
    </HStack>
  );
};
