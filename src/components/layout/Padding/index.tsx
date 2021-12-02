import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";

type Spacing = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type Padding = {
  p: Spacing;
  pt: Spacing;
  pb: Spacing;
  pl: Spacing;
  pr: Spacing;
  px: Spacing;
  py: Spacing;
};

export type PaddingProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & Partial<Padding>
>;

export const Padding = ({
  p,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  children,
  className,
  ...props
}: PaddingProps) => {
  return (
    <div
      {...props}
      className={classNames(className, {
        [`pa-${p}`]: p,
        [`pt-${pt}`]: pt,
        [`pb-${pb}`]: pb,
        [`pl-${pl}`]: pl,
        [`pr-${pr}`]: pr,
        [`px-${px}`]: px,
        [`py-${py}`]: py,
      })}
    >
      {children}
    </div>
  );
};
