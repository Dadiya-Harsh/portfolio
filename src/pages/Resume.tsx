import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowDownTrayIcon, DocumentTextIcon, DocumentIcon, EyeIcon } from '@heroicons/react/24/outline';
import { fadeInUp, fadeIn } from '../utils/animations';

const Resume = () => {
  const resumePdfPath = '/resume/Harsh_Dadiya_Resume.pdf';
  const resumeDocxPath = '/resume/Harsh_Dadiya_Resume.docx';

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-5xl mx-auto space-y-8 px-4 py-4"
    >
      {/* Back to Home & Navigation */}
      <motion.div variants={fadeInUp} className="flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div variants={fadeInUp} className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">My Resume</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          View, preview, and download my professional resume in your preferred format.
        </p>
      </motion.div>

      {/* Download Options Grid */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* PDF Option Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
              <DocumentTextIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">PDF Format</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Recommended for viewing, printing, and applicant tracking systems (ATS).
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={resumePdfPath}
              download="Harsh_Dadiya_Resume.pdf"
              className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-md shadow-red-500/10"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download PDF
            </a>
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-colors"
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              Open Full
            </a>
          </div>
        </div>

        {/* Word Document Option Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <DocumentIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Word Format (DOCX)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Best if you need an editable document format or want to import into Word.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={resumeDocxPath}
              download="Harsh_Dadiya_Resume.docx"
              className="w-full inline-flex justify-center items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-md shadow-blue-500/10"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Download Word File
            </a>
          </div>
        </div>
      </motion.div>

      {/* PDF Viewer / Preview Section */}
      <motion.div
        variants={fadeIn}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-400"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
            <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
              Live Preview: Harsh_Dadiya_Resume.pdf
            </span>
          </div>
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            Open in New Tab
          </a>
        </div>

        {/* Embedded Iframe Preview */}
        <div className="relative w-full h-[650px] md:h-[800px] bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
          {/* Iframe for PDF rendering */}
          <iframe
            src={`${resumePdfPath}#toolbar=1`}
            title="Harsh Dadiya Resume PDF Preview"
            className="w-full h-full border-0"
          >
            {/* Fallback for browsers that don't support PDFs in iframe */}
            <div className="p-8 text-center max-w-md">
              <DocumentTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                Unable to display PDF preview
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your browser or device does not support inline PDF viewing. Please download the resume PDF file directly to view it.
              </p>
              <a
                href={resumePdfPath}
                download="Harsh_Dadiya_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
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
