import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ButtonTeam({text = "Learn more", type = "primary", link  = "/", className = "w-40", onClick}: {text?: string, type?: string, link?: string, className?: string, onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void}) {
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
                Learn more <ArrowRight className="ml-1" size={18}  />
            </button>
            </Link>	
        )}
        {type === "tertiary" && (	
            <Link href={link}>
            <button className={`${className} text-orange-700 italic px-1 border-b-2 border-transparent flex items-center justify-center hover:border-b-2 hover:border-secondary-500 transition `} onClick={onClick}>
                View All <ArrowRight className="ml-1" size={18}  />
            </button>
            </Link>	
        )}
        </>
    );
}