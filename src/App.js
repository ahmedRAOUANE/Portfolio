import Hero from './containers/hero/Hero';
import About from './containers/about/About';
import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import MyWorks from './containers/myWorks/MyWorks';
import Expertise from './containers/expertise/Expertise';
import LetsCollaborate from './containers/letsCollaborate/letsCollaborate';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <MyWorks />
      <LetsCollaborate/>
      <Footer />
    </>
  );
}

export default App;
