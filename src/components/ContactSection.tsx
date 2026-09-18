import React, { useState } from 'react';
import { ArrowUp, Check, ExternalLink, Mail, ArrowUpRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
    />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const targetEmail = "safrisam.id09@gmail.com";

  const handleCopyEmail = () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(targetEmail).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }).catch(() => {
          fallbackCopy(targetEmail);
        });
      } else {
        fallbackCopy(targetEmail);
      }
    } catch {
      fallbackCopy(targetEmail);
    }
  };

  const fallbackCopy = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
    document.body.removeChild(el);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage('Please fill in all fields.');
      return;
    }

    setStatusMessage('');
    setIsSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact"
      className="bg-[#0C0C0C] text-[#D7E2EA] pt-24 sm:pt-32 md:pt-40 pb-12 px-6 sm:px-10 md:px-14 relative z-20 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between">
        
        {/* Main Header & Direct Callout */}
        <div className="flex flex-col gap-6 sm:gap-8 pb-16 sm:pb-20 border-b border-white/10">
          <FadeIn delay={0} y={20}>
            <span className="text-white/60 uppercase tracking-widest text-xs font-semibold">
              Get in Touch
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2 
              className="text-5xl sm:text-7xl md:text-[100px] font-medium tracking-tight leading-none text-[#D7E2EA]"
            >
              Let's Talk.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <p className="text-white/60 font-light text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              Have an idea, project, or fullstack engineering role you'd like to discuss? Reach out directly via email or drop a message below.
            </p>
          </FadeIn>

          {/* Big Editorial Email Link */}
          <FadeIn delay={0.2} y={20} className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 flex-wrap">
            <a 
              href={`mailto:${targetEmail}`}
              className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#D7E2EA] hover:text-white transition-colors duration-300 pb-2 border-b border-white/20 hover:border-white/60"
            >
              {targetEmail}
            </a>

            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent text-xs font-medium uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>

              <a
                href={`mailto:${targetEmail}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C] text-xs font-medium uppercase tracking-widest hover:bg-transparent hover:text-[#D7E2EA] transition-colors"
              >
                <span>Write Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Middle Section: Clean Two-Column Layout (Form on left, Social & Info on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-16 sm:py-24 border-b border-white/10">
          
          {/* Form Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Send a Message
            </h3>

            {isSubmitted ? (
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col gap-4">
                <h4 className="text-lg font-semibold text-white">Message Ready</h4>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Thank you, <span className="text-white font-medium">{name}</span>. You can send this directly via your email client or copy the address above.
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <a
                    href={`mailto:${targetEmail}?subject=${encodeURIComponent(`Project Inquiry from ${name}`)}&body=${encodeURIComponent(message)}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#D7E2EA] bg-[#D7E2EA] text-[#0C0C0C] text-xs font-medium uppercase tracking-widest hover:bg-transparent hover:text-[#D7E2EA] transition-colors"
                  >
                    Open Mail App
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 bg-transparent text-xs font-medium uppercase tracking-widest text-white hover:bg-white/10 transition-colors"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {statusMessage && (
                  <p className="text-xs text-rose-400 font-medium">{statusMessage}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-medium">
                      Name
                    </label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-medium">
                      Email
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D7E2EA] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-medium">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, goals, or questions..."
                    className="w-full bg-transparent border-b border-white/20 py-3 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-[#D7E2EA] transition-colors resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#D7E2EA] text-[#D7E2EA] text-xs font-medium uppercase tracking-widest hover:bg-[#D7E2EA] hover:text-[#0C0C0C] transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Social & Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:pl-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60">
                Connect
              </h3>

              <div className="flex flex-col gap-4">
                <a 
                  href="https://github.com/UDIN-K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl border border-white/10 hover:border-white/30 bg-transparent flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <GithubIcon className="w-5 h-5 text-white/70 group-hover:text-white" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-white/90 group-hover:text-white">
                        GitHub
                      </span>
                      <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                        github.com/UDIN-K
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </a>

                <a 
                  href={`mailto:${targetEmail}`}
                  className="p-6 rounded-2xl border border-white/10 hover:border-white/30 bg-transparent flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-white/70 group-hover:text-white" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-white/90 group-hover:text-white">
                        Email
                      </span>
                      <span className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                        {targetEmail}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm text-white/50 font-light leading-relaxed">
              <p className="text-white/80 font-medium">Location & Availability</p>
              <p>Based in Indonesia • Working with clients and teams worldwide.</p>
              <p>Fullstack web development, Android engineering, and cloud platforms.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} UDINK. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D7E2EA] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
