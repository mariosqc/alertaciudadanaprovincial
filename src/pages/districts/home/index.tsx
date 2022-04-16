import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { NewDistrict } from "./newDistrict/NewDistrict";
import { DistrictTable } from "./districtTable/DistrictTable";

export const DistrictTemplate: NextPage = () => {
  return (
    <WrapperPage title="Listado de Distritos" breadcrumb={{ routes: ["districts"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Distritos" optionsRight={[<NewDistrict key={1} />]} />
        <Card.Body px="0">
          <DistrictTable />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
