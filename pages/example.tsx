import { Button, FormProvider, InputControl } from "@/components";
import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import * as yup from "yup";
import { faker } from "@faker-js/faker";

const exampleFormSchema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  lastname: yup.string().required("El apellido es requerido"),
  email: yup.string().email().required("El email es requerido"),
});

type ExampleFormType = RemoveIndex<yup.InferType<typeof exampleFormSchema>>;

interface ExampleFormProps extends ExampleFormType {}

const ExamplePage = () => {
  async function onSubmit(values: ExampleFormProps) {
    console.log(values);
  }

  return (
    <Box m="32">
      <ExampleForm onSubmit={onSubmit} />
    </Box>
  );
};

const fakerValues: ExampleFormType = {
  email: faker.internet.email(),
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
};

interface ComponentFormProps<T> {
  onSubmit(values: T): void;
}

const ExampleForm: FC<ComponentFormProps<ExampleFormProps>> = ({ onSubmit }) => {
  return (
    <FormProvider
      id="example-form"
      schema={exampleFormSchema}
      onSubmit={onSubmit}
      faker={fakerValues}
      // defaultValues={{ email: "hola@gmail.com" } as ExampleFormType}
    >
      <Stack w="xl" mx="auto">
        <InputControl formControl={{ label: "name" }} name="name" />
        <InputControl formControl={{ label: "lastname" }} name="lastname" />
        <InputControl formControl={{ label: "email" }} name="email" />
        <Flex justifyContent="flex-end">
          <Button type="submit">Submit</Button>
        </Flex>
      </Stack>
    </FormProvider>
  );
};

export default ExamplePage;
