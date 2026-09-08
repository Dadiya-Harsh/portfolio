import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Achievements from './pages/Achievements';
import Resume from './pages/Resume';
import CaseStudy from './pages/CaseStudy';
import CaseStudiesIndex from './pages/CaseStudiesIndex';
import { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(() => {
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
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="min-h-screen bg-page text-textPrimary antialiased transition-colors duration-300 flex flex-col">
        <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
        <main className="container mx-auto px-4 pt-4 md:pt-6 pb-12 flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/case-studies" element={<CaseStudiesIndex />} />
            <Route path="/case-studies/:id" element={<CaseStudy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 