
import { cn } from "../../lib/utils"
import { FormControl, FormItem, FormMessage } from "../../components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useFormContext, Controller } from "react-hook-form"
import { CircleAlert,CircleCheck} from "lucide-react"
interface Option {
  value: string
  label: string
}

interface FloatingLabelSelectProps {
  label: string
  name: string
  options: Option[]
  className?: string
  containerClassName?: string
  placeholder?: string
}

export function FloatingLabelSelect({
  label,
  name,
  options,
  className,
  containerClassName,
  placeholder = "Select an option",
}: FloatingLabelSelectProps) {
  const { control, formState, getFieldState, getValues } = useFormContext()
  const { error, isDirty, isTouched } = getFieldState(name, formState)
  const value = getValues(name)

  const isValid = !error && value !== undefined && value !== ""
  const showError = !!error

  return (
    <FormItem className={cn("relative mt-5", containerClassName)}>
      <div className="relative">
        <label
          className={cn(
            "absolute -top-2.5 left-3 z-10 px-1 text-xs bg-white",
            showError ? "text-red-500" : isValid ? "text-green-500" : "text-gray-500",
          )}
        >
          {label}
        </label>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "h-14 w-full py-3 px-4 text-left",
                    showError
                      ? "border-red-500 focus:border-red-500"
                      : isValid
                      ? "border-green-500 focus:border-green-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                    className,
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="cursor-pointer hover:bg-celeste-100 focus:bg-celeste-200 focus:outline-none">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {isValid && (
          <CircleCheck className="bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
        )}
        {showError && (
          <CircleAlert className="bg-white absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500"/>
        )}
      </div>
      <FormMessage />
    </FormItem>
  )
}
