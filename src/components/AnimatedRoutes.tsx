import { lazy, Suspense, type ReactNode } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import RouteFallback from './RouteFallback';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Projects = lazy(() => import('../pages/Projects'));
const Contact = lazy(() => import('../pages/Contact'));
const Blog = lazy(() => import('../pages/Blog'));
const Resume = lazy(() => import('../pages/Resume'));
const CaseStudy = lazy(() => import('../pages/CaseStudy'));
const CaseStudiesIndex = lazy(() => import('../pages/CaseStudiesIndex'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Suspense sits inside PageTransition so the fade runs the same as before
// and the skeleton shows inside the page frame, not over the whole screen.
const Page = ({ children }: { children: ReactNode }) => (
    <PageTransition>
        <Suspense fallback={<RouteFallback />}>{children}</Suspense>
    </PageTransition>
);

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Page><Home /></Page>} />
                <Route path="/about" element={<Page><About /></Page>} />
                <Route path="/projects" element={<Page><Projects /></Page>} />
                <Route path="/blog" element={<Page><Blog /></Page>} />
                <Route path="/contact" element={<Page><Contact /></Page>} />
                <Route path="/resume" element={<Page><Resume /></Page>} />
                <Route path="/case-studies" element={<Page><CaseStudiesIndex /></Page>} />
                <Route path="/case-studies/:id" element={<Page><CaseStudy /></Page>} />
                <Route path="*" element={<Page><NotFound /></Page>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
