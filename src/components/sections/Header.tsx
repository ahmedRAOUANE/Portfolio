"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import LogoutBtn from '../logout-btn';
import ActionBtn from '../action-btn';
import { AVAILABLE_THEMES } from '@/utils/types/theme';
import { AVAILABLE_LANGUAGES, Language, Languages } from '@/utils/types/languages';
import { Translations } from '@/utils/types/translations';
import { useRouter } from 'next/navigation';
import { IoMdHome } from 'react-icons/io';
import { FaBookOpen } from 'react-icons/fa';
import { FaDiagramProject } from 'react-icons/fa6';
import { MdContactSupport } from 'react-icons/md';

const headerLinks = [
    {
        label: 'home' as const,
        href: '#',
        icon: <IoMdHome />
    },
    {
        label: 'about' as const,
        href: '#about',
        icon: <FaBookOpen />
    },
    {
        label: 'projects' as const,
        href: '#projects',
        icon: <FaDiagramProject />
    },
    {
        label: 'contact' as const,
        href: '#contact',
        icon: <MdContactSupport />
    }
] as const;

const toggle = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.toggle('hidden');
        targetElement.classList.toggle('flex');
    }
}

const hide = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.add('hidden');
    }
}

const Header = ({ translations }: { translations: Translations }) => {
    const sectionTranslations = translations.header;

    return (
        <header className="p-4 sticky top-0 left-0 right-0 z-50">
            <div className="container relative mx-auto max-w-4xl flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0 lg:max-w-5xl bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300">
                    <Link
                        href="#"
                        className="text-xl font-bold bg-primary/30 hover:bg-primary/40 text-foreground rounded-full flex items-center justify-center transition-all duration-300"
                    >
                        <Image
                            src="/logo.svg"
                            alt={sectionTranslations?.logo?.title}
                            width={40}
                            height={40}
                            className='w-10 h-10 rounded-full'
                            priority
                            unoptimized
                            blurDataURL='/logo.svg'
                            placeholder='blur'
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <NavLinks
                    className="py-2 px-6 flex items-center justify-around gap-6 bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300"
                    translations={sectionTranslations}
                />

                {/* Options btn */}
                <div className="lg:max-w-5xl bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300">
                    <ActionBtn
                        type="button"
                        className="rounded-full text-primary"
                        onclick={() => {
                            toggle('other-options')
                            hide('theme-dropdown')
                            hide('languages-dropdown')
                        }}
                    >
                        <span className="sr-only">{sectionTranslations?.dropdown?.title}</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </ActionBtn>
                </div>

                <OtherOptions translations={sectionTranslations} />

                <ThemeDropdown translations={sectionTranslations} />

                <LanguagesDropdown translations={sectionTranslations} />
            </div>
        </header>
    )
}

const NavLinks = ({ className, id, translations }: {
    className?: string,
    id?: string,
    translations: Translations['header']
}) => {
    return (
        <nav>
            <ul id={id} className={className}>
                {headerLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className='cursor-pointer text-foreground hover:text-primary transition-colors duration-300 font-medium flex items-center gap-2'
                        >
                            <span className="inline-block text-xl">{link.icon}</span>
                            <span className='cursor-pointer hidden md:block'>{translations.nav[link.label]}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

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

            <LogoutBtn translations={translations.dropdown.logout} />
        </div>
    )
}

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

export default Header

