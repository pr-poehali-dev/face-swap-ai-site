
import { LucideProps, type Icon as LucideIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Suspense, lazy } from "react";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
  fallback?: keyof typeof dynamicIconImports;
}

const Icon = ({ name, fallback, ...props }: IconProps) => {
  const IconComponent = lazy(
    async () => {
      try {
        return await dynamicIconImports[name]();
      } catch (error) {
        if (fallback) {
          return await dynamicIconImports[fallback]();
        }
        throw error;
      }
    }
  );

  return (
    <Suspense fallback={<div className="w-4 h-4"></div>}>
      <IconComponent {...props} />
    </Suspense>
  );
};

export default Icon;
