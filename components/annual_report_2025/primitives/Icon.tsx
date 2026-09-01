import {
  BadgeCheck, Landmark, TrendingUp, Globe, Users, Handshake, Percent, ShieldCheck,
  LineChart, Building2, FileCheck, Network, Settings, Languages, Repeat, FileText,
  GitMerge, Banknote, PieChart, Target, Sparkles, Settings2, Database, Layers,
  ShieldAlert, ClipboardCheck, Download, ArrowRight, ArrowUpRight, ArrowDownRight,
  type LucideIcon,
} from 'lucide-react';

// Mapa nombre (string en BD) -> componente lucide. Centraliza el icon set del reporte.
const ICONS: Record<string, LucideIcon> = {
  BadgeCheck, Landmark, TrendingUp, Globe, Users, Handshake, Percent, ShieldCheck,
  LineChart, Building2, FileCheck, Network, Settings, Languages, Repeat, FileText,
  GitMerge, Banknote, PieChart, Target, Sparkles, Settings2, Database, Layers,
  ShieldAlert, ClipboardCheck, Download, ArrowRight, ArrowUpRight, ArrowDownRight,
};

export default function Icon({
  name,
  className,
  size = 24,
  strokeWidth = 1.6,
}: {
  name?: string | null;
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  if (!name) return null;
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden />;
}
