"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const headerLinks = [
    {
        label: 'About',
        href: '#about'
    },
    {
        label: 'Projects',
        href: '#projects'
    },
    {
        label: 'Contact',
        href: '#contact'
    }
]

const NavLinks = ({ className, id }: { className?: string, id?: string }) => {
    return (
        <nav id={id} className='hidden md:flex'>
            <ul className={className}>
                {headerLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary">{link.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
const Header = () => {
    return (
        <header className="p-4 sticky top-0 left-0 right-0 z-50">
            <div className="container mx-auto p-1 lg:max-w-5xl bg-dark backdrop-blur border-b border-[var(--foreground)] rounded-full shadow-lg">
                <div className="flex justify-between items-center pe-1 md:pe-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="#" className="text-xl font-bold bg-primary rounded-full flex items-center justify-center">
                            <Image src="/logo.svg" alt="Logo" width={32} height={32} className='w-10 h-10 rounded-full' />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <NavLinks className="hidden md:flex gap-4" />

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="cursor-pointer inline-flex items-center justify-center p-2 rounded-lg text-primary"
                            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <NavLinks className="p-3 flex flex-col gap-4 md:hidden absolute right-0 left-0 top-16 z-20 animate-fade-out bg-light backdrop-blur border-b border-[var(--foreground)] rounded-3xl shadow-lg" id="mobile-menu" />
            </div>
        </header>
    )
}

export default Header