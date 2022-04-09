import { Card } from "@/layout";
import { WrapperPage } from "@/templates";
import { IconButton } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Maximize } from "react-feather";

export const DashboardPage: NextPage = () => {
  return (
    <WrapperPage fullScreen title="Dashboard">
      <Card.Wrapper colSpan={7}>
        <Card.Header
          title="Grafico 1"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
      </Card.Wrapper>
      <Card.Wrapper colSpan={5}>
        <Card.Header
          title="Grafico 2"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
      </Card.Wrapper>
      <Card.Wrapper colSpan={4}>
        <Card.Header
          title="Grafico 3"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
      </Card.Wrapper>
      <Card.Wrapper colSpan={4}>
        <Card.Header
          title="Grafico 4"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
      </Card.Wrapper>
      <Card.Wrapper colSpan={4}>
        <Card.Header
          title="Grafico 5"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
      </Card.Wrapper>
    </WrapperPage>
  );
};
