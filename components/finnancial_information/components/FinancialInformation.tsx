"use client"
import React from "react"
import { PaidCapitalChart } from "../charts/PaidCapitalChart"
import { WrittenPremiumsChart } from "../charts/WrittenPremiumsChart"
import { UnderwrittenResultChart } from "../charts/UnderwrittenResultChart"
import { FinancialInformationCharts, UnderwrittenRatio, FinancialInformationPageData } from "../../../types/finnancialInformation"
import ShareholdersEquityChart from "../components/ShareHolders"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
export default function FinancialCharts({ data, evolution_capital, written_premiums, Underwritten_result_ratio }: { data: FinancialInformationPageData, evolution_capital: FinancialInformationCharts["evolution_capital"], written_premiums: FinancialInformationCharts["written_premiums"], Underwritten_result_ratio: UnderwrittenRatio[] }) {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="space-y-2">
        <div className="flex mb-6 -ml-2">
          <Link href="/">
            <span className="text-secondary-500 hover:text-primary-500 cursor-pointer font-semibold text-lg">
              <ChevronLeft className="inline-block h-6 w-6" />
              Home
            </span>
          </Link>
        </div>
        <div className="h-1 w-12 bg-secondary-500"></div>
        <h2 className="text-3xl font-bold text-primary-500">{data?.content_title}</h2>
        <div className="flex flex-col justify-center items-center space-x-2">
          <h3 className="text-center text-2xl font-medium text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {data?.evolution_capital_title}</h3>
        </div>
        <div className="mt-8">
          <PaidCapitalChart fullSize capitalInfo={evolution_capital} />
          <div className="text-right text-sm text-gray-500">
            <p><b>$</b>-Amounts in millions of United States Dollars</p>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex flex-col justify-center items-center space-x-2">
          <h3 className="text-center text-2xl font-medium text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {data?.written_premiums_title}</h3>
        </div>
        <div className="mt-8">
          <WrittenPremiumsChart fullSize premiumsInfo={written_premiums} />
        <div className="text-right text-sm text-gray-500">
          <p><b>$</b>-Amounts in millions of United States Dollars</p>
        </div>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex flex-col justify-center items-center space-x-2">
          <h3 className="text-center text-2xl font-medium text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {data?.ratio_title}</h3>
        </div>
        <div className="h-[500px] mt-8">
          <UnderwrittenResultChart ratioInfo={Underwritten_result_ratio} />
        </div>
      </section>
      <section className="space-y-2">
        <div className="flex flex-col justify-center items-center space-x-2">
          <h3 className="text-center text-2xl font-medium text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {data?.shareholders_title}</h3>
        </div>
        <div className="flex flex-col items-center justify-between">
          <ShareholdersEquityChart shareholders={data?.shareholders} />
        </div>
      </section>
    </div>
  )
}
