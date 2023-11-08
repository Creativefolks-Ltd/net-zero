import React from "react";

interface Props {
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
  label?: string;
  wrapperClassname?: string;
}

export default function Input({
  placeholder,
  type = "text",
  className,
  label,
  wrapperClassname,
}: Props) {
  if (label) {
    return (
      <div className={wrapperClassname}>
        <label className="mb-3 block text-brand-dark text-lg">{label}</label>
        <input
          className={`bg-grey-darker p-3 rounded-lg outline-none w-full font-light ${className}`}
          type={type}
          placeholder={placeholder}
        ></input>
      </div>
    );
  }
  return (
    <input
      className={`bg-grey-darker p-3 rounded-lg outline-none w-full font-light ${className}`}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}
