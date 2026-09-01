import React from 'react'

export  function Subtitle({title = ""}: {title?: string}) {
  return (
      <>
        <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
        <h2 className="text-2xl font-bold mb-8 text-primary-500">{title}</h2>
      </>
  )
}
export function SubtitleInverse({title}: {title: string}) {
  return (
    <>
      <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
      <h2 className="text-2xl font-bold mb-4 text-primary-500">{title}</h2>
    </>
  )
}
export function SubtitleOcre({title}: {title: string}) {
  return (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-8 text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {title}</h2>
        </div>
  )
}