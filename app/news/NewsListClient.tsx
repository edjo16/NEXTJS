"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { News } from "../../types/insights"
import ImageBack from "@/components/common/ImageBack"
import { formatDate } from "@/utils/formatDate"

interface NewsListClientProps {
  allNews: News[];
  initialPage?: number;
  initialSearch?: string;
  initialCategory?: string;
  pageNumber?: number;
}

export default function NewsListClient({ allNews, initialPage = 0, initialSearch = '', initialCategory = '', pageNumber = 1 }: NewsListClientProps) {
  const router = useRouter();
  
  const [filteredNews, setFilteredNews] = useState<News[]>(allNews)
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const itemsPerPage = 15
  
  useEffect(() => {
    let result = [...allNews].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (news: News) =>
          news.title.toLowerCase().includes(term) ||
          (news.content_preview && news.content_preview.toLowerCase().includes(term))
      )
    }

    if (selectedCategory) {
      result = result.filter((news: News) => news.tags?.includes(selectedCategory))
    }

    setFilteredNews(result)
  }, [searchTerm, selectedCategory, allNews])

  useEffect(() => {
    setCurrentPage(0)
  }, [searchTerm, selectedCategory])

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 0
  const currentNews = filteredNews.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const updateURL = (page: number, search: string, category: string | null) => {
    const params = new URLSearchParams();
    if (page > 0) params.set('page', String(page + 1));
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/news?${queryString}` : '/news';
    router.push(newUrl, { scroll: false });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page)
    updateURL(page, searchTerm, selectedCategory);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextPage = () => {
    const newPage = (currentPage + 1) % totalPages;
    goToPage(newPage);
  }

  const prevPage = () => {
    const newPage = (currentPage - 1 + totalPages) % totalPages;
    goToPage(newPage);
  }

  const tagsSet = new Set<string>()
  allNews.forEach((item: News) => {
    item?.tags?.forEach(tag => tagsSet.add(tag))
  })
  const categories = Array.from(tagsSet).map(tag => ({
    id: tag,
    name: tag
  }))

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-background-news text-white py-16 min-h-96">
        <div className="mx-auto pt-14 xl:py-12 max-w-6xl md:max-w-5xl xl:max-w-5xl 2xl:max-w-7xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold my-8">
            News And Articles{pageNumber > 1 && ` - Page ${pageNumber}`}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            Stay updated with the latest news, events, and insights from Active Re
          </p>
        </div>
      </div>

      <div className="section-container">
        <div className="flex mb-6 -ml-2">
          <Link href="/insights">
            <span className="text-secondary-500 hover:text-primary-500 cursor-pointer font-semibold text-lg">
              <ChevronLeft className="inline-block h-6 w-6" />
              Insights
            </span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition duration-150 ease-in-out"
                placeholder="Search news, articles..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  updateURL(0, e.target.value, selectedCategory);
                }}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setSearchTerm("");
                    updateURL(0, "", selectedCategory);
                  }}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-800" />
                </button>
              )}
            </div>

            <div className="flex overflow-x-auto gap-2 whitespace-nowrap p-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                  ? "bg-secondary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => {
                  setSelectedCategory(null);
                  updateURL(0, searchTerm, null);
                }}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                    ? "bg-secondary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    updateURL(0, searchTerm, category.id);
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory
                ? `${categories.find((c) => c.id === selectedCategory)?.name || "News"}`
                : searchTerm
                  ? `Search Results: "${searchTerm}"`
                  : "All Insights"}
            </h2>
            <p className="text-gray-800">
              {filteredNews.length} {filteredNews.length === 1 ? "Result" : "Results"}
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
            {currentNews.length > 0 ? (
              currentNews.map((item, index) => (
                <motion.div
                  key={item?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link
                    href={`/news/${item?.code}`}
                    className="group bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:scale-[1.02] transform-gpu"
                  >
                    <div className="relative h-52 md:h-56 pointer-events-none">
                      <ImageBack
                        src={item?.preview_image.filename_disk || "/placeholder.svg"}
                        alt={item?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex gap-2">
                        {item?.tags?.map((tag: string) => (
                          <span key={tag} className="inline-block px-3 py-1 text-xs font-semibold bg-gray-50 text-primary-500 rounded-full mb-3">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-md md:text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                        {truncateText(item?.title, 67)}
                      </h3>
                      {item?.content_preview && (
                        <p className="text-gray-800 mb-4 line-clamp-2">{truncateText(item?.content_preview, 120)}</p>
                      )}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">{formatDate(item?.date)}</span>
                        <span className="text-orange-600 font-medium hover:underline">Read More</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">We could not find any news matching your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(null);
                    updateURL(0, "", null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {filteredNews.length > 0 && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              {currentPage > 0 ? (
                <Link
                  href={`/news?page=${currentPage}`}
                  onClick={(e) => {
                    e.preventDefault();
                    prevPage();
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                if (i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)) {
                  const pageUrl = i === 0 ? '/news' : `/news?page=${i + 1}`;
                  return (
                    <Link
                      key={i}
                      href={pageUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        goToPage(i);
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === i
                        ? "bg-secondary-600 text-white"
                        : "border border-gray-300 text-gray-800 hover:bg-secondary-500 hover:text-white hover:border-secondary-500"
                        } transition-colors`}
                      aria-label={`Page ${i + 1}`}
                      aria-current={currentPage === i ? "page" : undefined}
                    >
                      {i + 1}
                    </Link>
                  )
                } else if (
                  (i === currentPage - 2 && currentPage > 2) ||
                  (i === currentPage + 2 && currentPage < totalPages - 3)
                ) {
                  return (
                    <span key={i} className="w-10 h-10 flex items-center justify-center text-gray-500">
                      ...
                    </span>
                  )
                }
                return null
              })}

              {currentPage < totalPages - 1 ? (
                <Link
                  href={`/news?page=${currentPage + 2}`}
                  onClick={(e) => {
                    e.preventDefault();
                    nextPage();
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}