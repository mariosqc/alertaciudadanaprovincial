import React from "react";

import { NextPage } from "next";

import { GeneralList, GeneralModalAdd, WrapperPage } from "@/templates";

import { Card } from "@/layout";
import { useEmergencyContext } from "@/contexts";

export const EmergencyTypesPage: NextPage = () => {
  const { typesOfEmergencies } = useEmergencyContext();

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
        <GeneralList items={typesOfEmergencies} />
      </Card.Wrapper>
    </WrapperPage>
  );
};
