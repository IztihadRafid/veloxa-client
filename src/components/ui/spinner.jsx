import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

function Spinner({ className, ...props }) {
  return (
 <div className="flex h-screen w-full items-center justify-center">
  <HugeiconsIcon
    icon={Loading03Icon}
    strokeWidth={3}
    role="status"
    aria-label="Loading"
    className={cn("size-12 animate-spin text-lime-600", className)}
    {...props} 
  />
</div>
  );
}

export { Spinner };
