import React from "react";

interface Props {
  children: string;
  className?: string;
}

export default function Button({ children, className }: Props) {
  return (
    <button
      className={`outline-none bg-brand text-lg text-white px-5 py-2 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}
