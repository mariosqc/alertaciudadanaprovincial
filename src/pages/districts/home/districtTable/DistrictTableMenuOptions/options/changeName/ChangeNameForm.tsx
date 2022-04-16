import { FormProvider, InputControl } from "@/components";
import React, { FC } from "react";

interface ChangeNameFormProps {
  onSubmit: (values: any) => void;
}

export const ChangeNameForm: FC<ChangeNameFormProps> = ({ onSubmit }) => {
  return (
    <FormProvider id="change-name-form" onSubmit={onSubmit}>
      <InputControl
        name="name"
        inputProps={{ defaultValue: "Santo Domigo" }}
        formControl={{ label: "Nombre del distrito" }}
      />
    </FormProvider>
  );
};
