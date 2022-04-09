import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
// @ts-ignore
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { useDebouncedCallback } from "use-debounce";
import { Input, InputProps } from "../input";

export interface InputNumberProps extends InputProps {
  inputNumberProps?: NumberFormatProps;
}

export const InputNumber: FC<InputNumberProps> = ({ rules, name, inputProps, inputNumberProps }) => {
  const { control } = useFormContext();
  const { setValue, getValues } = useFormContext();
  const debounced = useDebouncedCallback((value: string) => setValue(name, value), 250);

  const InputComodin = (props: any) => {
    return <Input name={props.name} inputProps={{ ...props, ...inputProps }} />;
  };

  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field }) => {
        return <NumberFormat {...field} {...inputNumberProps} customInput={InputComodin} />;
      }}
    />
  );
};
