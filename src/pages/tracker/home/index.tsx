import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";

import { Map } from "@/components";

export const TrackerPage: NextPage = () => {
  return (
    <WrapperPage title="Seguimientos">
      <Card.Wrapper colSpan={12} flex="1">
        <Card.Header title="Seguimiento" />
        <Card.Body>
          <Map.Map />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
