import { ReactElement, ReactNode } from "react";

type WhenProps = {
  children: ReactNode | (() => void);
  fallback?: ReactNode;
  value: any;
};

export function When({ children, value, fallback }: Readonly<WhenProps>) {
  if (value) {
    return (
      typeof children === "function" ? children() : children
    ) as ReactElement;
  }

  if (fallback) {
    return fallback;
  }

  return <></>;
}
