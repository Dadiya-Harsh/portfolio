import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <MotionConfig reducedMotion="user">
    <Router>
      <div className="min-h-screen bg-page text-textPrimary antialiased transition-colors duration-300 flex flex-col">
        <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
        <main className="pt-4 md:pt-6 pb-12 flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
    </MotionConfig>
  );
}

export default App; 