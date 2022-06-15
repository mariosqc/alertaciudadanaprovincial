import React from "react";

import { NextPage } from "next";

import { GeneralList, GeneralModalAdd, WrapperPage } from "@/templates";

import { Card } from "@/layout";

export const EmergencyTypesPage: NextPage = () => {
  async function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <WrapperPage title="Tipos de Emergencias">
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Tipos de Emergencias"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id architecto velit, corporis facere aliquam."
          optionsRight={[<GeneralModalAdd isLoading={false} key="add" onSubmit={onSubmit} />]}
        />
        <GeneralList
          items={[
            { id: "1", title: "Title 1" },
            { id: "2", title: "Title 2" },
            { id: "3", title: "Title 3" },
            { id: "4", title: "Title 4" },
            { id: "5", title: "Title 5" },
          ]}
        />
      </Card.Wrapper>
    </WrapperPage>
  );
};
