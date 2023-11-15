import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  children: string;
  className?: string;
  secondary?: boolean;
  Icon?: IconType;
}

export default function Button({
  children,
  className,
  secondary,
  Icon,
}: Props) {
  const secondaryClasses = classNames({
    "bg-white !text-brand-dark border-brand-dark border-2 pl-2 pr-5": secondary,
  });

  const withIconClasses = classNames({
    "flex items-center justify-between": Icon,
  });

  const allClasses = `${className} ${secondaryClasses} ${withIconClasses}`;

  return (
    <button
      className={`outline-none text-center bg-brand border-2 border-brand text-lg text-white px-5 py-1 rounded-lg ${allClasses}`}
    >
      {Icon && <Icon className="text-2xl mr-8" />}
      {children}
    </button>
  );
}
