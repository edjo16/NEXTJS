import type { Metadata } from 'next';
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"
import { BackButton } from "@/components/back-button"

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The web page is not found.',
};

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Número 404 grande */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-slate-200 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-300 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 md:w-20 md:h-20 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            We couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>

          <BackButton />


        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-slate-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-slate-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-slate-200 rounded-full opacity-40 animate-pulse delay-500"></div>
      </div>
    </div>
    </div>
    </>
  )
}
