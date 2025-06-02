"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import LogoutBtn from '../logout-btn';
import ActionBtn from '../action-btn';
import { AVAILABLE_THEMES } from '@/utils/types/theme';
import { AVAILABLE_LANGUAGES } from '@/utils/types/languages';

const headerLinks = [
    {
        label: 'About',
        href: '#about'
    },
    {
        label: 'Skills',
        href: '#skills',
    },
    {
        label: 'Projects',
        href: '#projects'
    },
    {
        label: 'Contact',
        href: '#contact'
    }
];

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

const Header = () => {
    return (
        <header className="p-4 sticky top-0 left-0 right-0 z-50">
            <div className="container relative mx-auto max-w-4xl flex justify-between items-center pe-1 md:pe-4">
                {/* Logo */}
                <div className="flex-shrink-0 lg:max-w-5xl bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300">
                    <Link
                        href="#"
                        className="text-xl font-bold bg-primary/30 hover:bg-primary/40 text-foreground rounded-full flex items-center justify-center transition-all duration-300"
                    >
                        <Image
                            src="/logo.svg"
                            alt="Logo"
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
                <NavLinks className="py-2 px-6 max-w-96 flex items-center justify-around gap-4 bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300" />

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
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </ActionBtn>
                </div>

                <OtherOptions />

                <ThemeDropdown />

                <LanguagesDropdown />
            </div>
        </header>
    )
}

const NavLinks = ({ className, id }: { className?: string, id?: string }) => {
    return (
        <nav>
            <ul id={id} className={className}>
                {headerLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className='cursor-pointer hover:text-primary transition-colors duration-300 font-medium'
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const OtherOptions = () => {
    return (
        <div id='other-options' className="hidden flex-col items-start space-y-3 absolute right-6 top-12 p-4 px-3 bg-primary/5 backdrop-blur border border-primary/30 rounded-xl shadow-lg hover:bg-primary/10 transition-all duration-300">
            <ActionBtn
                type="button"
                className="w-full justify-start px-4 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                onclick={() => {
                    toggle('theme-dropdown')
                    hide('languages-dropdown')
                }}
            >Themes</ActionBtn>

            <ActionBtn
                type="button"
                className="w-full justify-start px-4 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                onclick={() => {
                    toggle('languages-dropdown')
                    hide('theme-dropdown')
                }}
            >Languages</ActionBtn>

            <LogoutBtn />
        </div>
    )
}

const ThemeDropdown = () => {
    return (
        <div id="theme-dropdown" className={`hidden absolute right-10 top-25 dropdown-content dropdown-content-right dropdown dropdown-end`}>
            <ul className="menu space-y-2 p-2 shadow bg-base-100 rounded-2xl w-52 bg-primary/5 backdrop-blur border border-primary/30">
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
    )
}

const LanguagesDropdown = () => {
    return (
        <div id="languages-dropdown" className={`hidden absolute right-10 top-36 dropdown-content dropdown-content-right dropdown dropdown-end`}>
            <ul className="menu space-y-2 p-2 shadow bg-base-100 rounded-2xl w-52 bg-primary/5 backdrop-blur border border-primary/30">
                {AVAILABLE_LANGUAGES.map((language) => (
                    <li key={language}>
                        <ActionBtn
                            type="button"
                            className="w-full items-start bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg"
                            title={`Switch to ${language} language`}
                            onclick={() => {
                                console.log(`Switching to ${language} language`)
                            }}
                        >
                            {language.charAt(0).toUpperCase() + language.slice(1)}
                        </ActionBtn>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Header

