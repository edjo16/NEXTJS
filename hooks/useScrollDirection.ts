import { useEffect, useState } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")

  useEffect(() => {
    let lastScrollY = window.scrollY

    const updateScrollDirection = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY) < 10) return

      setScrollDirection(scrollY > lastScrollY ? "down" : "up")

      lastScrollY = scrollY > 0 ? scrollY : 0
    }

    window.addEventListener("scroll", updateScrollDirection)

    return () => window.removeEventListener("scroll", updateScrollDirection)
  }, [])

  return scrollDirection
}