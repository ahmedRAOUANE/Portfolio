import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/footer';
import { isFeatureEnabled } from '@/utils/featureflags-service';
import Skills from '@/components/sections/Skills';

export default function Home() {
  const isEnabled = isFeatureEnabled('release');
  if (!isEnabled) {
    return (
      <div className="text-white flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">App Not Available</h1>
        <p className="text-lg text-gray-400">The App is currently in development</p>
        <p className="text-lg text-gray-400">we are working as fast as we can to make it work again</p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Header />

      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
