import { Link } from 'react-router-dom';

// TODO (Phase 7): call the document meta hook here with noindex, so search engines skip this page.
const NotFound = () => {
  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
        <p className="text-[120px] md:text-[160px] font-extrabold tracking-tighter leading-none text-accent" aria-hidden="true">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-textPrimary">
          This page doesn't exist
        </h1>
        <p className="text-[17px] text-textSecondary leading-relaxed">
          The link might be old, or there's a typo in the address.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <Link
            to="/"
            className="bg-accent text-white px-6 py-3.5 rounded-xl hover:bg-accentHover hover:shadow-lg active:scale-95 transition-all font-bold"
          >
            Back to home
          </Link>
          <Link
            to="/case-studies"
            className="px-6 py-3.5 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border"
          >
            Case studies
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3.5 rounded-xl text-textPrimary hover:bg-elevated transition-colors font-bold border-2 border-border"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
