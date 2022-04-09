import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";

export const DistrictTemplate: NextPage = () => {
  return (
    <WrapperPage title="Distritos" breadcrumb={{ routes: ["districts"] }}>
      DistrictTemplate
    </WrapperPage>
  );
};
