"use client";

import { AVAILABLE_THEMES, Theme } from "@/utils/types/theme";
import { useEffect } from "react";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Check if the user has a preferred theme in localStorage
        let theme = localStorage.getItem("theme");
        if (!theme || !AVAILABLE_THEMES.includes(theme as Theme)) {
            const preferedDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            theme = preferedDark ? Theme.DARK : Theme.LIGHT;
        } 
        
        // remove all theme classes and set the new theme
        AVAILABLE_THEMES.forEach(t => {document.documentElement.classList.remove(t)});
        document.documentElement.classList.add(theme);
    }, []);

    return (
        <>
        {children}
        </>
    )
}

export default ThemeProvider;