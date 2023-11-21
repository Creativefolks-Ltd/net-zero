import React from "react";
import { UseFormReturn, useFormContext, Controller } from "react-hook-form";

interface Props extends Partial<Pick<UseFormReturn, "register">> {
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
  label?: string;
  wrapperClassname?: string;
  value?: string;
  name: string;
  errorMessage?: string;
  required?: boolean;
}

export default function Input({
  placeholder,
  type = "text",
  className,
  label,
  wrapperClassname,
  value,
  name,
  errorMessage,
}: Props) {
  const { control } = useFormContext();

  if (label) {
    return (
      <div className={wrapperClassname}>
        <label className="mb-3 block text-brand-dark text-lg">{label}</label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              className={`bg-grey-darker p-3 rounded-lg outline-none w-full font-light ${
                !!errorMessage && "border-error border"
              } ${className}`}
              type={type}
              placeholder={placeholder}
              defaultValue={value}
              // onChange={onChange}
              {...field}
            ></input>
          )}
        />
        <p className="text-error mb-0 text-sm mt-1">{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className={wrapperClassname}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            className={`bg-grey-darker p-3 rounded-lg outline-none w-full font-light ${
              !!errorMessage && "border-error border"
            } ${className}`}
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            {...field}
          ></input>
        )}
      />
      <p className="text-error mb-0 text-sm mt-1">{errorMessage}</p>
    </div>
  );
}
