import { ReactNode } from "react";

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-sans font-normal m-0 pb-2 text-muted-foreground">
      {children}
    </h3>
  );
}

export default SubTitle;
