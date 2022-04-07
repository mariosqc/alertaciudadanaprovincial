import React, { FC, useEffect, useState } from "react";
import { FormProvider as _FormProvider, useForm } from "react-hook-form";

export interface FormProviderProps {
  id: string;
  onSubmit(values: any): void;
  setMethods?: any;
  defaultValues?: any;
}

export const FormProvider: FC<FormProviderProps> = ({ children, id, onSubmit, defaultValues, setMethods }) => {
  const [defaultValuesInternal, setDefaultValuesInternal] = useState<any>(null);
  const methods = useForm();

  useEffect(() => {
    if (defaultValues && JSON.stringify(defaultValues) !== JSON.stringify(defaultValuesInternal)) {
      methods.reset(defaultValues);
      setDefaultValuesInternal(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    setMethods?.(methods);
  }, []);

  return (
    <_FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id}>
        {children}
      </form>
    </_FormProvider>
  );
};
