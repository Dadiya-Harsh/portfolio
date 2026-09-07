import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const subject = searchParams.get('subject');
    if (subject) {
      setFormData(prev => ({
        ...prev,
        message: `Hi Harsh, I'm reaching out because I am ${subject}.`
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Sending message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', { id: loadingToast });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.text();
        toast.error(`Failed to send: ${errorData}`, { id: loadingToast });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while sending your message.', { id: loadingToast });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-6xl px-4 lg:px-8 mx-auto py-12">
      <Toaster position="bottom-right" />

      <section className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-textPrimary mb-6 tracking-tight">
          Let's Build Something
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-textSecondary">
          Feel free to reach out for consulting roles, freelance opportunities, or technical inquiries.
        </motion.p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-border rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col md:flex-row"
      >
        {/* Left Side: Dark Contact Info */}
        <div className="w-full md:w-5/12 bg-textPrimary text-page p-10 md:p-12 flex flex-col">
          <h2 className="text-3xl font-bold text-page mb-8">Contact Info</h2>

          <div className="space-y-8 flex-grow">
            <a href="mailto:harshdadiya@gmail.com" className="group flex items-center gap-5">
              <div className="w-14 h-14 bg-page/10 rounded-2xl flex items-center justify-center text-page group-hover:bg-accent group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-page/70 font-medium mb-1">Email</p>
                <p className="text-page font-bold group-hover:text-accent transition-colors break-all">harshdadiya@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-page/10 rounded-2xl flex items-center justify-center text-page">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-page/70 font-medium mb-1">Location</p>
                <p className="text-page font-bold">Ahmedabad, India</p>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-0 pt-8 border-t border-page/20">
            <p className="text-sm text-page/70 font-bold tracking-widest uppercase mb-4">Connect</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/harsh-dadiya/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-page/10 rounded-xl flex items-center justify-center text-page hover:bg-[#0A66C2] hover:scale-105 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://github.com/Dadiya-Harsh" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-page/10 rounded-xl flex items-center justify-center text-page hover:bg-page hover:text-textPrimary hover:scale-105 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-10 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-textPrimary mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-elevated border-2 border-border/50 rounded-xl px-5 py-4 text-textPrimary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-medium placeholder:text-textSecondary/50"
                placeholder="What should I call you?"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-textPrimary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-elevated border-2 border-border/50 rounded-xl px-5 py-4 text-textPrimary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-medium placeholder:text-textSecondary/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-textPrimary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-elevated border-2 border-border/50 rounded-xl px-5 py-4 text-textPrimary focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all font-medium placeholder:text-textSecondary/50 resize-none"
                placeholder="How can I help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white font-bold px-6 py-4 rounded-xl hover:bg-accentHover hover:shadow-xl hover:shadow-accent/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Send Message
              <svg className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 