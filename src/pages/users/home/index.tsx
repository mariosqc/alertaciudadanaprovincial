import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { UsersTable } from "./UsersTable";

export const UsersPage: NextPage = () => {
  return (
    <WrapperPage title="Usuarios" breadcrumb={{ routes: ["users"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Usuarios" />
        <UsersTable />
      </Card.Wrapper>
    </WrapperPage>
  );
};
