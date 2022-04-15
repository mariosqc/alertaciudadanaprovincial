import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";

export const DistrictTemplate: NextPage = () => {
  return (
    <WrapperPage title="Distritos" breadcrumb={{ routes: ["districts"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de distritos" />
      </Card.Wrapper>
      <Card.Wrapper colSpan={12}></Card.Wrapper>
    </WrapperPage>
  );
};
