"use client";

import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import LogoutBtn from '../logout-btn';

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
        label: 'Skills',
        href: '#skills',
    },
    // { // will be available in the future
    //     label: 'Contact',
    //     href: '#contact'
    // }
];

const NavLinks = ({ className, id }: { className?: string, id?: string }) => {
    return (
        <nav id={id} className='relative'>
            <ul className={className}>
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
                <LogoutBtn />
            </ul>
        </nav>
    )
}

const Header = () => {
    return (
        <header className="p-4 sticky top-0 left-0 right-0 z-50">
            <div className="container mx-auto p-1 lg:max-w-5xl bg-primary/5 backdrop-blur border-b border-primary/30 rounded-full shadow-lg hover:bg-primary/10 transition-all duration-300">
                <div className="flex justify-between items-center pe-1 md:pe-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
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
                    <NavLinks className="hidden md:flex gap-6 text-foreground" />

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="cursor-pointer inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300"
                            onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <NavLinks
                className="p-4 flex md:hidden flex-col gap-4 absolute right-4 left-4 top-5 z-20 bg-primary/5 backdrop-blur  border border-primary/30 rounded-3xl shadow-lg"
                id="mobile-menu"
            />
        </header>
    )
}

export default Header

