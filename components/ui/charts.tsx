"use client"
import * as React from "react"
import { Tooltip, type TooltipProps } from "recharts"

// Configuración del contexto para los gráficos
type ChartConfig = Record<
  string,
  {
    label: string
    color?: string
    icon?: React.ComponentType<{ className?: string }>
  }
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | undefined>(undefined)

// Hook para usar el contexto de los gráficos
function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext debe ser usado dentro de un ChartContainer")
  }
  return context
}

// Componente contenedor para los gráficos
interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const [mounted, setMounted] = React.useState(false)
  
  // Aplicamos las variables CSS para los colores de los gráficos
  React.useEffect(() => {
    setMounted(true)
    const root = document.documentElement

    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        root.style.setProperty(`--color-${key}`, value.color)
      }
    })

    return () => {
      Object.keys(config).forEach((key) => {
        root.style.removeProperty(`--color-${key}`)
      })
    }
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div 
        className={className ? `w-full ${className}` : "w-full"} 
        style={{ minHeight: mounted ? '360px' : '360px', height: '100%' }}
        {...props}
      >
        {mounted ? children : <div style={{ height: '360px' }} />}
      </div>
    </ChartContext.Provider>
  )
}

// Componente para el tooltip de los gráficos
interface ChartTooltipProps<TData extends object> extends Omit<TooltipProps<any, any>, "content"> {
  content?: React.ReactNode
  defaultIndex?: number
}

function ChartTooltip<TData extends object>({
  content,
  cursor = { fill: "var(--chart-tooltip-cursor)" },
  defaultIndex,
  ...props
}: ChartTooltipProps<TData>) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(defaultIndex)

  // Efecto para establecer el índice activo por defecto
  React.useEffect(() => {
    if (typeof defaultIndex === "number") {
      setActiveIndex(defaultIndex)
    }
  }, [defaultIndex])

  return (
    <Tooltip
      {...props}
      cursor={cursor}
      content={typeof content === "function" ? content : () => content}
      position={{ x: 0, y: 0 }}
      allowEscapeViewBox={{ x: false, y: true }}
      isAnimationActive={false}
      animationDuration={0}
      active={typeof activeIndex === "number"}
    />
  )
}

// Componente para el contenido del tooltip
interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: {
    label: string
    value: string | number
    color?: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  formatter?: (value: number | string) => string
  labelFormatter?: (label: string) => string
  hideLabel?: boolean
  labelKey?: string
  valueKey?: string
  indicator?: "line" | "dot"
}

function ChartTooltipContent({
  className,
  items,
  formatter = (value) => String(value),
  labelFormatter = (label) => label,
  hideLabel = false,
  labelKey,
  valueKey,
  indicator = "dot",
  ...props
}: ChartTooltipContentProps) {
  const { config } = useChartContext()

  // Función para renderizar el contenido del tooltip
  const renderContent = () => {
    if (!items?.length) return null

    return (
      <div className="space-y-1.5">
        {!hideLabel && (
          <div className="text-xs text-muted-foreground">
            {labelKey && config[labelKey] ? config[labelKey].label : labelFormatter(String(items[0].label))}
          </div>
        )}
        <div className="space-y-1">
          {items.map((item, index)  => {
            const configItem = config[item.label]
            if (!configItem && !valueKey) return null

            const Icon = configItem?.icon
            const color = item.color || configItem?.color || `var(--color-${item.label})`

            return (
              <div key={index} className="flex items-center gap-2">
                {indicator === "line" ? (
                  <div className="h-0.5 w-4" style={{ backgroundColor: color }} />
                ) : (
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                )}
                <div className="flex items-center gap-1">
                  {Icon && <Icon className="h-3 w-3" />}
                  <div className="font-medium">{configItem?.label || item.label}</div>
                </div>
                <div className="ml-auto font-medium">
                  {/* {formatter(valueKey && typeof item[valueKey] !== "undefined" ? item[valueKey] : item.value)} */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const tooltipClasses = className
    ? `rounded-lg border bg-background px-3 py-1.5 shadow-md ${className}`
    : "rounded-lg border bg-background px-3 py-1.5 shadow-md"

  return (
    <div className={tooltipClasses} {...props}>
      {renderContent()}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChartContext, type ChartConfig }
