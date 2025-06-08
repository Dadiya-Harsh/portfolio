import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Navbar = ({ toggleTheme, currentTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Harsh Dadiya
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.292 8.634a1 1 0 00-1.002-.634h-2.181a.999.999 0 00-.987 1.157 6.002 6.002 0 011.002 3.125.997.997 0 00.999.988h2.181a1 1 0 00.988-1.157 6.002 6.002 0 01-1.002-3.125zM12 2a10 10 0 100 20 10 10 0 000-20zM2.083 10a8 8 0 1115.834 0 8 8 0 01-15.834 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.356 4.356a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM17 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.072 14.928a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.356-4.356a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM3 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM14.928 5.072a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/projects"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <button
                onClick={toggleTheme}
                className="block w-full text-left px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 