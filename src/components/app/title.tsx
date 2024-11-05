import { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-bold text-lg md:text-xl py-1 m-0 text-card-foreground">
      {children}
    </h1>
  );
}

export default Title;
