import React, { FC, useEffect, useState } from "react";
import { FormProvider as _FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

export interface FormProviderProps {
  id: string;
  onSubmit(values: any): void;
  setMethods?: any;
  defaultValues?: any;
  schema?: any;
}

export const FormProvider: FC<FormProviderProps> = ({ children, id, onSubmit, defaultValues, setMethods, schema }) => {
  const [defaultValuesInternal, setDefaultValuesInternal] = useState<any>(null);
  const methods = useForm({ resolver: yupResolver(schema) });

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
