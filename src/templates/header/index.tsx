import { useAuthContext, useDistrictContext } from "@/contexts";
import { Card } from "@/layout";
import { Box, Avatar, CloseButton, Flex, HStack, IconButton, Text, Select, Tag } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Bell, LogOut, Menu, Settings } from "react-feather";
import Cookies from "universal-cookie";
import { Navbar } from "../navbar";
import { MenuDrawer } from "./MenuDrawer";

const cookies = new Cookies();

export const Header = () => {
  const { push, pathname } = useRouter();
  const { districts } = useDistrictContext();
  const hasSuperAdmin = cookies.get("hasSuperAdmin") === "true";

  const districtSelected = useMemo(
    () => districts.find((district) => district.id === cookies.get("district_id")),
    [districts]
  );

  console.log(hasSuperAdmin);

  function signOut() {
    cookies.remove("user");
    cookies.remove("hasSuperAdmin");
    cookies.remove("district_id");
    window.location.href = "/signin";
  }

  return (
    <Card.Wrapper rounded="none" shadow="sm">
      <Flex h={["16", null, null, "auto"]} px="6" alignItems="center" justifyContent="space-between">
        <Flex>
          <Text mr="12">Titulo aqui</Text>
          <Navbar />
        </Flex>
        <HStack>
          {hasSuperAdmin && (
            <>
              <Tag colorScheme="pri" variant="solid" minWidth="max-content" fontSize="sm">
                {districtSelected?.name}
              </Tag>
              <Select
                onChange={(e: any) => {
                  cookies.set("district_id", e.target.value, { path: "/" });
                  window.location.reload();
                }}
              >
                <option>Seleccionar...</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </Select>
            </>
          )}

          <IconButton
            aria-label="Settings"
            size="sm"
            variant={pathname !== "/settings" ? "ghost" : undefined}
            _focus={{}}
            colorScheme="blue"
            icon={<Settings size="1.25rem" />}
            onClick={() => push("/settings")}
          />
          <IconButton
            aria-label="Settings"
            size="sm"
            variant="ghost"
            _focus={{}}
            colorScheme="green"
            icon={<Bell size="1.25rem" />}
          />
          <Avatar size="sm" />

          <IconButton
            _focus={{}}
            display={["none", null, null, "flex"]}
            size="sm"
            aria-label=""
            icon={<LogOut size="1rem" />}
            colorScheme="red"
            variant="ghost"
            onClick={signOut}
          />
          <Box display={["flex", null, null, "none"]}>
            <MenuDrawer />
          </Box>
        </HStack>
      </Flex>
    </Card.Wrapper>
  );
};
