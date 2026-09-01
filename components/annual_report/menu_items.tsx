  "use client"

  import { Building2, BarChart3, LineChart, Luggage, Repeat2, Gavel, Cpu, FileText, Landmark, Sparkles, Users, Briefcase, Globe, Settings } from 'lucide-react'

  export type AnnualReportMenuItem = {
    id: string
    label: string
    icon: React.ReactNode
    onClick?: () => void
  }

  export function buildAnnualReportMenuItems(onOpenReport: () => void): AnnualReportMenuItem[] {
    return [
      {
        id: 'about-active-re',
        label: 'About Active Re​',
        icon: <Building2 className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'financials-report',
        label: 'Financials',
        icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'strategy',
        label: 'Strategy Highlights',
        icon: <Landmark className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'underwriting',
        label: 'Underwriting Performance',
        icon: <LineChart className="h-5 w-5" aria-hidden="true" />
      },
            {
        id: 'technical-operations',
        label: 'Technical Operations',
        icon: <Luggage className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'retrosession',
        label: 'Retrocession Strategy​',
        icon: <Repeat2 className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'corporate-governance',
        label: 'Corporate Governance​',
        icon: <Gavel className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'technology-innovation',
        label: 'Technology & Innovation​',
        icon: <Cpu className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'annual-report',
        label: '2024 Annual Report​',
        icon: <FileText className="h-5 w-5" aria-hidden="true" />,
        onClick: onOpenReport,
      },
    ]
  }

  export function buildAnnualReportMenuItems2025(): AnnualReportMenuItem[] {
    return [
      {
        id: 'highlights',
        label: 'Key Highlights',
        icon: <Sparkles className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'executive',
        label: 'Executive Leadership',
        icon: <Users className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'performance',
        label: 'Financial Performance',
        icon: <BarChart3 className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'lines2025',
        label: 'Lines of Business',
        icon: <Briefcase className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'global-presence',
        label: 'Global Presence',
        icon: <Globe className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'operations',
        label: 'Operations',
        icon: <Settings className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'governance',
        label: 'Retrocession & Governance',
        icon: <Gavel className="h-5 w-5" aria-hidden="true" />
      },
      {
        id: 'closing',
        label: 'Closing',
        icon: <FileText className="h-5 w-5" aria-hidden="true" />
      },
    ]
  }
  