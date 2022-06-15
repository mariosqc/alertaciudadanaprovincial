import { FormProvider, Input, InputControl } from "@/components";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface AddingTypeFormProps {
  onSubmit: (data: any) => void;
}

export const AddingTypeForm: FC<AddingTypeFormProps> = ({ onSubmit }) => {
  const {} = useForm();

  return (
    <FormProvider id="adding-type-form" onSubmit={onSubmit}>
      <InputControl name="name" formControl={{ label: "Nombre" }} />
      <InputControl name="icon" formControl={{ label: "Ícono" }} inputProps={{ type: "file" }} />
    </FormProvider>
  );
};
