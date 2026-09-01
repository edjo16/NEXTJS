import { ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';
import Link from "next/link"

export function RegularButton({text = "Learn more", type = "primary", link  = "/", className = "w-45", onClick, outSide = true}: {text?: string, type?: "primary" | "secondary" | "tertiary"| "quarterly", link?: string, className?: string, onClick?: () => void, outSide?: boolean}) {
    return (
        <>
        {type === "primary" && (
            <Link href={link}>
            <button className={`${className} border border-orange-700 text-orange-700 italic px-4 py-2 flex items-center justify-between  hover:border-secondary-500 hover:bg-orange-700 hover:text-white transition `} onClick={onClick}>
            {text} <ArrowRight className="ml-2" size={18}  />
            </button>
            </Link>	
        )}
        {type === "secondary" && (	
            <Link href={link}>
            <button className={`${className} bg-orange-700 text-white italic px-4 py-2 flex items-center justify-between hover:bg-white hover:text-orange-700 border border-orange-700 transition`} onClick={onClick}>
                {text} <ArrowRight className="ml-1" size={18}  />
            </button>
            </Link>	
        )}
        {type === "tertiary" && (	
            <Link href={link}>
            {outSide ? (
                <button className={`${className} text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `} onClick={() => window.open(link, "_blank")}>
                    {text} <ArrowRight className="ml-1" size={18}  />
                </button>
            ) : (
                <button className={`${className} text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `} onClick={onClick}>
                    {text} <ArrowRight className="ml-1" size={18}  />
                </button>
            )}
            </Link>	
        )}
                {type === "quarterly" && (	
            <Link href={link}>
            {outSide ? (
                <button className={`${className} text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `} onClick={onClick}>
                    {text} <ArrowRight className="ml-1" size={18}  />
                </button>
            ) : (
                <button className={`${className} text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `} onClick={onClick}>
                    {text} <ArrowRight className="ml-1" size={18}  />
                </button>
            )}
            </Link>	
        )}
        </>
    );
}