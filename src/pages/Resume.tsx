import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowDownTrayIcon, DocumentTextIcon, DocumentIcon } from '@heroicons/react/24/outline';

const Resume = () => {
  const resumePdfPath = '/resume/Harsh_Dadiya_Resume.pdf';
  const resumeDocxPath = '/resume/Harsh_Dadiya_Resume.docx';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-10 py-12"
    >
      {/* Back to Home */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center text-sm font-bold text-textSecondary hover:text-accent transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="text-4xl md:text-5xl font-extrabold text-textPrimary mb-3 tracking-tight">My Resume</h1>
        <p className="text-lg text-textSecondary leading-relaxed">
          View, preview, and download my professional resume in your preferred format.
        </p>
      </motion.div>

      {/* Download Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* PDF Card */}
        <div className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition-all duration-300 flex flex-col">
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-red-500/10 rounded-xl shrink-0">
              <DocumentTextIcon className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-textPrimary">PDF Format</h3>
              <p className="text-sm text-textSecondary mt-1.5 leading-relaxed">
                Recommended for viewing, printing, and ATS systems.
              </p>
            </div>
          </div>
          <a
            href={resumePdfPath}
            download="Harsh_Dadiya_Resume.pdf"
            className="mt-auto inline-flex justify-center items-center gap-2 px-5 py-3 bg-accent hover:bg-accentHover text-white rounded-xl font-semibold transition-colors"
          >
            Download PDF
            <ArrowDownTrayIcon className="w-5 h-5" />
          </a>
        </div>

        {/* DOCX Card */}
        <div className="bg-surface border border-border p-6 rounded-2xl hover:border-accent/50 transition-all duration-300 flex flex-col">
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-blue-500/10 rounded-xl shrink-0">
              <DocumentIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-textPrimary">DOCX Format</h3>
              <p className="text-sm text-textSecondary mt-1.5 leading-relaxed">
                Best for editing and customization.
              </p>
            </div>
          </div>
          <a
            href={resumeDocxPath}
            download="Harsh_Dadiya_Resume.docx"
            className="mt-auto inline-flex justify-center items-center gap-2 px-5 py-3 bg-textPrimary hover:opacity-90 text-page rounded-xl font-semibold transition-all"
          >
            Download Word
          </a>
        </div>
      </motion.div>

      {/* Live Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center"
      >
        {/* Preview label */}
        <div className="inline-flex items-center gap-2 bg-surface border border-border px-5 py-2 rounded-full mb-[-1rem] z-10 relative">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-textSecondary">Preview live</span>
        </div>

        {/* PDF Preview Container */}
        <div className="w-full bg-surface rounded-2xl border border-border overflow-hidden shadow-xl">
          <div className="relative w-full h-[650px] md:h-[850px] bg-white">
            <iframe
              src={`${resumePdfPath}#toolbar=1`}
              title="Harsh Dadiya Resume PDF Preview"
              className="w-full h-full border-0"
            >
              <div className="p-8 text-center max-w-md mx-auto">
                <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Unable to display PDF preview
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Your browser does not support inline PDF viewing. Please download the resume directly.
                </p>
                <a
                  href={resumePdfPath}
                  download="Harsh_Dadiya_Resume.pdf"
                  className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accentHover text-white rounded-xl font-medium transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Download PDF Resume
                </a>
              </div>
            </iframe>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Resume;
