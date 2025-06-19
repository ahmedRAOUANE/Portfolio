"use client";

import ActionBtn from "@/components/action-btn"
import { hide, toggle } from "./utils";
import { Translations } from "@/utils/types/translations";
import { IoMenu } from "react-icons/io5";

const OptionsBtn = ({ translations }: { translations: Translations['header'] }) => {
    const handleToggle = () => {
        toggle('other-options')
        hide('theme-dropdown')
        hide('languages-dropdown')
    }

    return (
        <div className="lg:max-w-5xl bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300">
            <ActionBtn
                type="button"
                className="rounded-full text-primary"
                onclick={handleToggle}
            >
                <span className="sr-only">{translations?.dropdown.title}</span>
                
                <IoMenu className="h-6 w-6" fill="currentColor" />
            </ActionBtn>
        </div>
    )
}

export default OptionsBtn