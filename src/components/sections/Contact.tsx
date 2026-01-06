import React from 'react';
import SendEmailForm from '../send-email-form';
import { Translations } from '@/utils/types/translations';
import SocialLinks from '../social-links';

const Contact = ({ translations }: { translations: Translations }) => {
    const sectionTranslations = translations.contact;

    return (
        <section id='contact' className="contact-section mt-16 py-12 text-foreground">
            <div className='container p-4 mx-auto max-w-4xl flex gap-4 flex-col lg:flex-row items-start justify-center'>
                <div className='flex-1'>
                    <h2 className="text-3xl mb-4 text-primary font-bold">{sectionTranslations.title}</h2>
                    
                    <p className="text-sm mb-4 text-light p-6 bg-primary/5 backdrop-blur rounded-2xl border border-primary/30 hover:bg-primary/10 transition-all duration-300">
                        {sectionTranslations.description}
                    </p>

                    <SocialLinks className='flex gap-6 ms-6' translations={translations.footer} />
                </div>

                {/* Contact Form */}
                <SendEmailForm sectionTranslations={sectionTranslations} />
            </div>
        </section>
    );
};

export default Contact; 