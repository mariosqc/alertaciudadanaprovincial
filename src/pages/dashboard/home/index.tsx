import { Card } from "@/layout";
import { WrapperPage } from "@/templates";
import { IconButton } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { Maximize } from "react-feather";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import ReactApexChart from "react-apexcharts";

export const DashboardPage: NextPage = () => {
  const Chart = (
    <ReactApexChart
      options={{
        chart: {
          height: "600",
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands";
            },
          },
        },
      }}
      series={[
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ]}
      type="bar"
      height="100%"
    />
  );

  return (
    <WrapperPage fullScreen title="Dashboard">
      <Card.Wrapper colSpan={[12, null, null, 6]}>
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
        <Card.Body flex="1">{Chart}</Card.Body>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
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
        <Card.Body flex="1">{Chart}</Card.Body>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
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
        <Card.Body flex="1">{Chart}</Card.Body>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
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
        <Card.Body flex="1">{Chart}</Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
