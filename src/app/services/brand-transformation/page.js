'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

/**
 * Replacement for your page:
 * - "01 Brand Transformation" stays pinned while scrolling
 * - Auto-switches color: black on light/beige, white on black
 * - Hides when footer is on screen
 *
 * Mark any section with data-theme="dark" when its background is dark (e.g. black).
 * Everything else is considered light by default.
 */
export default function BrandPage() {
  const videoRef = useRef(null);
  const block4VideoRef = useRef(null);
  const block5VideoRef = useRef(null);
  const secondBlockRef = useRef(null);
  const footerRef = useRef(null);
  const headerInnerRef = useRef(null);
  const servicesBtnRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'industries' | 'services' | 'work' | 'ideas' | 'profile' | null
  const [activeIdeasIndex, setActiveIdeasIndex] = useState(0);
  const [activeIndustriesIndex, setActiveIndustriesIndex] = useState(0);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [activeServicesIndex, setActiveServicesIndex] = useState(0);
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });

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

  // --- autoplay helpers (unchanged) ---
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    block4VideoRef.current?.play?.().catch(() => {});
    block5VideoRef.current?.play?.().catch(() => {});
  }, []);

  // Measure Services button position to align underline with header bottom border
  useEffect(() => {
    const measure = () => {
      const container = headerInnerRef.current;
      const services = servicesBtnRef.current;
      if (!container || !services) return;
      const cRect = container.getBoundingClientRect();
      const sRect = services.getBoundingClientRect();
      setUnderlinePos({ left: sRect.left - cRect.left, width: sRect.width });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // --- smooth color/background anims for your second block + header (kept) ---
  const { scrollYProgress } = useScroll({ target: secondBlockRef, offset: ['start start', 'end end'] });

  const backgroundColor = useTransform(scrollYProgress, [0, 0.01, 0.1], [
    'rgb(255, 255, 255)', // white
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)'
  ]);

  const logoColor = useTransform(scrollYProgress, [0, 0.01, 0.1], [
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(0, 0, 0)'
  ]);

  // --- THE NEW BIT: theme-aware pinned label ---
  const [isDarkUnderLabel, setIsDarkUnderLabel] = useState(false);
  const [hidePinned, setHidePinned] = useState(false);
  const [headerColor, setHeaderColor] = useState('black');

  // Close menu when header is hidden
  useEffect(() => {
    if (headerColor === null && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [headerColor, isMenuOpen]);

  useEffect(() => {
         const getThemeAtViewportCenter = () => {
       const centerY = window.innerHeight * 0.5; // vertical probe line
       const themedEls = Array.from(document.querySelectorAll('[data-theme]'));
       let theme = 'light';
       for (const el of themedEls) {
         const r = el.getBoundingClientRect();
         if (r.top <= centerY && r.bottom >= centerY) {
           theme = el.dataset.theme || 'light';
           break;
         }
       }
       return theme;
     };

    const getHeaderColor = () => {
      try {
        const centerY = window.innerHeight * 0.5;
        const sections = Array.from(document.querySelectorAll('[data-block]'));
        
        for (const section of sections) {
          if (!section) continue;
          
          const r = section.getBoundingClientRect();
          if (r.top <= centerY && r.bottom >= centerY) {
            // Check block type using data attributes
            const blockType = section.dataset?.block;
            
            // Block 1: white
            if (blockType === '1') {
              return 'white';
            }
            // Block 7: white
            if (blockType === '7') {
              return 'white';
            }
            // Footer: hide (return null)
            if (blockType === 'footer') {
              return null; // This will hide the header
            }
            // Blocks 2-6 and 8: black
            if (['2', '3', '4', '5', '6', '8'].includes(blockType)) {
              return 'black';
            }
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
        // Toggle color depending on the current section theme beneath the viewport center
        const theme = getThemeAtViewportCenter();
        setIsDarkUnderLabel(theme === 'dark');
        
        // Set header color based on specific sections
        const newHeaderColor = getHeaderColor();
        setHeaderColor(newHeaderColor);

        // Hide when the footer is on screen
        const footer = footerRef.current;
        if (footer) {
          const fr = footer.getBoundingClientRect();
          const isFooterVisible = fr.top < window.innerHeight && fr.bottom > 0;
          setHidePinned(isFooterVisible);
        }
      } catch (error) {
        console.warn('Error in refresh function:', error);
      }
    };

    // throttle via rAF
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

    // Wait for DOM to be ready before initial refresh
    const initialRefresh = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refresh);
      } else {
        refresh();
      }
    };
    
    initialRefresh();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('DOMContentLoaded', refresh);
    };
  }, []);

  // Footer slide-in (kept from your code)
  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

  return (
    <>
      {/* Fixed Header Navigation */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
        animate={{ opacity: headerColor === null ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div ref={headerInnerRef} className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Left: TOMORROW */}
          <motion.h1 
            className="font-bold tracking-wider text-black cursor-pointer" 
            style={{ fontFamily: 'Lausanne', fontSize: '16px', letterSpacing: '0.2em' }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            TOMORROW
          </motion.h1>

          {/* Center: Navigation Items */}
          <nav className="hidden md:flex items-center gap-10">
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
                  className={`relative transition-colors duration-200 ${
                    (item === 'Services') ? 'text-black' : 'text-zinc-500 hover:text-black'
                  }`}
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: '16px',
                    fontWeight: 300
                  }}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.15 }}
                  ref={item === 'Services' ? servicesBtnRef : null}
                >
                  {item}
                </motion.button>
              </motion.div>
            ))}
          </nav>

          {/* Absolute underline aligned with header's bottom border */}
          <span
            className="absolute bottom-[-1px] h-[2px] bg-black hidden md:block"
            style={{ left: underlinePos.left, width: underlinePos.width }}
          />

          {/* Right: Auth/Proposal */}
          <div className="hidden md:block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
            <span className="hover:text-black cursor-pointer">Sign In</span>
            <span className="mx-2">|</span>
            <span className="hover:text-black cursor-pointer">Request Proposal</span>
          </div>

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
        {/* Work Mega Menu — three columns: services-like left; merged right images */}
        {isMenuOpen && headerColor !== null && activeMenu === 'work' && (
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
                {/* First column: same as Services first column */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-zinc-200 pr-6 md:pr-8 lg:pr-10">
                  <nav className="divide-y divide-zinc-100">
                    {[
                      { title: 'Rouyati', k: 'brand', href: '/services/brand-transformation' },
                      { title: 'Etihad Credit Ensurance', k: 'digital', href: '/services/digital-transformation' },
                      { title: 'Sebastian & Wolf', k: 'media', href: '/services/media-transformation' },
                      { title: 'FIFA 2034', k: 'ai', href: '/services/ai-transformation' },
                      { title: 'Juthoor', k: 'spatial', href: '/services/spatial-transformation' },
                    ].map((item, idx) => (
                      <div key={item.k}>
                        <Link
                          href={item.href}
                          className={`block w-full text-left py-5 transition-colors text-zinc-500 hover:text-black`}
                          style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Merged right: two-thirds width with three stacked images */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                  <h3
                    className="text-black mb-8 whitespace-nowrap"
                    style={{ fontFamily: 'Lausanne', fontSize: 30, fontWeight: 400, letterSpacing: '-0.01em' }}
                  >
                    Ministry of Municipal & Rural Affairs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div className="w-full h-64 overflow-hidden">
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/media/work-megamenu1.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="w-full h-64 overflow-hidden">
                      <img src="/media/work-megamenu2.jpg" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full h-64 overflow-hidden">
                      <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/media/work-megamenu3.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* Industries Mega Menu — edge-to-edge, two-column dynamic (matches Services) */}
        {isMenuOpen && headerColor !== null && activeMenu === 'industries' && (
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
                {/* First column: industries 1-5 */}
                <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                  <nav>
                    {industries.slice(0, 5).map((item, idx) => (
                      <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx)}>
                        <Link
                          href={item.href}
                          className={`block w-full text-left py-5 transition-colors ${idx === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                          style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Second column: industries 6-10 */}
                <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                  <nav>
                    {industries.slice(5, 10).map((item, idx) => (
                      <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx + 5)}>
                        <Link
                          href={item.href}
                          className={`block w-full text-left py-5 transition-colors ${(idx + 5) === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                          style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 6).padStart(2,'0')}</span>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Third column: industries 11-15 */}
                <div className="col-span-12 md:col-span-4 lg:col-span-4">
                  <nav>
                    {industries.slice(10, 15).map((item, idx) => (
                      <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx + 10)}>
                        <Link
                          href={item.href}
                          className={`block w-full text-left py-5 transition-colors ${(idx + 10) === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                          style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 11).padStart(2,'0')}</span>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Services Mega Menu — edge-to-edge, two-column dynamic (matches Profile) */}
        {isMenuOpen && headerColor !== null && activeMenu === 'services' && (
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
                {/* First column: Services items */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-zinc-200 pr-6 md:pr-8 lg:pr-10">
                  <nav className="divide-y divide-zinc-100">
                    {[
                      { title: 'Brand Transformation', k: 'brand', href: '/services/brand-transformation' },
                      { title: 'Digital Transformation', k: 'digital', href: '/services/digital-transformation' },
                      { title: 'Media Transformation', k: 'media', href: '/services/media-transformation' },
                      { title: 'AI Transformation', k: 'ai', href: '/services/ai-transformation' },
                      { title: 'Spatial Transformation', k: 'spatial', href: '/services/spatial-transformation' },
                    ].map((item, idx) => (
                      <div key={item.k} onMouseEnter={() => setActiveServicesIndex(idx)}>
                        <Link
                          href={item.href}
                          className={`block w-full text-left py-5 transition-colors ${idx === activeServicesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                          style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        >
                          <span className="inline-flex items-center gap-3">
                            <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Second column: Services detail panels */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                  {[
                    {
                      heading: '',
                      sub: 'Create. Communicate.',
                      blurb: 'A signature program to craft your brand`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.',
                      image: '/media/industries.png'
                    },
                    {
                      heading: '',
                      sub: 'Connect. Catalyze.',
                      blurb: 'A signature program to craft your Digital`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.',
                      image: '/media/industries-3.jpg'
                    },
                    {
                      heading: '',
                      sub: 'Capture. Convert.',
                      blurb: 'A signature program to craft your Media`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.',
                      image: '/media/industries-2.jpg'
                    },
                    {
                      heading: '',
                      sub: 'Generate. Simplify.',
                      blurb: 'A signature program to craft your AI`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.',
                      image: '/media/industries.png'
                    },
                    {
                      heading: '',
                      sub: 'Design in the real world',
                      blurb: 'A signature program to craft your Spatial`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.',
                      image: '/media/industries-1.jpg'
                    },
                  ].map((panel, idx) => (
                    <div key={idx} className={`${idx === activeServicesIndex ? 'block' : 'hidden'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        <div className="md:col-span-6">
                          <div className="text-zinc-500 mb-4" style={{ fontFamily: 'Lausanne' }}>{panel.heading}</div>
                          <h3 className="text-black leading-tight mb-5" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400 }}>{panel.sub}</h3>
                          <p className="text-zinc-700 max-w-xl mb-6" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>{panel.blurb}</p>
                          {idx === 0 && (
                            <div className="space-y-3">
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Brand Strategy
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Brand Identity
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Brand Content
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Brand Experience
                              </div>
                            </div>
                          )}
                          {idx === 1 && (
                            <div className="space-y-3">
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Product & Platform
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Design Systems
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Commerce & Growth
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Operations Enablement
                              </div>
                            </div>
                          )}
                          {idx === 2 && (
                            <div className="space-y-3">
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Editorial Strategy
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Campaigns & Social
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Video & Motion
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Distribution & Analytics
                              </div>
                            </div>
                          )}
                          {idx === 3 && (
                            <div className="space-y-3">
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>AI Opportunity Mapping
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>GenAI Content & Tools
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Automation & Agents
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Data & Personalization
                              </div>
                            </div>
                          )}
                          {idx === 4 && (
                            <div className="space-y-3">
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Retail & Environments
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Exhibits & Events
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Wayfinding & Systems
                              </div>
                              <div className="text-black flex items-center" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                <span className="mr-2">→</span>Architecture Collateral
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-6">
                          <Link href={serviceHrefs[idx]}>
                            <div className="w-full h-64 rounded-lg bg-zinc-100 overflow-hidden">
                              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="/media/services-menu.mp4" type="video/mp4" />
                              </video>
                            </div>
                          </Link>
                          {idx === 0 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Featured
                              </p>
                              <Link href={serviceHrefs[idx]}>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  In the Age of AI, Brand is the Last Human Advantage
                                </p>
                              </Link>
                            </div>
                          )}
                          {idx === 1 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Featured
                              </p>
                              <Link href={serviceHrefs[idx]}>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Operating Models for Enterprise-Scale Digital
                                </p>
                              </Link>
                            </div>
                          )}
                          {idx === 2 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Featured
                              </p>
                              <Link href={serviceHrefs[idx]}>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Story Systems that Build Demand
                                </p>
                              </Link>
                            </div>
                          )}
                          {idx === 3 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Featured
                              </p>
                              <Link href={serviceHrefs[idx]}>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Practical AI: From Pilots to Production
                                </p>
                              </Link>
                            </div>
                          )}
                          {idx === 4 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Featured
                              </p>
                              <Link href={serviceHrefs[idx]}>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Spatial Identities that Move People
                                </p>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

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

        {/* Profile Mega Menu — edge-to-edge, two-column dynamic */}
        {isMenuOpen && headerColor !== null && activeMenu === 'profile' && (
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
                    {[
                      { title: 'Company Overview', k: 'what' },
                      { title: 'Careers', k: 'leadership' },
                      { title: 'Founder', k: 'social' },
                      { title: 'Team', k: 'careers' },
                      { title: 'Press & News', k: 'press' },
                    ].map((item, idx) => (
                      <button
                        key={item.k}
                        className={`w-full text-left py-5 transition-colors ${idx === activeProfileIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
                        style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}
                        onMouseEnter={() => setActiveProfileIndex(idx)}
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
                      sub: 'Creative Transformation',
                      blurb: 'We help governments, organizations and startups craft experiences that combine technology and anthropology to impact people mentally, emotionally and behaviorally',
                    },
                    {
                      heading: '',
                      sub: 'Experience and vision',
                      blurb: 'Meet the team guiding our work and partnerships.',
                    },
                    {
                      heading: '',
                      sub: 'Haidar Hawie',
                      blurb: '15+ years of experience in branding. I believe every consumer is a human at their core, and every interaction—whether with a brand story, product, or media—is an experience. Only those built on mental, emotional, and behavioral connections create the maximum impact to solve tomorrow’s challenges.',
                    },
                    {
                      heading: '',
                      sub: 'Top Tier Talent',
                      blurb: 'We are a very small, elite team structure, free from the layers of management that stifle creativity, operating from the sunny lands of Dubai',
                    },
                    {
                      heading: '',
                      sub: 'Newsroom',
                      blurb: 'Latest announcements and brand updates.',
                    },
                  ].map((panel, idx) => (
                    <div key={idx} className={`${idx === activeProfileIndex ? 'block' : 'hidden'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                        <div className="md:col-span-6">
                          {idx !== 4 ? (
                            <>
                              <div className="text-zinc-500 mb-4" style={{ fontFamily: 'Lausanne' }}>{panel.heading}</div>
                              <h3 className="text-black leading-tight mb-5" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400 }}>
                                {idx === 1 ? 'Talent Partnership' : panel.sub}
                              </h3>
                              <p className="text-zinc-700 max-w-xl" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>
                                {idx === 1
                                  ? 'We partner with exceptional talent to shape tomorrow\'s work—building multidisciplinary teams, nurturing growth, and creating environments where creative and technical excellence thrive.'
                                  : panel.blurb}
                              </p>
                              {idx === 1 && (
                                <div className="mt-4">
                                  <Link href={careersHref} className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}>
                                    <span>Join Us</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </Link>
                                </div>
                              )}
                              {idx === 3 && (
                                <div className="mt-17">
                                  <div className="flex justify-between">
                                    <div>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400, marginBottom: '4px' }}>
                                        Established
                                      </p>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
                                        2024
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400, marginBottom: '4px' }}>
                                        Team Members
                                      </p>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
                                        5
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400, marginBottom: '4px' }}>
                                        Projects
                                      </p>
                                      <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400, lineHeight: 1 }}>
                                        12+
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="mt-6">
                              <div className="w-full h-48 rounded-lg bg-zinc-100 overflow-hidden">
                                <img src="/media/industries-1.jpg" alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="mt-4">
                                <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                  LATEST NEWS
                                </p>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Tomorrow Wins Best Brand Strategy Award 2024
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-6">
                          {idx !== 1 && idx !== 3 && idx !== 4 && (
                            <div className="w-full h-64 rounded-lg bg-zinc-100 overflow-hidden">
                              <img src={idx === 2 ? '/media/founder-menu.png' : (idx % 2 === 0 ? '/media/panel-2.png' : '/media/industries-2.jpg')} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          {idx === 4 && (
                            <div className="mt-6">
                              <div className="w-full h-48 rounded-lg bg-zinc-100 overflow-hidden">
                                <img src="/media/industries-2.jpg" alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="mt-4">
                                <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                  LATEST NEWS
                                </p>
                                <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                  Tomorrow Wins Best Brand Strategy Award 2024
                                </p>
                              </div>
                            </div>
                          )}
                          {idx === 0 && (
                            <div className="mt-4">
                              <Link href={showreelHref} className="inline-flex items-center gap-2 text-black hover:opacity-80 transition-opacity" style={{ fontFamily: 'Lausanne' }}>
                                <span style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>Watch Showreel 2025</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </Link>
                            </div>
                          )}
                          {idx === 2 && (
                            <div className="mt-4">
                              <p className="text-gray-500 mb-1" style={{ fontFamily: 'Lausanne', fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                LATEST EVENT
                              </p>
                              <p className="text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 400, lineHeight: 1.5 }}>
                                How AI is changing the whole game
                              </p>
                            </div>
                          )}
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

      {/* THE PINNED WORD: color flips on dark/light, hides over footer */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 pointer-events-none"
        animate={{ opacity: hidePinned ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{ color: isDarkUnderLabel ? '#fff' : '#000' }}
      >
        <div className="-rotate-90 origin-left" style={{ fontFamily: 'TWKGhost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>
          01 Brand Transformation
        </div>
      </motion.div>


      {/* Block 1: white (LIGHT) */}
      <section data-theme="light" data-block="1" className="w-screen h-screen relative overflow-hidden bg-white">
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/media/brand-headervideo.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center p-16">
            <div className="text-gray-700 italic mb-4" style={{ fontFamily: 'Ghost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>Brand Transformation</div>
            <h2 className="text-gray-800 mb-8 leading-tight" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.05em' }}>
              Create.<br />Communicate.
            </h2>
            <p className="text-gray-700 max-w-lg" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6, fontWeight: 400 }}>
              A signature program to craft your brand's essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.
            </p>
          </div>
        </div>
      </section>

      {/* Block 2: sticky color fade (LIGHT) */}
      <section ref={secondBlockRef} data-theme="light" data-block="2" className="relative w-screen h-[200vh]">
        <motion.div className="sticky top-0 h-screen w-screen relative" style={{ backgroundColor }}>
          <div className="absolute" style={{ top: '20%', left: '10%', width: '70%', fontFamily: 'Lausanne', fontSize: 'clamp(38px, 5vw, 33px)', lineHeight: 1.1, fontWeight: 300 }}>
            <div>A brand is not what you say, it’s what they remember. It lives in the moments, impressions, and emotions that linger long after an interaction. True branding is less about speaking louder and more about creating experiences that stay with people</div>
          </div>
                     <div className="absolute overflow-hidden" style={{ top: '70%', left: 0, width: '100%', '--marqueeSize': 'clamp(120px, 30vw, 200px)', height: 'calc(var(--marqueeSize) * 1.08)' }}>
            <div className="flex whitespace-nowrap animate-scroll items-center" style={{ fontFamily: 'Lausanne', fontSize: 'var(--marqueeSize)', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 1, padding: '0.04em 0' }}>
              <span>STRATEGY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>IDENTITY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>CONTENT</span>
              <span>STRATEGY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>IDENTITY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>CONTENT</span>
              <span>STRATEGY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>IDENTITY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>CONTENT</span>
              <span>STRATEGY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>IDENTITY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>CONTENT</span>
              <span>STRATEGY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>IDENTITY</span>
              <img src="/media/icon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
              <span>CONTENT</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Block 3 (LIGHT) */}
      <section data-theme="light" data-block="3" className="w-screen h-screen relative bg-white flex items-center justify-center">
        <div className="w-4/5 h-3/4 bg-black rounded-lg shadow-2xl overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/media/block3-brand.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Block 4 (LIGHT) */}
      <section data-theme="light" data-block="4" className="w-screen h-screen relative bg-white flex flex-col">
        <div className="pt-16 px-16 pb-8">
          <motion.h2 
            className="text-black font-bold leading-tight" 
            style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '6%', marginTop: '5%', maxWidth: '80%' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Defining the future by merging strategy, identity, and content into a singular vision.
          </motion.h2>
        </div>
        <div className="flex-1 flex px-36 pb-16">
          <div className="w-1/2 pr-8">
            <div className="h-full bg-gray-200 overflow-hidden" style={{ width: '90%', marginLeft: '36%', marginTop: '25%' }}>
              <video ref={block4VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/media/block.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="w-1/2 pl-8 flex flex-col justify-center" style={{ marginLeft: '15%', marginTop: '5%' }}>
            <div className="max-w-sm">
              <motion.div 
                className="text-gray-400 mb-6" 
                style={{ fontFamily: 'Lausanne', fontSize: 24, fontWeight: 300, marginLeft: '5%', marginTop: '3%' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                01
              </motion.div>
              <motion.h3 
                className="text-black mb-6 leading-tight" 
                style={{ fontFamily: 'Lausanne', fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '2%' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Brand Strategy
              </motion.h3>
              <motion.div 
                className="h-px bg-gray-300 mb-8" 
                style={{ marginLeft: '5%', marginTop: '2%', width: 270 }}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              />
              <motion.p 
                className="text-black leading-relaxed" 
                style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400, marginLeft: '5%', marginTop: '4%' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                In the design process, we highly value the eye-level perspective as it offers a genuine experience of spatial projects. This perspective provides invaluable insights into the functionality of a spatial plan, revealing how spaces truly work for the people who inhabit them.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5 (LIGHT) */}
      <section data-theme="light" data-block="5" className="w-screen h-screen relative bg-white flex">
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ marginLeft: '8.7%', marginTop: '5%' }}>
          <div style={{ maxWidth: '60%' }}>
            <motion.div 
              className="text-gray-400 mb-8" 
              style={{ fontFamily: 'Lausanne', fontSize: 24, fontWeight: 300, marginLeft: '5%', marginTop: '2%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              02
            </motion.div>
            <motion.h3 
              className="text-black mb-6 leading-tight" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '3%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Brand Identity
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '5%', marginTop: '2%', width: 270 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
            <motion.p 
              className="text-black leading-relaxed" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400, marginLeft: '5%', marginTop: '4%' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              With the incredible power of AI, we can elevate the effectiveness of our design process to new heights. Through the synergy of human creativity and AI-driven insights, we unlock new possibilities and redefine the boundaries of spatial design.
            </motion.p>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center" style={{ marginRight: '5%', marginTop: '8%' }}>
          <div className="h-5/6 bg-gray-200 overflow-hidden" style={{ width: '200%', marginTop: '5%', marginRight: '3%' }}>
            <video ref={block5VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/media/block5-brand.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Block 6 (LIGHT) */}
      <section data-theme="light" data-block="6" className="w-screen h-screen relative bg-white flex">
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ marginLeft: '8.7%', marginTop: '5%' }}>
          <div className="h-5/6 bg-gray-100 overflow-hidden relative" style={{ width: '110%', marginLeft: '3%', marginTop: '20%', marginRight: '3%', marginBottom: '20%' }}>
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/media/services-header.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ marginRight: '8%', marginTop: '5%' }}>
          <div style={{ maxWidth: '110%' }}>
            <motion.div 
              className="text-gray-400 mb-8" 
              style={{ fontFamily: 'Lausanne', fontSize: 24, fontWeight: 300, marginLeft: '30%', marginTop: '2%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              03
            </motion.div>
            <motion.h3 
              className="text-black mb-6 leading-tight" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '30%', marginTop: '3%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Brand Content
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '30%', marginTop: '2%', width: 270 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
            <motion.p 
              className="text-black leading-relaxed" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400, marginLeft: '30%', marginTop: '4%' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              We use computational algorithms and parametric modeling techniques to create highly flexible and adaptive designs. By defining a set of parameters and rules, our designers can explore countless design iterations and variations, allowing for dynamic adjustments based on specific project requirements and constraints.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Block 7: THOUGHT LEADERSHIP (DARK) */}
      <section data-theme="dark" data-block="7" className="w-full bg-black text-white" style={{ marginTop: '150px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12 lg:mb-16">
            <h2 className="md:col-span-6 leading-none" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.02em', marginLeft: '4%', fontSize: 48 }}>
              THOUGHT LEADERSHIP
            </h2>
            <div className="md:col-span-6 flex md:justify-end">
              <div className="max-w-xl md:text-right">
                <p className="text-white/80 mb-5" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}>
                  Keep up with insights, events, and stories from our studios and beyond.
                </p>
                <button className="inline-flex items-center rounded-full px-5 py-3 bg-zinc-900 hover:bg-zinc-800 transition-colors" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
                  Read our Thoughts
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
            <div className="md:col-span-6">
              <div className="overflow-hidden bg-zinc-800" style={{ marginLeft: '5.8%', marginTop: '8%' }}>
                <img src="/media/Fossil-Hero.jpg" alt="Fossil Hero" className="w-full h-[60vh] object-cover aspect-[4/5]" />
              </div>
            </div>
            <div className="md:col-span-6" style={{ marginLeft: '60px', marginTop: 30 }}>
              <ul className="divide-y divide-white/10">
                {[1,2,3].map((i) => (
                  <li key={i} className="py-8">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-[12px] tracking-[0.12em] text-white/60 mb-2">
                          <span className="inline-block w-1.5 h-1.5 bg-white/40" />
                          <span style={{ fontFamily: 'Lausanne' }}>{i===1?'NEWS': i===2? 'LAB, REPORTS':'INSIGHTS'}</span>
                          <span className="mx-1">|</span>
                          <span style={{ fontFamily: 'Lausanne' }}>{i===1?'2 MIN READ': i===2? '4 MIN READ':'3 MIN READ'}</span>
                          <span className="mx-1">|</span>
                          <span style={{ fontFamily: 'Lausanne' }}>{i===1?'15 JULY 2025': i===2? '2 JULY 2025':'16 JUNE 2025'}</span>
                        </div>
                        <h3 className="leading-tight" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 37 }}>
                          {i===1? 'Howden Rebrand Signals Global Growth Push' : i===2? 'Brand Audit: Current Identity vs. Market Impact' : 'Future of Branding: Trends Shaping Identity and Growth'}
                        </h3>
                      </div>
                      <button className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors" aria-label="Open">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
                 <div className="overflow-hidden" style={{ width: '100%', '--marqueeSize': 'clamp(120px, 30vw, 200px)', height: 'calc(var(--marqueeSize) * 1.08)', marginTop: 50 }}>
          <div className="flex whitespace-nowrap animate-scroll items-center" style={{ fontFamily: 'Lausanne', fontSize: 'var(--marqueeSize)', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 1, padding: '0.04em 0', color: 'white' }}>
            <span>INSIGHTS</span>
            <img src="/media/whiteicon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
            <span>REPORTS</span>
            <img src="/media/whiteicon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
            <span>NEWS</span>
            <img src="/media/whiteicon.svg" className="mx-8" style={{ width: '0.8em', height: '0.8em' }} alt="" />
            <span>INSIGHTS</span>
          </div>
        </div>
      </section>

      {/* Block 8 (LIGHT) */}
      <section data-theme="light" data-block="8" className="w-full bg-white py-24">
  <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
    <h2
      className="text-black mb-16"
      style={{
        fontFamily: 'Lausanne',
        fontSize: 'clamp(40px, 6vw, 72px)',
        fontWeight: 400,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        marginLeft: '-45px',
        marginTop: '4%',
      }}
    >
      Transforming Industry Futures
    </h2>

        <div className="relative" style={{ marginLeft: '-45px' }}>
       {/* Horizontal slider container */}
       <div 
         className="flex gap-8 overflow-x-auto scroll-smooth pb-4"
         style={{ 
           scrollbarWidth: 'none', 
           msOverflowStyle: 'none',
           WebkitScrollbar: { display: 'none' }
         }}
       >
         {[
           { title: 'Real Estate', image: '/media/industries-1.jpg' },
           { title: 'Automotive', image: '/media/industries-3.jpg' },
           { title: 'FMCG', image: '/media/industries-2.jpg' },
           { title: 'Aerospace', image: '/media/industries-1.jpg' },
           { title: 'Banking', image: '/media/industries-3.jpg' },
           { title: 'Finance', image: '/media/industries-2.jpg' },
           { title: 'WEARABLES', image: '/media/industries-1.jpg' },
           { title: 'ENTERPRISE & SAAS', image: '/media/industries-3.jpg' },
           { title: 'TRAVEL', image: '/media/industries-2.jpg' },
         ].map((item, idx) => (
           <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0" key={idx}>
             <div className="w-full h-[400px] rounded-lg overflow-hidden">
               <img
                 src={item.image}
                 alt={item.title}
                 className="w-full h-full object-cover"
               />
             </div>
             <h3
               className="text-black mt-4"
               style={{
                 fontFamily: 'Lausanne',
                 fontSize: '30px',
                 fontWeight: 400,
               }}
             >
               {item.title}
             </h3>
           </div>
         ))}
       </div>
       
     
       {/* Navigation arrows */}
       <button
         onClick={() => {
           const container = document.querySelector('.overflow-x-auto');
           if (container) {
             container.scrollBy({ left: -400, behavior: 'smooth' });
           }
         }}
         className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-white transition-all duration-200"
         aria-label="Previous"
       >
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
         </svg>
       </button>
       
       <button
         onClick={() => {
           const container = document.querySelector('.overflow-x-auto');
           if (container) {
             container.scrollBy({ left: 400, behavior: 'smooth' });
           }
         }}
         className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 hover:bg-white transition-all duration-200"
         aria-label="Next"
       >
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
         </svg>
       </button>
     </div>
  </div>
</section>


      {/* FOOTER (DARK) — label hides when this is visible */}
      <motion.section ref={footerRef} data-theme="dark" data-block="footer" className="w-screen h-screen relative bg-black" style={{ marginTop: 50, y: footerY }}>
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
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
                <span className="text-white underline" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>Our Story</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
