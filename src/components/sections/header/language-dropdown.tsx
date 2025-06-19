"use client";

import ActionBtn from "@/components/action-btn";
import { AVAILABLE_LANGUAGES, Language, Languages } from "@/utils/types/languages";
import { Translations } from "@/utils/types/translations";
import { useRouter } from "next/navigation";

const LanguagesDropdown = ({ translations }: { translations: Translations['header'] }) => {
    const router = useRouter();

    return (
        <div id="languages-dropdown" className={`hidden absolute end-10 top-40 dropdown-content dropdown-content-right dropdown dropdown-end`}>
            <ul className="menu space-y-2 p-2 shadow bg-base-100 rounded-2xl w-52 bg-primary/5 backdrop-blur border border-primary/30">
                {AVAILABLE_LANGUAGES.map((language) => (
                    <li key={language}>
                        <ActionBtn
                            type="button"
                            className="w-full items-start bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                            title={translations.dropdown.language.list[Languages[language]]}
                            onclick={() => router.push(language as Language)}
                        >
                            {translations.dropdown.language.list[Languages[language]]}
                        </ActionBtn>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguagesDropdown