import { cn } from '@/lib/utils';

/**
 * Variación con glifo direccional + texto. El color depende del TONO (bueno/malo),
 * no de la dirección — así "Combined Ratio ▼ −6%" puede ser verde (mejor).
 * El glifo nunca codifica significado solo por color (accesible).
 */
export default function Delta({
  value,
  direction,
  className,
}: {
  value?: string;
  direction: string;
  className?: string;
}) {
  if (!value) return null;
  const glyph = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '◆';
  const toneClass = value.startsWith('-') ? 'primary-600' : 'primary-500';
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-md font-medium', toneClass, className)}
      style={{color:"#b6821f"}}
    >
      <span aria-hidden>{glyph}</span>
      {value}
    </span>
  );
}
