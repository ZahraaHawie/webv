'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WorkLanding() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header menu (shared styling) */}
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
                className={`transition-colors duration-200 ${item==='Work' ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
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

      {/* Mobile menu overlay */}
      <motion.div
        className={`fixed inset-0 z-[50] bg-white md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-20 px-4">
          <nav className="space-y-6">
            {['Industries', 'Services', 'Work', 'Ideas', 'Profile'].map((item) => (
              <motion.button
                key={item}
                className={`block w-full text-left text-2xl ${item==='Work' ? 'text-black' : 'text-zinc-500'}`}
                style={{ fontFamily: 'Lausanne', fontWeight: 300 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <button className="block text-zinc-700 mb-2" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>
              Sign In
            </button>
            <button className="block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>
              Request Proposal
            </button>
          </div>
        </div>
      </motion.div>

      {/* Ministry of Municipal & Rural Affairs Section */}
      <section className="w-screen pt-32 pb-16 bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* 4 Column Layout */}
        <div className="px-8 overflow-hidden">
          <div className="flex gap-8 mb-8">
            {/* Column 1 - Text Content */}
            <div className="space-y-8 w-64 flex-shrink-0">
              {/* Scope */}
              <div>
                <h3 className="text-black text-lg mb-4" style={{ fontFamily: 'Lausanne', fontWeight: 500, marginTop: '200px' }}>
                  Scope
                </h3>
                <div className="space-y-2">
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Brand Identity</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Game UI/UX</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Media Campaign</p>
                </div>
              </div>

              {/* Scroll Down */}
              <div className="flex items-center gap-2">
                <span className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 14 }}>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l3 3 3-3M7 6l3 3 3-3" />
                </svg>
              </div>
            </div>

            <div>
              {/* 3 Media Boxes Container */}
              <div style={{ marginTop: '60px' }}>
                {/* Project Title - Positioned directly above the boxes */}
                <div className="mb-6">
                  <h1 className="text-black text-4xl md:text-5xl lg:text-6xl text-left" style={{ fontFamily: 'Lausanne', fontSize: '40px', fontWeight: 400, letterSpacing: '-0.02em' }}>
                    Ministry of Municipal & Rural Affairs, KSA
                  </h1>
                </div>
                
                <div className="flex overflow-hidden">
              {/* First Box - Video */}
              <div className="overflow-hidden" style={{ height: '340px', width: '482px' }}>
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/media/work-megamenu1.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Second Box - Image */}
              <div className="overflow-hidden" style={{ height: '340px', width: '482px' }}>
                <img src="/media/work-megamenu2.jpg" alt="Work showcase" className="w-full h-full object-cover" />
              </div>

              {/* Third Box - Video */}
              <div className="overflow-hidden" style={{ height: '340px', width: '482px', marginRight: '1px' }}>
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src="/media/work-megamenu3.mp4" type="video/mp4" />
                </video>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Project Section */}
      <section className="w-screen pt-32 pb-16 bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* 4 Column Layout */}
        <div className="px-8 overflow-hidden">
          <div className="flex gap-8 mb-8">
            {/* Column 1 - Text Content */}
            <div className="space-y-8 w-64 flex-shrink-0">
              {/* Scope */}
              <div>
                <h3 className="text-black text-lg mb-4" style={{ fontFamily: 'Lausanne', fontWeight: 500, marginTop: '200px' }}>
                  Scope
                </h3>
                <div className="space-y-2">
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Digital Strategy</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Web Development</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>User Experience</p>
                </div>
              </div>

              {/* Scroll Down */}
              <div className="flex items-center gap-2">
                <span className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 14 }}>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l3 3 3-3M7 6l3 3 3-3" />
                </svg>
              </div>
            </div>

            <div>
              {/* 3 Media Boxes Container */}
              <div style={{ marginTop: '60px' }}>
                {/* Second Project Title - Positioned directly above the boxes */}
                <div className="mb-6">
                  <h1 className="text-black text-4xl md:text-5xl lg:text-6xl text-left" style={{ fontFamily: 'Lausanne', fontSize: '40px', fontWeight: 400, letterSpacing: '-0.02em' }}>
                    Juthoor Wellness
                  </h1>
                </div>
                
                <div className="flex overflow-hidden">
                {/* First Box - Video */}
                <motion.div
  className="overflow-hidden"
  style={{
    height: '340px',
    width: '482px',
  }}
  initial={{ opacity: 0, y: -150 }}          // Start 150px above, fully transparent
  whileInView={{ opacity: 1, y: 0 }}         // Animate down and fade in
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],                // Ease similar to cubic-bezier(0.22, 1, 0.36, 1)
    delay: 0,                                // No delay for first element
  }}
  viewport={{ once: true, amount: 0.3 }}     // Trigger when 30% visible
