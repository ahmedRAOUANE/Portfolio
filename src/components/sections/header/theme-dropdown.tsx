"use client";

import ActionBtn from "@/components/action-btn";
import { AVAILABLE_THEMES } from "@/utils/types/theme";
import { Translations } from "@/utils/types/translations";

const ThemeDropdown = ({ translations }: { translations: Translations['header'] }) => {
    return (
        <div id="theme-dropdown" className={`hidden absolute end-10 top-28 dropdown-content dropdown-content-right dropdown dropdown-end`}>
            <ul className="menu space-y-2 p-2 shadow bg-base-100 rounded-2xl w-52 bg-primary/5 backdrop-blur border border-primary/30">
                {AVAILABLE_THEMES.map((theme) => (
                    <li key={theme}>
                        <ActionBtn
                            type="button"
                            className="w-full items-start bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                            title={translations.dropdown.theme.list[theme]}
                            onclick={() => {
                                localStorage.setItem("theme", theme);
                                AVAILABLE_THEMES.forEach(t => document.documentElement.classList.remove(t));
                                document.documentElement.classList.add(theme);
                            }}
                        >
                            {translations.dropdown.theme.list[theme]}
                        </ActionBtn>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ThemeDropdown;