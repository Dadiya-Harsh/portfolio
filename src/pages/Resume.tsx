import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowDownTrayIcon, DocumentTextIcon, DocumentIcon, EyeIcon } from '@heroicons/react/24/outline';

const Resume = () => {
  const resumePdfPath = '/resume/Harsh_Dadiya_Resume.pdf';
  const resumeDocxPath = '/resume/Harsh_Dadiya_Resume.docx';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-8 py-12"
    >
      {/* Back to Home & Navigation */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-bold text-textSecondary hover:text-accent transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-textPrimary mb-3">My Resume</h1>
        <p className="text-lg text-textSecondary">
          View, preview, and download my professional resume in your preferred format.
        </p>
      </motion.div>

      {/* Download Options Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* PDF Option Card */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-accent transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
              <DocumentTextIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-textPrimary">PDF Format</h3>
              <p className="text-sm text-textSecondary mt-1 leading-relaxed">
                Recommended for viewing, printing, and applicant tracking systems (ATS).
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={resumePdfPath}
              download="Harsh_Dadiya_Resume.pdf"
              className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download PDF
            </a>
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-4 py-3 bg-elevated border border-border hover:border-textSecondary text-textPrimary rounded-xl font-medium transition-colors"
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              Open Full
            </a>
          </div>
        </div>

        {/* Word Document Option Card */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between hover:border-accent transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <DocumentIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-textPrimary">Word Format (DOCX)</h3>
              <p className="text-sm text-textSecondary mt-1 leading-relaxed">
                Best if you need an editable document format or want to import into Word.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={resumeDocxPath}
              download="Harsh_Dadiya_Resume.docx"
              className="w-full inline-flex justify-center items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download Word File
            </a>
          </div>
        </div>
      </motion.div>

      {/* PDF Viewer / Preview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface rounded-2xl border border-border overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 bg-elevated border-b border-border flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
            <span className="ml-3 text-sm font-bold text-textSecondary">
              Live Preview: Harsh_Dadiya_Resume.pdf
            </span>
          </div>
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-textSecondary hover:text-accent hover:underline flex items-center transition-colors"
          >
            Open in New Tab
          </a>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="relative w-full h-[650px] md:h-[800px] bg-white flex flex-col justify-center items-center">
          {/* Iframe for PDF rendering */}
          <iframe
            src={`${resumePdfPath}#toolbar=1`}
            title="Harsh Dadiya Resume PDF Preview"
            className="w-full h-full border-0"
          >
            {/* Fallback for browsers that don't support PDFs in iframe */}
            <div className="p-8 text-center max-w-md">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Unable to display PDF preview
              </h4>
              <p className="text-sm text-gray-600 mb-6">
                Your browser or device does not support inline PDF viewing. Please download the resume PDF file directly to view it.
              </p>
              <a
                href={resumePdfPath}
                download="Harsh_Dadiya_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download PDF Resume
              </a>
            </div>
          </iframe>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Resume;