>
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  >
    <source src="/media/juthoor_video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</motion.div>


                  {/* Second Box - Image */}
                <motion.div
                  className="overflow-hidden"
                  style={{
                    height: '340px',
                    width: '482px',
                  }}
                  initial={{ opacity: 0, y: -150 }}          // Start 150px above, fully transparent
                  whileInView={{ opacity: 1, y: 0 }}         // Animate down and fade in
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],                // Ease similar to cubic-bezier(0.22, 1, 0.36, 1)
                    delay: 0.2,                              // 0.2s delay for second element
                  }}
                  viewport={{ once: true, amount: 0.3 }}     // Trigger when 30% visible
                >
                  <img src="/media/juthoor2.jpg" alt="Work showcase" className="w-full h-full object-cover" />
                </motion.div>

                {/* Third Box - Video */}
                <motion.div
                  className="overflow-hidden"
                  style={{
                    height: '340px',
                    width: '482px',
                    marginRight: '1px'
                  }}
                  initial={{ opacity: 0, y: -150 }}          // Start 150px above, fully transparent
                  whileInView={{ opacity: 1, y: 0 }}         // Animate down and fade in
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],                // Ease similar to cubic-bezier(0.22, 1, 0.36, 1)
                    delay: 0.4,                              // 0.4s delay for third element
                  }}
                  viewport={{ once: true, amount: 0.3 }}     // Trigger when 30% visible
                >
                  <img src="/media/juthoor1.jpg" alt="Work showcase" className="w-full h-full object-cover" />
                </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Project Section */}
      <section className="w-screen pt-32 pb-40 bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* 4 Column Layout */}
        <div className="px-8 overflow-hidden">
          <div className="flex gap-8 mb-8">
            {/* Column 1 - Text Content */}
            <div className="space-y-8 w-64 flex-shrink-0">
              {/* Scope */}
              <div>
                <h3 className="text-black text-lg mb-4" style={{ fontFamily: 'Lausanne', fontWeight: 500, marginTop: '200px' }}>
                  Scope
                </h3>
                <div className="space-y-2">
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Brand Identity</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Mobile App</p>
                  <p className="text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Marketing Campaign</p>
                </div>
              </div>

              {/* Scroll Down */}
              <div className="flex items-center gap-2">
                <span className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 14 }}>Scroll Down</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 13l3 3 3-3M7 6l3 3 3-3" />
                </svg>
              </div>
            </div>

            <div>
              {/* 3 Media Boxes Container */}
              <div style={{ marginTop: '60px' }}>
                {/* Third Project Title - Positioned directly above the boxes */}
                <div className="mb-6">
                  <h1 className="text-black text-4xl md:text-5xl lg:text-6xl text-left" style={{ fontFamily: 'Lausanne', fontSize: '40px', fontWeight: 400, letterSpacing: '-0.02em' }}>
                    Etihad Credit Insurance 
                  </h1>
                </div>
                
                <div className="flex overflow-hidden">
                {/* First Box - Video */}
                <div className="overflow-hidden" style={{ height: '340px', width: '482px' }}>
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/media/work-megamenu3.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Second Box - Image */}
                <div className="overflow-hidden" style={{ height: '340px', width: '482px' }}>
                  <img src="/media/work-megamenu2.jpg" alt="Work showcase" className="w-full h-full object-cover" />
                </div>

                {/* Third Box - Video */}
                <div className="overflow-hidden" style={{ height: '340px', width: '482px', marginRight: '1px' }}>
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/media/work-megamenu1.mp4" type="video/mp4" />
                  </video>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid Human Experiences - Fixed to Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50">
        <div className="flex justify-between items-center px-8 py-4">
          {/* Main Text */}
          <div className="flex-1">
            <h2 className="text-black text-6xl md:text-7xl lg:text-8xl xl:text-9xl" 
            style={{
                fontFamily: 'Lausanne',
                fontWeight: 400,
                letterSpacing: '-0.05em',
                fontSize: '149px',
                lineHeight: 1,
                
                margin: 0,
    
              }}>
               hybrid human experiences<sup style={{ fontSize: '24px', verticalAlign: 'super', position: 'relative', top: '-10px' }}>®</sup>
            </h2>
          </div>
        </div>
      </div>

      
      
    </div>
  );
}