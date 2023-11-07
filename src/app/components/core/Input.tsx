import React from "react";

interface Props {
  placeholder?: string;
  type?: "text" | "password";
  className?: string;
}

export default function Input({
  placeholder,
  type = "text",
  className,
}: Props) {
  return (
    <input
      className={`bg-grey-darker p-3 rounded-lg outline-none w-full ${className}`}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}
