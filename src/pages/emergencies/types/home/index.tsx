import React from "react";

import { NextPage } from "next";
import { GeneralList, WrapperPage } from "@/templates";
import { IconButton } from "@chakra-ui/react";
import { Card } from "@/layout";
import { Plus } from "react-feather";

export const EmergencyTypesPage: NextPage = () => {
  return (
    <WrapperPage title="Tipos de Emergencias">
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Tipos de Emergencias"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id architecto velit, corporis facere aliquam."
          optionsRight={[
            <IconButton
              key="1"
              colorScheme="pri"
              rounded="md"
              variant="outline"
              size="sm"
              aria-label="New"
              icon={<Plus />}
            />,
          ]}
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
