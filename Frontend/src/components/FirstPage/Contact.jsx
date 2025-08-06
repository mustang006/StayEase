// components/Contact.jsx
import { useState } from 'react';
import { classNames } from '../../utils/classNames'; // ✅ utils/classNames.js path
import { ChatIcon } from './../icons/ChatIcon';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#5A80E9] rounded-full flex items-center justify-center shadow-lg shadow-[#5A80E9]/40 contact-pulse"
      >
        <ChatIcon className="w-8 h-8 text-white" />
      </button>

      <div 
        className={classNames(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div 
          onClick={(e) => e.stopPropagation()}
          className={classNames(
            "contact-form-container w-full max-w-md rounded-2xl bg-[#1A1B2E]/90 backdrop-blur-2xl transition-all duration-300 ease-in-out",
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
        >
          <div className="p-8 relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white text-3xl transition-colors">&times;</button>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Get in Touch</h2>
            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#C5C8D7]">Name</label>
                <input type="text" id="name" className="form-input" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#C5C8D7]">Email</label>
                <input type="email" id="email" className="form-input" placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-[#C5C8D7]">Message</label>
                <textarea id="message" rows="5" className="form-input resize-none" placeholder="How can we help?"></textarea>
              </div>
              <div className="mt-4">
                <button type="submit" className="submit-button w-full p-3 bg-[#5A80E9] text-white font-bold rounded-lg transition-all hover:scale-105 active:scale-100">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
