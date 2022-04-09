import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Button } from "@/components";
import Link from "next/link";

export const ComplaintsPage: NextPage = () => {
  return (
    <WrapperPage title="Denuncias" breadcrumb={{ routes: ["complaints"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Listado de Denuncias"
          optionsRight={[
            <Link key="types" href="/complaints/types">
              <a>
                <Button variant="outline" w="24" colorScheme="pri" size="sm">
                  Tipos
                </Button>
              </a>
            </Link>,
            <Link key="reports" href="/complaints/reports">
              <a>
                <Button variant="outline" w="24" colorScheme="green" size="sm">
                  Reportes
                </Button>
              </a>
            </Link>,
          ]}
        />
        <Card.Body>Denuncias</Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
