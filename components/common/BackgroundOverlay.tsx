import React from "react"
import Image from "./ImageBack"
interface BackgroundOverlayProps {
    children: React.ReactNode
    priority?: boolean
}

export default function BackgroundOverlay({ children, priority = false }: BackgroundOverlayProps) {
    return (
        <div className="relative w-full">
            <div
                className="absolute inset-0 z-10 bg-custom-gradient-big md:bg-custom-gradient pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 z-20 pointer-events-none">
                <Image src="/12119e58-3ad4-4f30-873c-5edb45f3dd16.png" alt="background" fill className="object-cover" priority={priority} />
            </div>
            <div className="relative">{children}</div>
        </div>
    )
}
