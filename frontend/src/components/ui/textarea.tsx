import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          " bg-white flex rounded-[3px] border border-input outline-none placeholder:text-muted-foreground disabled:opacity-80 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 mt-1 min-h-10 w-full max-w-full resize-none overflow-x-hidden overflow-y-auto scrollbar-none px-4 py-3 text-sm text-black shadow-sm transition hover:border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:bg-muted",
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
