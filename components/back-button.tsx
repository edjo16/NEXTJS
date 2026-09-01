"use client";

import { Button } from "@/components/ui/button"

export function BackButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full sm:w-auto bg-transparent"
      onClick={() => window.history.back()}
    >
      Go Back
    </Button>
  )
}
