import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Skills from '@/components/sections/Skills';
import { loadTranslation } from '@/utils/data/load-translations';
import { Language } from '@/utils/types/languages';
import Feedback from '@/components/sections/feedback';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const translations = await loadTranslation(lang as Language);

  return (
    <div className="bg-background">
      <Header translations={translations} />

      <main>
        <About translations={translations} />
        <Skills translations={translations} />
        <Projects translations={translations} />
        <Contact translations={translations} />
        <Feedback translations={translations} />
      </main>
      
      <Footer translations={translations} />
    </div>
  );
}
