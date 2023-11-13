import classNames from "classnames";
import React from "react";

interface Props {
  children: string;
  className?: string;
  secondary?: boolean;
}

export default function Button({ children, className, secondary }: Props) {
  const secondaryClasses = classNames({
    "bg-white !text-brand-dark border-brand-dark border": secondary,
  });

  const allClasses = `${className} ${secondaryClasses}`;

  return (
    <button
      className={`outline-none bg-brand text-lg text-white px-5 py-2 rounded-xl ${allClasses}`}
    >
      {children}
    </button>
  );
}
