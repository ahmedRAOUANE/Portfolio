import { Translations } from '@/utils/types/translations';
import Image from 'next/image';
import React from 'react';

const About = ({ translations }: { translations: Translations }) => {
    const sectionTranslations = translations.about;
    
    return (
        <section className=" pb-12 px-4 bg-background text-foreground">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 my-6 p-6 bg-primary/5 rounded-2xl border border-primary/30 hover:bg-primary/10 transition-all duration-300">
                    <div className="bg-primary/30 hover:bg-primary/40 rounded-full flex items-center justify-center transition-all duration-300">
                        <Image
                            src="/logo.svg"
                            alt={sectionTranslations.title}
                            width={40}
                            height={40}
                            className='w-10 h-10 rounded-full'
                            priority
                            unoptimized
                        />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-foreground">{sectionTranslations.title}</h3>
                        <p className="text-primary font-medium">{sectionTranslations.subtitle}</p>
                    </div>
                </div>

                <div className='text-light space-y-4 p-6 bg-dark/5 rounded-2xl border border-primary/30 hover:bg-dark/10 transition-all duration-300'>
                    <p>{sectionTranslations.description}</p>
                </div>
            </div>
        </section>
    );
};

export default About; 