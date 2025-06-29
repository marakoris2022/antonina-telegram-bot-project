import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface WidgetContainerProps {
  children: ReactNode
  className?: string
  id?: string
}

export function WidgetContainer({ 
  children, 
  className,
  id 
}: WidgetContainerProps) {
  return (
    <section 
      id={id}
      className={cn(
        "w-full py-16 md:py-24 lg:py-32",
        className
      )}
    >
      <div className="container px-4 md:px-6">
        {children}
      </div>
    </section>
  )
}
