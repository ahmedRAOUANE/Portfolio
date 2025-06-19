import { FiFolder, FiMail, FiUser, FiZap } from 'react-icons/fi';

export const headerLinks = [
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
    }
] as const;

export const toggle = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.toggle('hidden');
        targetElement.classList.toggle('flex');
    }
}

export const hide = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.classList.add('hidden');
    }
}