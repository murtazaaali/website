import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Benefits from './components/Benefits';
import Solutions from './components/Solutions';
import Statistics from './components/Statistics';
import Integrations from './components/Integrations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BookDemo from './components/BookDemo';
import './App.css';

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const handleOpenDemo = () => {
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navbar onBookDemo={handleOpenDemo} />
      <Hero onBookDemo={handleOpenDemo} />
      <Box 
        sx={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.1), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          },
          '& section:not(.preserve-bg)': {
            background: 'transparent !important'
          },
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <WhyChooseUs />
          <Benefits />
          <Solutions />
          <Statistics className="preserve-bg" />
          <Integrations />
          <Contact />
          <Footer className="preserve-bg" />
        </Box>
      </Box>
      <WhatsAppButton />
      <BookDemo open={isDemoOpen} onClose={handleCloseDemo} />
    </Box>
  );
}

export default App;
