"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const ShowBaseOnPathname = ({
  children,
  exclude
}: {
  children: ReactNode;
  exclude: string[];
}) => {
  const pathname = usePathname();
  if (exclude.some((path) => path === pathname)) return null;
  return <>{children}</>;
};

export { ShowBaseOnPathname };
