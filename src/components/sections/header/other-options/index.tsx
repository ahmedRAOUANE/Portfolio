"use client";

import ActionBtn from "@/components/action-btn"
import { Translations } from "@/utils/types/translations"
import { hide, toggle } from "../utils"
import LogoutBtn from "@/components/logout-btn"
import ResumeLink from "./resume-link";

const OtherOptions = ({ translations }: { translations: Translations['header'] }) => {
    return (
        <div id='other-options' className="hidden flex-col items-start space-y-3 absolute end-6 top-12 p-4 px-3 bg-primary/5 backdrop-blur border border-primary/30 rounded-xl shadow-lg hover:bg-primary/10 transition-all duration-300">
            <ActionBtn
                type="button"
                className="w-full justify-start px-4 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                onclick={() => {
                    toggle('theme-dropdown')
                    hide('languages-dropdown')
                }}
            >{translations.dropdown.theme.title}</ActionBtn>

            <ActionBtn
                type="button"
                className="w-full justify-start px-4 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                onclick={() => {
                    toggle('languages-dropdown')
                    hide('theme-dropdown')
                }}
            >{translations.dropdown.language.title}</ActionBtn>

            <ResumeLink translations={translations.dropdown.resume} />

            <LogoutBtn translations={translations.dropdown.logout} />
        </div>
    )
}

export default OtherOptions;