"use client";
import * as React from "react"
import { cn } from "../../lib/utils"
import { useFormContext } from "react-hook-form"
import { FormControl, FormItem, FormMessage } from "../../components/ui/form"
import { CircleAlert, CircleCheck } from "lucide-react"
import { useState } from "react"

interface FloatingLabelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  className?: string
  containerClassName?: string
}

export function FloatingLabelTextarea({
  label,
  name,
  className,
  containerClassName,
  ...props
}: FloatingLabelTextareaProps) {
  const { formState, getFieldState, getValues } = useFormContext()
  const { error } = getFieldState(name, formState)
  const value = getValues(name)
  const [isFocused, setIsFocused] = useState(false)

  const isValid = !error && value !== undefined && value !== ""
  const showError = !!error
  const shouldFloat = isFocused || (!!value && value !== "")

  // Prevent ;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ';') {
      e.preventDefault()
    }
    if (props.onKeyDown) {
      props.onKeyDown(e)
    }
  }

  return (
    <FormItem className={cn("relative", containerClassName)}>
      <div className="relative">
        <FormControl>
          <textarea
            id={name}
            className={cn(
              "min-h-[80px] w-full rounded-md border bg-transparent px-4 py-3 text-sm focus:outline-none peer resize-none",
              showError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : isValid
                  ? "border-green-500 focus:border-green-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            {...props}
          />
        </FormControl>
        <label
          htmlFor={name}
          className={cn(
            "absolute left-3 z-10 px-2 bg-white transition-all duration-200 pointer-events-none",
            shouldFloat
              ? "-top-2.5 text-xs"
              : "top-3 left-4 text-sm",
            showError ? "text-red-500" : isValid ? "text-green-500" : "text-gray-500"
          )}
        >
          {label}
        </label>
        {isValid && (
          <CircleCheck className="bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500"/>
        )}
        {showError && (
          <CircleAlert className="bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500"/>
        )}
      </div>
      <FormMessage />
    </FormItem>
  )
}

