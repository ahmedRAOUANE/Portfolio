import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer className='container mx-auto p-4 text-sm-foreground-center' />
    </div>
  );
}
