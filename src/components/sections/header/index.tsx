import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { Translations } from '@/utils/types/translations';
import OtherOptions from './other-options';
import ThemeDropdown from './theme-dropdown';
import LanguagesDropdown from './language-dropdown';
import OptionsBtn from './options-btn';
import { FiFolder, FiMail, FiMessageCircle, FiUser, FiZap } from 'react-icons/fi';

const headerLinks = [
    {
        label: 'about' as const,
        href: '#about',
        icon: <FiUser />
    },
    {
        label: 'skills' as const,
        href: '#skills',
        icon: <FiZap />
    },
    {
        label: 'projects' as const,
        href: '#projects',
        icon: <FiFolder />
    },
    {
        label: 'contact' as const,
        href: '#contact',
        icon: <FiMail />
    },
    // {
    //     label: 'feedback' as const,
    //     href: '#feedback',
    //     icon: <FiMessageCircle />
    // }
] as const;

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
                <OptionsBtn translations={sectionTranslations} />

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
                            aria-label={translations.nav[link.label]}
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

export default Header

