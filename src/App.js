import { useState } from 'react';
import getLPTheme from './getLPtheme';
import { createTheme, Stack, ThemeProvider } from '@mui/material';

// components
import Header from './components/Header';
import Hero from './containers/hero/Hero';
import About from './containers/about/About';
import MyWorks from './containers/myWorks/MyWorks';
import Expertise from './containers/expertise/Expertise';
import LetsCollaborate from './containers/letsCollaborate/letsCollaborate';
import Footer from './components/Footer';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Stack spacing={10} useFlexGap sx={{ bgcolor: 'background.default' }}>
        <Hero />
        <About />
        <Expertise />
        <MyWorks />
        <LetsCollaborate />
        <Footer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
