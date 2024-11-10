import { lazy, Suspense, useMemo } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const DynamicIcon = useMemo(() => {
    return lazy(dynamicIconImports[name]);
  }, [name]);

  return (
    <Suspense fallback={fallback}>
      <DynamicIcon {...props} />
    </Suspense>
  );
};

export default Icon;
