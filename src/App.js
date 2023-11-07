import Footer from './components/footer/Footer';
import Navbar from './components/header/Navbar';
import About from './containers/about/About';
import Expertise from './containers/expertise/Expertise';
import Home from './containers/home/Home';
import LetsCollaborate from './containers/letsCollaborate/letsCollaborate';
import MyWorks from './containers/myWorks/MyWorks';


function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Expertise />
      <MyWorks />
      <LetsCollaborate/>
      <Footer />
    </>
  );
}

export default App;
