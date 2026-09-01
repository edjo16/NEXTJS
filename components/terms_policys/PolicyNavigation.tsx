import Link from "next/link"

interface PolicyNavigationProps {
  currentPage: "terms" | "privacy" | "cookies"
}

export function PolicyNavigation({ currentPage }: PolicyNavigationProps) {
  return (
    <section className="px-4 md:px-8  max-w-6xl mx-auto">
    <div className="grid grid-cols-3 gap-4 rounded-lg  bg-gray-50 p-6 sm:grid-cols-3">
      <Link
        href="/terms"
        className={`rounded-md px-4 py-3 text-center text-sm font-medium transition-colors ${
          currentPage === "terms" ? "bg-ocre-500" : "hover:bg-ocre-400"
        }`}
      >
        Terms and Conditions
      </Link>
      <Link
        href="/cookies"
        className={`rounded-md px-4 py-3 text-center text-sm font-medium transition-colors ${
          currentPage === "cookies" ? "bg-ocre-500" : "hover:bg-ocre-400"
        }`}
      >
        Cookie Policy
      </Link>
      <Link
        href="/privacy"
        className={`rounded-md px-4 py-3 text-center text-sm font-medium transition-colors ${
          currentPage === "privacy" ? "bg-ocre-500" : "hover:bg-ocre-400"
        }`}
      >
        Privacy Policy
      </Link>
    </div>
    </section>
  )
}
