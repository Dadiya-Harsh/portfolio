import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserIcon, EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, CursorArrowRaysIcon, ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

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

      <section className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-accent font-extrabold tracking-[0.2em] uppercase text-sm mb-4">Get In Touch</p>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold text-textPrimary mb-6 tracking-tight">
          Let's Build Something
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-[17px] md:text-lg text-textSecondary font-medium leading-relaxed max-w-2xl mx-auto">
          I'm always open to discussing new opportunities, interesting ideas, or potential collaborations in AI and open source.
        </motion.p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-surface border border-border rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row mb-16"
      >
        {/* Left Side: Dark Contact Info */}
        <div className="w-full md:w-[45%] bg-[#0a0a0a] text-white p-10 md:p-14 flex flex-col relative overflow-hidden">
          {/* Subtle glowing orange curve bottom right */}
          <div className="absolute -bottom-48 -right-48 w-[400px] h-[400px] border-[2px] border-transparent border-t-accent/70 border-l-accent/70 rounded-full shadow-[-20px_-20px_120px_rgba(224,78,24,0.15)] pointer-events-none" />

          <p className="text-white/50 text-xs font-extrabold tracking-widest uppercase mb-3 relative z-10">Contact</p>
          <h2 className="text-4xl font-extrabold text-white mb-6 relative z-10">Contact Info</h2>
          <p className="text-white/70 leading-relaxed font-medium mb-12 relative z-10 max-w-sm">
            Have a project in mind? Want to collaborate?<br />I'd love to hear from you.
          </p>

          <div className="space-y-6 flex-grow relative z-10">
            <a href="mailto:harshdadiya@gmail.com" className="group flex items-center gap-5">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <EnvelopeIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/50 font-medium mb-1 tracking-wide">Email</p>
                <p className="text-white font-medium group-hover:text-accent transition-colors break-all">harshdadiya@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-white/50 font-medium mb-1 tracking-wide">Location</p>
                <p className="text-white font-medium">Ahmedabad, India</p>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-24 pt-8 border-t border-white/10 relative z-10">
            <p className="text-xs text-white/50 font-extrabold tracking-widest uppercase mb-5">Find Me Elsewhere</p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/harsh-dadiya/" target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[140px] px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 text-white/90 hover:text-white transition-all group">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                <span className="font-medium text-sm">LinkedIn</span>
                <ArrowRightIcon className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
              <a href="https://github.com/Dadiya-Harsh" target="_blank" rel="noopener noreferrer" className="flex-1 max-w-[140px] px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center gap-2 text-white/90 hover:text-white transition-all group">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                <span className="font-medium text-sm">GitHub</span>
                <ArrowRightIcon className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            {/* Handwritten Note */}
            <div className="mt-16 rotate-[-6deg] opacity-60 pl-2">
              <span style={{ fontFamily: 'Caveat, cursive' }} className="text-xl">Good ideas<br />build better tomorrows.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] p-10 md:p-14 bg-surface">
          <div className="mb-10">
            <p className="text-xs font-extrabold tracking-widest text-textSecondary uppercase mb-3">Send A Message</p>
            <h2 className="text-4xl font-extrabold text-textPrimary mb-3 tracking-tight">Drop a Message</h2>
            <p className="text-textSecondary font-medium">Fill out the form and I'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-textPrimary mb-2">Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-textSecondary" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-page border-2 border-border/60 hover:border-border rounded-xl pl-11 pr-4 py-3.5 text-textPrimary focus:outline-none focus:border-accent focus:drop-shadow-[0_4px_16px_rgba(224,78,24,0.15)] transition-all font-medium placeholder:text-textSecondary/50 placeholder:font-normal"
                  placeholder="Your name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-textPrimary mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-textSecondary" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-page border-2 border-border/60 hover:border-border rounded-xl pl-11 pr-4 py-3.5 text-textPrimary focus:outline-none focus:border-accent focus:drop-shadow-[0_4px_16px_rgba(224,78,24,0.15)] transition-all font-medium placeholder:text-textSecondary/50 placeholder:font-normal"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-textPrimary mb-2">Message</label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-textSecondary" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-page border-2 border-border/60 hover:border-border rounded-xl pl-11 pr-4 py-3.5 text-textPrimary focus:outline-none focus:border-accent focus:drop-shadow-[0_4px_16px_rgba(224,78,24,0.15)] transition-all font-medium placeholder:text-textSecondary/50 placeholder:font-normal resize-none"
                  placeholder="Tell me about your project, idea, or just say hi..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-accent to-[#ef6224] text-white font-bold px-6 py-4 rounded-xl shadow-[0_8px_20px_-8px_rgba(224,78,24,0.8)] hover:shadow-[0_12px_24px_-8px_rgba(224,78,24,0.9)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45 mb-1 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
              Send Message
            </button>
          </form>
        </div>
      </motion.div>

      {/* Footer Indicator */}
      <div className="flex items-center justify-center gap-4 text-textSecondary/60 mt-12 mb-8">
        <div className="h-[1px] w-12 bg-border"></div>
        <CursorArrowRaysIcon className="w-5 h-5 opacity-70" />
        <span className="text-sm font-medium">Looking forward to building together.</span>
        <div className="h-[1px] w-12 bg-border"></div>
      </div>
    </div>
  );
};

export default Contact; 