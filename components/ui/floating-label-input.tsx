"use client";
import type * as React from "react"
import { cn } from "../../lib/utils"
import { useFormContext } from "react-hook-form"
import { FormControl, FormItem, FormMessage } from "../../components/ui/form"
import { CircleAlert, CircleCheck } from "lucide-react"
import { useState } from "react"
interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  className?: string
  containerClassName?: string
}

export function FloatingLabelInput({ label, name, className, containerClassName, ...props }: FloatingLabelInputProps) {
  const { formState, getFieldState, getValues } = useFormContext()
  const { error } = getFieldState(name, formState)
  const value = getValues(name)
  const [isFocused, setIsFocused] = useState(false)

  const isValid = !error && value !== undefined && value !== ""
  const showError = !!error

  const shouldFloat = isFocused || (!!value && value !== "")

  // Prevent ;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ';' || e.key === '´'|| e.key === '´') {
      e.preventDefault()
    }
    if (props.onKeyDown) {
      props.onKeyDown(e)
    }
  }

  return (
    <FormItem className={cn("relative mt-5", containerClassName)}>
      <div className="relative">
        <FormControl>
          <input
            id={name}
            className={cn(
              "h-14 w-full rounded-md border bg-transparent px-4 py-3 text-sm focus:outline-none peer",
              showError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : isValid
                  ? "border-green-500 focus:border-green-500 "
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              className,
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
              : "top-1/2 -translate-y-1/2 text-sm",
            showError ? "text-red-500" : isValid ? "text-green-500" : "text-gray-500",
          )}
        >
          {label}
        </label>
        {isValid && (
          <CircleCheck
            className={cn(
              "bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500",
              (props.type === "date" || props.type === "number" ) ? "right-10" : "right-3"
            )}
          />
        )}
        {showError && (
          <CircleAlert
            className={cn(
              "bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500",
              (props.type === "date" || props.type === "number" ) ? "right-10" : "right-3"
            )}
          />
        )}
      </div>
      <FormMessage />
    </FormItem>
  )
}

