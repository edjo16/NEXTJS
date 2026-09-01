"use client"
import dynamic from "next/dynamic"
import React from "react"
const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-md">
      <div className="text-gray-600">Loading Visor...</div>
    </div>
  ),
});

export default function PdfViewerClient(props: any) {
  return <PdfViewer {...props} />;
}
