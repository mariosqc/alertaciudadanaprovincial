import React from "react";

import { Card } from "@/layout";

import { SetCenterCoordinates } from "./SetCenterCoordinates";

export const ConfigurationPanel = () => {
  return (
    <>
      <Card.Header
        title="Configuración de la aplicación"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
      />
      <Card.Body>
        <SetCenterCoordinates />
      </Card.Body>
    </>
  );
};
