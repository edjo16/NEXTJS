import { fetchInsightsData } from "@/lib/directus"
import type { News } from "../../types/insights"
import type { Metadata } from "next"
import NewsListClient from "./NewsListClient"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const page = params.page ? parseInt(params.page as string) : 1

  const baseCanonical = 'https://active-re.com/news'

  if (page > 1) {
    return {
      title: `News And Articles - Page ${page}`,
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: `${baseCanonical}?page=${page}`,
      },
    }
  }

  return {
    title: "News And Articles",
    alternates: {
      canonical: baseCanonical,
    },
  }
}
  export default async function NewsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const allNews = (await fetchInsightsData()) as News[]

    const page = params.page ? parseInt(params.page as string) - 1 : 0
    const pageNumber = params.page ? parseInt(params.page as string) : 1
    const search = (params.search as string) || ''
    const category = (params.category as string) || ''

    return (
      <NewsListClient
        allNews={allNews}
        initialPage={page}
        initialSearch={search}
        initialCategory={category}
        pageNumber={pageNumber}
      />
    )
  
}