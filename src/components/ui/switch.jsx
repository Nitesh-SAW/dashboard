"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}>
    <span
      className={cn(
        "absolute left-1 text-xs font-medium text-white transition-opacity duration-200",
        "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
      )}
    >
      Yes
    </span>
    <span
      className={cn(
        "absolute right-1 text-xs font-medium text-black transition-opacity duration-200", "data-[state=checked]:opacity-0 data-[state=unchecked]:opacity-100"
      )}
    >
      NO
    </span>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-6 w-6 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
      )} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
