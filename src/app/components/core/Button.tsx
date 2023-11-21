import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";
import Loader from "./Loader";

interface Props {
  children: string;
  className?: string;
  secondary?: boolean;
  Icon?: IconType;
  htmlType?: "button" | "submit";
  loading?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  className,
  secondary,
  Icon,
  htmlType = "button",
  loading,
  onClick,
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
      type={htmlType}
      onClick={onClick}
      className={`outline-none text-center bg-brand border-2 border-brand text-lg text-white px-5 py-1 rounded-lg ${allClasses}`}
    >
      {loading && <Loader className="w-4 h-4 mr-2" />}
      {Icon && <Icon className="text-2xl mr-8" />}
      {children}
    </button>
  );
}
