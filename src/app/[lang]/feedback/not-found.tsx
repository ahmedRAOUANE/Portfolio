
import { Language } from '@/utils/types/languages';
import { Translations } from '@/utils/types/translations';
import Link from 'next/link';
import React from 'react'
import { MdErrorOutline } from 'react-icons/md';

const NotFound = async (
    {
        translations,
        lang
    }: {
        translations: Translations,
        lang: Language
    }
) => {
    return (
        <div className="py-16 px-8 bg-background text-foreground min-h-screen w-full">
            <div className="relative w-full max-w-4xl mx-auto bg-primary/5 border border-primary rounded-xl shadow-lg p-8 space-y-4">
                <div className="w-fit shadow-lg text-danger bg-danger/10 hover:bg-danger/20 transition-colors duration-200 rounded-full mx-auto flex items-center justify-center text-9xl">
                    <MdErrorOutline />
                </div>

                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-semibold mb-3">{translations.feedback.title}</h1>
                    <p>{translations.unavailable.feature}</p>
                </div>

                <Link href={`/${lang}`} className='w-fit shadow-lg text-primary bg-primary/10 hover:bg-primary/20 transition-colors duration-200 rounded-full mx-auto flex items-center justify-center py-1 px-4 text-lg'>
                    {translations.unavailable.action.back}
                </Link>
            </div>
        </div>
    );
}

export default NotFound