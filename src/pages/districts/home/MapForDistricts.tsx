import React, { useState } from "react";

import { Card } from "@/layout";
import { Button, Map } from "@/components";

export const MapForDistricts = () => {
  const [isAddingDistric, setIsAddingDistric] = useState(false);

  return (
    <>
      <Card.Header
        title="Listado de distritos"
        optionsRight={[
          <Button size="sm" colorScheme="pri" key="new" onClick={() => setIsAddingDistric(!isAddingDistric)}>
            Nuevo Distrito
          </Button>,
        ]}
      />
      <Card.Body h="95%">
        <Map.Map />
      </Card.Body>
    </>
  );
};
