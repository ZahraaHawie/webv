'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header menu (same as industries) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div ref={headerRef} className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.h1 
              className="font-bold tracking-wider text-black cursor-pointer" 
              style={{ fontFamily: 'Lausanne', fontSize: '16px', letterSpacing: '0.2em' }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              TOMORROW
            </motion.h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {['Industries', 'Services', 'Work', 'Ideas', 'Profile'].map((item) => (
              <motion.button key={item}
                className={`transition-colors duration-200 ${item==='Industries' ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 300 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
            <span className="hover:text-black cursor-pointer">Sign In</span>
            <span className="mx-2">|</span>
            <span className="hover:text-black cursor-pointer">Request Proposal</span>
          </div>

          <motion.button
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
            aria-label="Toggle menu"
          >
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </motion.button>
        </div>
      </motion.div>

      {/* Body */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-24">
        <div className="max-w-[1500px] mx-auto px-1 md:px-2">
          {/* Page title */}
          <h1 className="text-black mb-10 md:mb-12" style={{ fontFamily: 'Lausanne', fontWeight: 450, letterSpacing: '-0.04em', lineHeight: 0.9, fontSize: 'clamp(44px,8vw,120px)' }}>
            Let's Grow Together
          </h1>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left rail */}
            <div className="md:col-span-2">
              <div className="h-full min-h-[520px] rounded-2xl bg-black p-5 flex items-start">
                <div className="flex items-center gap-3" style={{ fontFamily: 'Lausanne' }}>
                  <span className="inline-block w-2 h-2 rounded-full bg-white" />
                  <span className="text-white text-base">Fill the form</span>
                </div>
              </div>
            </div>

            {/* Middle visual */}
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden h-[400px] md:h-[540px] lg:h-[540px] bg-[#FFE34D] flex items-center justify-center">
                <img
                  src="https://pub-411c527512cc4192888c7693de42f3f6.r2.dev/Social.037.jpeg"
                  alt="Contact visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right form */}
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6 h-[400px] md:h-[540px] lg:h-[540px]">
                {/* To chip */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-black/70 text-sm" style={{ fontFamily: 'Lausanne' }}>To:</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-black text-sm" style={{ fontFamily: 'Lausanne' }}>
                    hello@thetomorrow.io
                  </span>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="sr-only">Your Name</label>
                    <input type="text" placeholder="Your Name*" className="w-full bg-transparent border-0 border-b border-zinc-300 focus:border-black focus:outline-none h-12 px-0 text-black placeholder:text-zinc-400" style={{ fontFamily: 'Lausanne', fontSize: 16 }} />
                  </div>
                  <div>
                    <label className="sr-only">Email</label>
                    <input type="email" placeholder="Email*" className="w-full bg-transparent border-0 border-b border-zinc-300 focus:border-black focus:outline-none h-12 px-0 text-black placeholder:text-zinc-400" style={{ fontFamily: 'Lausanne', fontSize: 16 }} />
                  </div>
                  <div>
                    <label className="sr-only">Subject</label>
                    <input type="text" placeholder="Subject*" className="w-full bg-transparent border-0 border-b border-zinc-300 focus:border-black focus:outline-none h-12 px-0 text-black placeholder:text-zinc-400" style={{ fontFamily: 'Lausanne', fontSize: 16 }} />
                  </div>
                  <div>
                    <label className="sr-only">Your Message</label>
                    <textarea placeholder="Your Message" className="w-full bg-transparent border-0 border-b border-zinc-300 focus:border-black focus:outline-none min-h-[120px] px-0 py-3 text-black placeholder:text-zinc-400" style={{ fontFamily: 'Lausanne', fontSize: 16 }} />
                  </div>

                  <button type="button" className="w-full h-14 rounded-xl bg-black text-white flex items-center justify-between px-5 hover:opacity-90 transition-opacity" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 600 }}>
                    <span>Send</span>
                    <span className="text-xl">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


