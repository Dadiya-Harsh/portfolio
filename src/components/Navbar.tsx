import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Navbar = ({ toggleTheme, currentTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-page/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tight text-textPrimary hover:text-accent transition-colors">
            Harsh Dadiya
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                    ? 'text-accent bg-accent/10'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-elevated'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="w-px h-5 bg-border mx-2"></div>

            <Link
              to="/resume"
              className="px-5 py-2 bg-accent text-white rounded-full hover:bg-accentHover transition-colors text-sm font-medium ml-2 shadow-sm"
            >
              Resume
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 ml-4 rounded-full text-textSecondary hover:bg-elevated hover:text-textPrimary transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-textSecondary hover:text-textPrimary"
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
          <div className="md:hidden mt-4 pb-4 bg-surface rounded-2xl border border-border p-4 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium ${isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-textSecondary hover:text-textPrimary hover:bg-elevated'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                to="/resume"
                className="block px-4 py-3 bg-accent text-white rounded-xl hover:bg-accentHover transition-colors text-center font-medium mt-4"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </Link>
              <button
                onClick={toggleTheme}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-elevated text-textSecondary hover:text-textPrimary transition-colors font-medium mt-2 flex items-center justify-between"
              >
                <span>{currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                {currentTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 