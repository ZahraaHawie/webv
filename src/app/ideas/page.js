'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function IdeasPage() {
  const footerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'industries' | 'services' | 'work' | 'ideas' | 'profile' | null
  const [activeIdeasIndex, setActiveIdeasIndex] = useState(0);
  const [activeIndustriesIndex, setActiveIndustriesIndex] = useState(0);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [activeServicesIndex, setActiveServicesIndex] = useState(0);

  // Routes for each service (used for image/title links in column 3)
  const serviceHrefs = [
    '/services/brand-transformation',
    '/services/digital-transformation',
    '/services/media-transformation',
    '/services/ai-transformation',
    '/services/spatial-transformation',
  ];

  // Industries mega menu: 15 industries
  const industries = [
    { title: 'Technology', href: '/industries/technology' },
    { title: 'Healthcare', href: '/industries/healthcare' },
    { title: 'Finance', href: '/industries/finance' },
    { title: 'Retail', href: '/industries/retail' },
    { title: 'Education', href: '/industries/education' },
    { title: 'Manufacturing', href: '/industries/manufacturing' },
    { title: 'Real Estate', href: '/industries/real-estate' },
    { title: 'Energy', href: '/industries/energy' },
    { title: 'Transportation', href: '/industries/transportation' },
    { title: 'Media & Entertainment', href: '/industries/media-entertainment' },
    { title: 'Food & Beverage', href: '/industries/food-beverage' },
    { title: 'Automotive', href: '/industries/automotive' },
    { title: 'Fashion & Beauty', href: '/industries/fashion-beauty' },
    { title: 'Sports & Fitness', href: '/industries/sports-fitness' },
    { title: 'Government', href: '/industries/government' }
  ];

  // Ideas mega menu: 5 ideas items
  const ideasItems = [
    { title: 'Blog', k: 'thought' },
    { title: 'Podcasts', k: 'cases' },
    { title: 'Events', k: 'insights' },
    { title: 'Reports', k: 'innovation' },
    { title: 'Books', k: 'trends' }
  ];

  // Profile mega menu: showreel link
  const showreelHref = '/showreel-2025';
  const careersHref = '/careers';

  // Header color management
  const [headerColor, setHeaderColor] = useState('black');

  // Close menu when header is hidden
  useEffect(() => {
    if (headerColor === null && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [headerColor, isMenuOpen]);

  useEffect(() => {
    const getHeaderColor = () => {
      try {
        const centerY = window.innerHeight * 0.5;
        const sections = Array.from(document.querySelectorAll('[data-block]'));
        
        for (const section of sections) {
          if (!section) continue;
          
          const r = section.getBoundingClientRect();
          if (r.top <= centerY && r.bottom >= centerY) {
            const blockType = section.dataset?.block;
            
            if (blockType === 'footer') {
              return null; // This will hide the header
            }
            return 'black'; // default
          }
        }
        
        return 'black'; // default
      } catch (error) {
        console.warn('Error in getHeaderColor:', error);
        return 'black'; // fallback
      }
    };

    const refresh = () => {
      try {
        const newHeaderColor = getHeaderColor();
        setHeaderColor(newHeaderColor);
      } catch (error) {
        console.warn('Error in refresh function:', error);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          refresh();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    refresh();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      {/* Fixed Header Navigation */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white" 
        animate={{ opacity: headerColor === null ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Left: TOMORROW */}
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

          {/* Center: Navigation Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {['Industries', 'Services', 'Work', 'Ideas', 'Profile'].map((item, index) => (
              <motion.div
                key={item}
                className="relative"
                onMouseEnter={() => {
                  if (item === 'Industries') {
                    setActiveMenu('industries');
                    setIsMenuOpen(true);
                  } else if (item === 'Services') {
                    setActiveMenu('services');
                    setIsMenuOpen(true);
                  } else if (item === 'Work') {
                    setActiveMenu('work');
                    setIsMenuOpen(true);
                  } else if (item === 'Ideas') {
                    setActiveMenu('ideas');
                    setIsMenuOpen(true);
                  } else if (item === 'Profile') {
                    setActiveMenu('profile');
                    setIsMenuOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  // Only close if not hovering over the mega menu
                  if (item === 'Industries' || item === 'Services' || item === 'Work' || item === 'Ideas' || item === 'Profile') {
                    setTimeout(() => {
                      const megaMenu = document.querySelector('.mega-menu-container');
                      if (!megaMenu || !megaMenu.matches(':hover')) {
                        setIsMenuOpen(false);
                        setActiveMenu(null);
                      }
                    }, 50);
                  }
                }}
              >
                <motion.button
                  className={`font-medium tracking-wide transition-colors duration-200 ${
                    item === 'Ideas' 
                      ? 'text-black' 
                      : 'text-black/80 hover:text-black'
                  }`}
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '14px', 
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.button>
              </motion.div>
            ))}
          </nav>

          {/* Right: Login */}
          <motion.button
            className="hidden md:block font-medium tracking-wide text-black/80 hover:text-black transition-colors duration-200"
            style={{ 
              fontFamily: 'Lausanne', 
              fontSize: '14px', 
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            Login
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <motion.div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </motion.button>
        </div>

        {/* Ideas Mega Menu — edge-to-edge, two-column dynamic (matches Profile) */}
        {isMenuOpen && headerColor !== null && activeMenu === 'ideas' && (
          <motion.div
            className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}
          >
            <div className="w-screen max-w-none">
              <div className="grid grid-cols-12 gap-0 px-6 md:px-10 lg:px-16 py-10">
                {/* First column: menu items */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-zinc-200 pr-6 md:pr-8 lg:pr-10">
                  <nav className="divide-y divide-zinc-100">
                    {ideasItems.map((item, idx) => (
                      <button
                        key={item.k}
                        className={`w-full text-left py-5 transition-colors ${idx === activeIdeasIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                        style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        onMouseEnter={() => setActiveIdeasIndex(idx)}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                          {item.title}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Second column: details that change on hover */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                  {[
                    {
                      heading: '',
                      sub: 'Strategic Thinking',
                      blurb: 'Explore our thought leadership content that shapes the future of branding, digital transformation, and creative strategy across industries.',
                    },
                    {
                      heading: '',
                      sub: 'Success Stories',
                      blurb: 'Dive deep into our portfolio of transformative projects and see how we\'ve helped brands achieve remarkable growth and market positioning.',
                    },
                    {
                      heading: '',
                      sub: 'Market Intelligence',
                      blurb: 'Stay ahead with our comprehensive industry analysis, market trends, and strategic insights that drive informed decision-making.',
                    },
                    {
                      heading: '',
                      sub: 'Innovation Hub',
                      blurb: 'Discover cutting-edge methodologies, experimental approaches, and breakthrough technologies that are reshaping the creative landscape.',
                    },
                    {
                      heading: '',
                      sub: 'Future Vision',
                      blurb: 'Explore emerging trends, predictions, and forward-thinking strategies that will define the next decade of brand evolution.',
                    },
                  ].map((panel, idx) => (
                    <div key={idx} className={`${idx === activeIdeasIndex ? 'block' : 'hidden'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        <div className="md:col-span-6">
                          <div className="text-zinc-500 mb-4" style={{ fontFamily: 'Lausanne' }}>{panel.heading}</div>
                          <h3 className="text-black leading-tight mb-5" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400 }}>
                            {panel.sub}
                          </h3>
                          <p className="text-zinc-700 max-w-xl" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>
                            {panel.blurb}
                          </p>
                        </div>
                        <div className="md:col-span-6">
                          <div className="w-full h-64 rounded-lg bg-zinc-100 overflow-hidden">
                            <img src="/media/industries.png" alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="mt-4">
                            <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                              Featured
                            </p>
                            <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                              {panel.sub} in Action
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="min-h-screen bg-white pt-20">
      {/* Main Quote - Full Width */}
      <div className="px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 
            className="text-black-900 leading-tight max-w-4xl"
            style={{ 
              fontFamily: 'Lausanne', 
              fontSize: 'clamp(32px, 4vw, 56px)', 
              fontWeight: 400, 
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            Thought leadership is a key element 
            our business and our people are
            empowered to share knowledge
          </h1>
        </motion.div>

        {/* Navigation Icons */}
        <motion.div
          className="flex justify-between w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
            {[
              { 
                title: 'Events', 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
                href: '/Leadership?type=Events'
              },
              { 
                title: 'Blog', 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
                href: '/Leadership?type=Blog'
              },
              { 
                title: 'Podcasts', 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
                href: '/Leadership?type=Podcasts'
              },
              { 
                title: 'Keynotes', 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
                href: '/Leadership?type=Keynotes'
              },
              { 
                title: 'Reports', 
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ),
                href: '/Leadership?type=Reports'
              }
            ].map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-col items-center gap-4 group cursor-pointer"
              >
                <div className="w-16 h-16 flex items-center justify-center text-gray-600 group-hover:text-black transition-colors duration-200">
                  {item.icon}
                </div>
                <span 
                  className="text-gray-600 group-hover:text-black transition-colors duration-200"
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 16, 
                    fontWeight: 400,
                    letterSpacing: '0.05em'
                  }}
                >
                  {item.title}
                </span>
              </Link>
            ))}
        </motion.div>
      </div>
      
      {/* Second Section - Video/Image - Full Width */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <div className="w-full h-[60vh] lg:h-[70vh] relative overflow-hidden">
          <img 
            src="/media/podcast.jpg" 
            alt="Podcast recording session" 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Text and Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 
                className="text-white text-4xl lg:text-6xl font-bold mb-8"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Visionaries of Tomorrow
              </h2>
              <button 
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
                style={{ fontFamily: 'Lausanne' }}
              >
                Listen now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Events Section */}
      <div className="px-6 md:px-10 lg:px-16 pt-24 lg:pt-52 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Large Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden relative">
              <img 
                src="/media/events.png" 
                alt="Event background" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right Section - Event Details */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-gray-500 text-sm mb-4" style={{ fontFamily: 'Lausanne' }}>
              Next Event
            </div>
            
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-gray-100 text-gray-600 px-1 py-1 rounded text-sm" style={{ fontFamily: 'Lausanne' }}>
                Seminar
              </span>
              <span className="text-gray-600 text-sm" style={{ fontFamily: 'Lausanne' }}>
                10 Sept 25 16:00 - Bristol
              </span>
            </div>
            
            <h3 
              className="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight"
              style={{ 
                fontFamily: 'Lausanne', 
                fontWeight: 400,
                letterSpacing: '-0.02em'
              }}
            >
              World Green Building Week 2025 Bristol
            </h3>
            
            <p 
              className="text-gray-600 mb-8 text-lg"
              style={{ fontFamily: 'Lausanne' }}
            >
              Exploring circular and human-centric design
            </p>
            
            <a 
              href="#" 
              className="text-black-600 hover:text-black-800 transition-colors duration-200 text-sm font-medium"
              style={{ fontFamily: 'Lausanne' }}
            >
              More info
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Blog Section - Conversations */}
      <div className="px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 
            className="text-3xl lg:text-4xl font-bold text-black mb-12"
            style={{ 
              fontFamily: 'Lausanne', 
              fontWeight: 400,
              letterSpacing: '-0.02em'
            }}
          >
            Blog Articles
          </h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4">
            {/* Article Card 1 */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src="/media/industries-1.jpg" 
                    alt="Three tips to improve your GRESB score" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border" style={{ fontFamily: 'Lausanne' }}>
                      ESG
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'Lausanne' }}>
                      03 Sept 2025
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-bold text-black leading-tight"
                    style={{ 
                      fontFamily: 'Lausanne', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Three tips to improve your GRESB score
                  </h3>
                </div>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src="/media/industries-2.jpg" 
                    alt="Lessons learned from seven years of smarter" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border" style={{ fontFamily: 'Lausanne' }}>
                      IT
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'Lausanne' }}>
                      02 Sept 2025
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-bold text-black leading-tight"
                    style={{ 
                      fontFamily: 'Lausanne', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Lessons learned from seven years of smarter
                  </h3>
                </div>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src="/media/industries-3.jpg" 
                    alt="Beyond compliance: why healthy workspaces" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border" style={{ fontFamily: 'Lausanne' }}>
                      Sustainability
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'Lausanne' }}>
                      29 Aug 2025
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-bold text-black leading-tight"
                    style={{ 
                      fontFamily: 'Lausanne', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Beyond compliance: why healthy workspaces
                  </h3>
                </div>
              </div>
            </div>

            {/* Article Card 4 */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src="/media/industries-1.jpg" 
                    alt="Deep basements: tackling land constraints through" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border" style={{ fontFamily: 'Lausanne' }}>
                      Structures
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'Lausanne' }}>
                      26 Aug 2025
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-bold text-black leading-tight"
                    style={{ 
                      fontFamily: 'Lausanne', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Deep basements: tackling land constraints through
                  </h3>
                </div>
              </div>
            </div>

            {/* Article Card 5 */}
            <div className="flex-shrink-0 w-80">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src="/media/industries-2.jpg" 
                    alt="Quadralis Pavilion: reflections from a year in" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border" style={{ fontFamily: 'Lausanne' }}>
                      Structural Engineer
                    </span>
                    <span className="text-gray-500 text-sm" style={{ fontFamily: 'Lausanne' }}>
                      21 Aug 2025
                    </span>
                  </div>
                  <h3 
                    className="text-lg font-bold text-black leading-tight"
                    style={{ 
                      fontFamily: 'Lausanne', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    Quadralis Pavilion: reflections from a year in
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Keynote Section */}
      <div className="px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <img 
              src="/media/keynote.jpeg" 
              alt="Keynote video background" 
              className="w-full h-full object-cover"
            />
            
           
            {/* Bottom Left - Video Details */}
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white ml-1">
                    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-white">
                  <div 
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: 'Lausanne' }}
                  >
                    Tomorrow Keynote - What the UAE Climate
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Lausanne' }}
                  >
                    Law means for our industry
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="bg-white/20 text-white px-3 py-1 rounded text-sm" style={{ fontFamily: 'Lausanne' }}>
                  Notre Dam University
                </span>
                <span className="text-white text-sm" style={{ fontFamily: 'Lausanne' }}>
                  23 October 2025
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Reports Section - Latest Publications */}
      <div className="px-6 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 
            className="text-3xl lg:text-4xl font-bold text-black mb-12"
            style={{ 
              fontFamily: 'Lausanne', 
              fontWeight: 400,
              letterSpacing: '-0.02em'
            }}
          >
            Latest Publications
          </h2>
          
          <div className="grid grid-cols-5 gap-4 w-full">
            {/* Publication 1 - Dark Green */}
            <div>
              <div className="bg-green-800 rounded-lg h-96 overflow-hidden">
                <img 
                  src="/media/report.png" 
                  alt="Publication 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 
                className="text-black text-xl font-bold mt-3 leading-tight"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              >
                AI Driven Data: 2025 Biggest
              </h3>
            </div>

            {/* Publication 2 - Dark Blue */}
            <div>
              <div className="bg-blue-800 rounded-lg h-96 overflow-hidden">
                <img 
                  src="/media/report.png" 
                  alt="Publication 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 
                className="text-black text-xl font-bold mt-3 leading-tight"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              >
                Sustainability and Environmental Policy
              </h3>
            </div>

            {/* Publication 3 - Dark Blue */}
            <div>
              <div className="bg-blue-800 rounded-lg h-96 overflow-hidden">
                <img 
                  src="/media/report.png" 
                  alt="Publication 3" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 
                className="text-black text-xl font-bold mt-3 leading-tight"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              >
                Quality Policy Statement
              </h3>
            </div>

            {/* Publication 4 - Dark Blue */}
            <div>
              <div className="bg-blue-800 rounded-lg h-96 overflow-hidden">
                <img 
                  src="/media/report.png" 
                  alt="Publication 4" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 
                className="text-black text-xl font-bold mt-3 leading-tight"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              >
                Occupational Health and Safety Policy
              </h3>
            </div>

            {/* Publication 5 - Dark Blue */}
            <div>
              <div className="bg-blue-800 rounded-lg h-96 overflow-hidden">
                <img 
                  src="/media/report2.jpg" 
                  alt="Publication 5" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 
                className="text-black text-xl font-bold mt-3 leading-tight"
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              >
                Information Security Policy Statement
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* FOOTER (DARK) — with slide-in animation */}
      <motion.section className="w-screen h-screen relative bg-black" style={{ marginTop: 50 }}>
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
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center space-x-8 mb-4 lg:mb-0">
                <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Lausanne', fontSize: '14px', fontWeight: 400 }}>
                  Home
                </Link>
                <Link href="/services" className="text-white hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Lausanne', fontSize: '14px', fontWeight: 400 }}>
                  Services
                </Link>
                <Link href="/industries" className="text-white hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Lausanne', fontSize: '14px', fontWeight: 400 }}>
                  Industries
                </Link>
                <Link href="/Leadership" className="text-white hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Lausanne', fontSize: '14px', fontWeight: 400 }}>
                  Leadership
                </Link>
                <Link href="/ideas" className="text-white hover:text-gray-300 transition-colors duration-200" style={{ fontFamily: 'Lausanne', fontSize: '14px', fontWeight: 400 }}>
                  Ideas
                </Link>
              </div>
              <div className="text-gray-400 text-sm" style={{ fontFamily: 'Lausanne', fontWeight: 400 }}>
                © 2025 The Tomorrow. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
    </>
  );
}
