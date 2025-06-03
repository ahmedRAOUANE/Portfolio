"use client";

import { AVAILABLE_THEMES } from "@/utils/types/theme";
import ActionBtn from "./action-btn";
import { useState } from "react";

const ToggleTheme = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="dropdown dropdown-end w-fit flex space-x-2">
            <ActionBtn
                type="button"
                className="btn hover:bg-primary/20 transition-colors duration-300 rounded-xl px-3 py-0.5"
                onclick={() => setShow(!show)}
            >Themes</ActionBtn>

            <div id="dropdown" className={`${show ? "" : "hidden"} absolute right-10 top-8 dropdown-content dropdown-content-right dropdown dropdown-end`}>
                <ul className="menu space-y-2 p-2 shadow bg-base-100 rounded-2xl w-52 bg-primary/40 backdrop-blur border border-primary/30">
                    {AVAILABLE_THEMES.map((theme) => (
                        <li key={theme}>
                            <ActionBtn
                                type="button"
                                className="w-full items-start bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                                title={`Switch to ${theme} theme`}
                                onclick={() => {
                                    localStorage.setItem("theme", theme);
                                    AVAILABLE_THEMES.forEach(t => document.documentElement.classList.remove(t));
                                    document.documentElement.classList.add(theme);
                                }}
                            >
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </ActionBtn>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ToggleTheme;