import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { NewDistrict } from "./newDistrict/NewDistrict";

export const DistrictTemplate: NextPage = () => {
  return (
    <WrapperPage fullScreen title="Distritos" breadcrumb={{ routes: ["districts"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Distritos" optionsRight={[<NewDistrict key={1} />]} />
      </Card.Wrapper>
    </WrapperPage>
  );
};
