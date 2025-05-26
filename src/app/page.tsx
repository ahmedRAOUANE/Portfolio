import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/footer';
import Skills from '@/components/sections/Skills';

export default function Home() {
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
