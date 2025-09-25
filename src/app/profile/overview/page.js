'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfileOverview() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header menu (shared styling) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
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
                className={`transition-colors duration-200 ${item==='Profile' ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
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

      {/* Hero Section */}
      <section className="w-full bg-white pt-28 md:pt-32 lg:pt-36 pb-16 lg:pb-24">
        {/* Title Section */}
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="text-center mb-12 lg:mb-16">
            <motion.h1 
              className="text-black mb-6 leading-tight"
              style={{ 
                fontFamily: 'serif',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: '-0.01em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Creative Transformation Agency
            </motion.h1>
            
            <motion.div 
              className="text-black"
              style={{ 
                fontFamily: 'Lausanne',
                fontSize: 'clamp(16px, 1.2vw, 18px)',
                fontWeight: 400,
                lineHeight: 1.5
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              We help governments, organizations and startups

craft experiences that combine technology and anthropology 

to impact people mentally, emotionally and behaviorally
            </motion.div>
          </div>
        </div>

        {/* Video Section - Full width black background */}
        <div className="w-screen bg-black py-8 md:py-12">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="w-full">
              <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://player.vimeo.com/video/990892389"
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Creative Transformation Agency Video"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Belief section */}
        <div className="w-full bg-black pt-0 md:pt-0 pb-0 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="space-y-1 md:space-y-1">
             <h2
               className="leading-tight mb-8"
               style={{
                 fontFamily: 'Lausanne',
                 fontWeight: 400,
                 letterSpacing: '-0.02em',
                 fontSize: '20px',
                 color: '#E3E0DC'
               }}
             >
               What we believe
             </h2>
             <h2
               className="leading-tight"
               style={{
                 fontFamily: 'Lausanne',
                 fontWeight: 400,
                 letterSpacing: '-0.02em',
                 fontSize: '35px',
                 color: '#E3E0DC'
               }}
             >
               Great brands arent products or services.
             </h2>
            <h2
              className="leading-tight"
              style={{
                fontFamily: 'Lausanne',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                fontSize: '35px',
                color: '#E3E0DC'
              }}
            >
              Not even ideas. They are Hybrid Human Experiences<sup>®</sup>
            </h2>
          </div>

          <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div className="max-w-full md:max-w-[280px]">
              <div
                className="mb-3"
                style={{ fontFamily: 'Lausanne', fontSize: 28, fontWeight: 500, color: '#E3E0DC' }}
              >
                Mentally
              </div>
              <p
                style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.7, color: '#6E6F70' }}
              >
                Establish brand perception to drive Differentiation
              </p>
            </div>

            <div className="max-w-full md:max-w-[280px]">
              <div
                className="mb-3"
                style={{ fontFamily: 'Lausanne', fontSize: 28, fontWeight: 500, color: '#E3E0DC' }}
              >
                Emotionally
              </div>
              <p
                style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.7, color: '#6E6F70' }}
              >
                Forge deep relationships to drive Loyalty
              </p>
            </div>

            <div className="max-w-full md:max-w-[280px]">
              <div
                className="mb-3"
                style={{ fontFamily: 'Lausanne', fontSize: 28, fontWeight: 500, color: '#E3E0DC' }}
              >
                Behaviorally
              </div>
              <p
                style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.7, color: '#6E6F70' }}
              >
                Influence purchasing decisions to drive Revenue
              </p>
            </div>
          </div>
        </div>
        </div>

        {/*build section*/}
        <div data-theme="light" data-block="8" className="w-screen h-screen relative bg-black flex pb-30 md:pb-30">
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ marginLeft: '8.7%', marginTop: '5%' }}>
          <div style={{ maxWidth: '60%' }}>
          <h2
               className="leading-tight mb-9"
               style={{
                 fontFamily: 'Lausanne',
                 fontWeight: 400,
                 letterSpacing: '-0.02em',
                 fontSize: '20px',
                 marginLeft: '22px',
                 color: '#E3E0DC'
               }}
             >
               What we do
             </h2>
            
            <motion.h3 
              className="mb-6 leading-tight" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '3%', color: '#E3E0DC' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
We build, activate and promote these experiences across every interaction with your brand, product and media
</motion.h3>
       
      
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center" style={{ marginRight: '4%', marginTop: '8%' }}>
          <div className="h-5/6 bg-gray-200 overflow-hidden" style={{ width: '200%', marginTop: '5%', marginRight: '3%' }}>
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/media/AI-transf.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        </div>

        {/* Edge-to-edge statement */}
        <div className="w-screen bg-black py-12 md:py-16 pl-3 md:pl-4">
        <h2
          className="whitespace-nowrap block w-full"
          style={{
            fontFamily: 'Lausanne',
            fontWeight: 400,
            letterSpacing: '-0.05em',
            fontSize: '147px',
            lineHeight: 1,
            
            margin: 0,
            color: '#E3E0DC'
          }}
        >
          hybrid human experiences<sup>®</sup>
        </h2>
        </div>

        {/* Who we are section */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Who we are heading and description */}
            <div className="mb-16 md:mb-20">
              <h3 
                className="text-black mb-6"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontSize: '16px', 
                  fontWeight: 400 
                }}
              >
                Who we are
              </h3>
              <p 
                className="text-black"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontSize: 'clamp(24px, 3vw, 32px)', 
                  fontWeight: 400,
                  lineHeight: 1.3,
                  maxWidth: '800px'
                }}
              >
                We are a very small, elite team structure, free from the layers of management that stifle creativity, operating from the sunny lands of Dubai
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
              <div>
                <div 
                  className="text-black mb-2"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px', fontWeight: 400 }}
                >
                  Established
                </div>
                <div 
                  className="text-black"
                  style={{ fontFamily: 'Lausanne', fontSize: '48px', fontWeight: 400 }}
                >
                  2024
                </div>
              </div>
              <div>
                <div 
                  className="text-black mb-2"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px', fontWeight: 400 }}
                >
                  Team Members
                </div>
                <div 
                  className="text-black"
                  style={{ fontFamily: 'Lausanne', fontSize: '48px', fontWeight: 400 }}
                >
                  5
                </div>
              </div>
              <div>
                <div 
                  className="text-black mb-2"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px', fontWeight: 400 }}
                >
                  Projects
                </div>
                <div 
                  className="text-black"
                  style={{ fontFamily: 'Lausanne', fontSize: '48px', fontWeight: 400 }}
                >
                  12+
                </div>
              </div>
            </div>

            {/* Bottom section with image and partner logos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Building image */}
              <div className="order-2 lg:order-1">
                <div className="w-full h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="/media/profile.jpg" 
                    alt="The Tomorrow Agency Building" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* We are section */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {/* First Column - Experts */}
              <div>
                <h3 
                  className="text-black mb-2"
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}
                >
                  we are
                </h3>
                <h4 
                  className="text-black mb-10"
                  style={{ 
                    fontFamily: 'TWKGhost-Italic', 
                    fontSize: 'clamp(28px, 4vw, 36px)', 
                    fontWeight: 400,
                    lineHeight: 0.7,
                    fontStyle: 'italic'
                  }}
                >
                  experts
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '80%',
                    color: '#6E6F70'
                  }}
                >
                  We specialize deeply in our craft, leveraging years of global experience from strategy, branding, design, motion to marketing and media buying
                </p>
              </div>

              {/* Second Column - Mentors */}
              <div>
                <h3 
                  className="text-black mb-2"
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}
                >
                  we are
                </h3>
                <h4 
                  className="text-black mb-10"
                  style={{ 
                    fontFamily: 'TWKGhost-Italic', 
                    fontSize: 'clamp(28px, 4vw, 36px)', 
                    fontWeight: 400,
                    lineHeight: 0.7
                  }}
                >
                  mentors
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '80%',
                    color: '#6E6F70'
                  }}
                >
                  We prioritize mentorship over service delivery. We empower you to make informed assessments and decisions by imparting the right knowledge
                </p>
              </div>

              {/* Third Column - Partners */}
              <div>
                <h3 
                  className="text-black mb-2"
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400 
                  }}
                >
                  we are
                </h3>
                <h4 
                  className="text-black mb-10"
                  style={{ 
                    fontFamily: 'TWKGhost-Italic', 
                    fontSize: 'clamp(28px, 4vw, 36px)', 
                    fontWeight: 400,
                    lineHeight: 0.7
                  }}
                >
                  partners
                </h4>
                <p 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px', 
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: '80%',
                    color: '#6E6F70'
                  }}
                >
                  We seamlessly integrate as an extension of your team. There is no distinction between 'us' and 'them'; we operate as a unified force
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <motion.section data-theme="dark" data-block="footer" className="w-screen h-screen relative bg-black" style={{ marginTop: 50 }}>
          <div className="relative z-10 w-full h-full flex flex-col">
            <div className="flex-1 flex items-center px-8 lg:px-16">
              <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
                <motion.div className="lg:w-1/2 mb-8 lg:mb-0" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                  <h2 className="text-white mb-6" style={{ fontFamily: 'Ghost', fontStyle: 'italic', fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 0.9 }}>
                    Our<br />Story
                  </h2>
                  <p className="text-white max-w-md" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(18px, 1.5vw, 24px)', lineHeight: 1.5, fontWeight: 400 }}>
                    The story behind The Tomorrow is one of exploration, creativity and curiosity.
                  </p>
                </motion.div>
                <motion.div className="lg:w-1/2 flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
                  <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                    <img src="/media/TheTomorrow_LogoWhite.svg" alt="The Tomorrow Logo" className="w-full h-full object-contain" />
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="border-t border-gray-600 px-8 lg:px-16 py-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
                <div className="mb-6 lg:mb-0">
                  <div className="text-white space-y-1" style={{ fontFamily: 'Lausanne', fontSize: 14, lineHeight: 1.4, fontWeight: 400 }}>
                    <div>Willem II Singel 8</div>
                    <div>6041 HS, Roermond</div>
                    <div>The Netherlands</div>
                    <div>hello@exoape.com</div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  <div className="text-white space-y-1" style={{ fontFamily: 'Lausanne', fontSize: 14, lineHeight: 1.4, fontWeight: 400 }}>
                    <div>Work</div>
                    <div>Studio</div>
                    <div>News</div>
                    <div>Contact</div>
                  </div>
                  <div className="text-white space-y-1" style={{ fontFamily: 'Lausanne', fontSize: 14, lineHeight: 1.4, fontWeight: 400 }}>
                    <div>Behance</div>
                    <div>Dribbble</div>
                    <div>Linkedin</div>
                    <div>Instagram</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="text-gray-400" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400 }}>
                  © 2024 The Tomorrow Agency. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </section>
    </div>
  );
}
