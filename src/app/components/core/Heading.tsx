import React from "react";
import classNames from "classnames";

interface Props {
  withUnderline?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: string;
  className?: string;
}

export const Heading = ({
  withUnderline,
  level,
  children,
  className,
}: Props) => {
  const underlineClass = classNames({
    "heading-underline relative w-fit": withUnderline,
  });

  const classes = `${underlineClass} ${className}`;

  if (level === 1) return <h1 className={classes}>{children}</h1>;

  if (level === 2) return <h2 className={classes}>{children}</h2>;

  if (level === 4) return <h4 className={classes}>{children}</h4>;

  if (level === 5) return <h5 className={classes}>{children}</h5>;

  if (level === 6) return <h6 className={classes}>{children}</h6>;

  return <h3 className={classes}>{children}</h3>;
};
