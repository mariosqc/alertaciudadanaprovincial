import { Box } from "@chakra-ui/react";
import React from "react";
import { ExampleForm, ExampleFormSchema } from "./exampleForm";

const ExamplePage = () => {
  async function onSubmit({ email, lastname, name }: ExampleFormSchema) {}

  return (
    <Box mt="32">
      <ExampleForm onSubmit={onSubmit} />
    </Box>
  );
};

export default ExamplePage;
