import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import Resume from '../pages/Resume';
import CaseStudy from '../pages/CaseStudy';
import CaseStudiesIndex from '../pages/CaseStudiesIndex';
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
                <Route path="/case-studies" element={<PageTransition><CaseStudiesIndex /></PageTransition>} />
                <Route path="/case-studies/:id" element={<PageTransition><CaseStudy /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
