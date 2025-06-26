"use client";

/**
 * This feature is not ready for production yet.
 */

import { useRef } from "react";

const ScrollerProvider = ({ children }: { children: React.ReactNode }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // Adjust scroll step as needed
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };
    
    return (
        <div className="min-w-fit md:px-0 overflow-auto">
            <button
                aria-label="Scroll left"
                className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary hover:scale-110 text-white rounded-full p-2 shadow transition disabled:opacity-30"
                // style={{ display: feedbacks.length > 1 ? "block" : "none" }}
                onClick={() => scroll("left")}
                type="button"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button
                aria-label="Scroll right"
                className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/80 hover:bg-primary hover:scale-110 text-white rounded-full p-2 shadow transition disabled:opacity-30"
                // style={{ display: feedbacks.length > 1 ? "block" : "none" }}
                onClick={() => scroll("right")}
                type="button"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>


            <div className="w-full overflow-x-auto">
                <div className="flex flex-nowrap gap-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ScrollerProvider;