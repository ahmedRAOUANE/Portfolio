import React from 'react';
import { Translations } from '@/utils/types/translations';
import SocialLinks from '../social-links';

const Footer = ({ translations }: { translations: Translations }) => {
  const sectionTranslations = translations.footer;

  return (
    <footer className="py-8 px-4 bg-background text-foreground border-t border-primary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-light">
            <span className="font-semibold text-primary">{sectionTranslations.title} </span>
            {sectionTranslations.copyright}
          </div>

          <SocialLinks className='flex gap-6' translations={translations.footer} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;