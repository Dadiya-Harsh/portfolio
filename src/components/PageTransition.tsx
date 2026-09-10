import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full h-full flex-grow flex flex-col"
            >
                {children}
            </motion.div>
            <motion.div
                initial={{ opacity: 0.5, backdropFilter: 'blur(10px)' }}
                animate={{
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                    transitionEnd: { display: "none" }
                }}
                exit={{
                    display: "block",
                    opacity: 0.5,
                    backdropFilter: 'blur(10px)'
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="fixed inset-0 bg-page pointer-events-none z-50 origin-top"
            />
        </>
    );
};

export default PageTransition;
