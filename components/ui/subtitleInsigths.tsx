import React from 'react'

export  function Subtitle({title = "", copy_writer = "", type = ""}: {title: string, copy_writer: string, type: string}) {
  return (
      <> 
      <div className={`w-full ${type === "Articles​" ? "md:w-11/12 mb-8 2xl:w-11/12 " : "md:w-7/12 mb-8 2xl:w-7/12 "}`}>
        <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
        <h1 className="text-4xl font-bold text-primary-500">{title}</h1>
          {copy_writer !== 'Active Re' && <p className="text-gray-500 text-lg md:text-lg font-bold mt-2">By {copy_writer}</p>}
      </div>
      </>
  )
}
export function SubtitleInverse({title}: {title: string}) {
  return (
    <>
      <div className="w-16 h-1 bg-secondary-500 mb-4"></div>
      <h2 className="text-4xl font-bold mb-4 text-primary-500">{title}</h2>
    </>
  )
}
export function SubtitleOcre({title}: {title: string}) {
  return (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-8 text-secondary-500">
            <div className="self-start space-y-2 h-1 w-12 bg-ocre-500 mt-8"></div>
            {title}</h2>
        </div>
  )
}