'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import HeaderMegaMenu from '../../components/HeaderMegaMenu';

export default function ServicesPage() {
  const videoRef = useRef(null);
  const secondBlockRef = useRef(null);
  const footerRef = useRef(null);
  const headerInnerRef = useRef(null);
  const servicesBtnRef = useRef(null);
  const [secondBlockInView, setSecondBlockInView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'industries' | 'services' | 'work' | 'ideas' | 'profile' | null
  const [activeIdeasIndex, setActiveIdeasIndex] = useState(0);
  const [activeIndustriesIndex, setActiveIndustriesIndex] = useState(0);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [activeServicesIndex, setActiveServicesIndex] = useState(0);
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });
  
  // Theme-aware pinned label states
  const [isDarkUnderLabel, setIsDarkUnderLabel] = useState(false);
  const [hidePinned, setHidePinned] = useState(false);
  const [headerColor, setHeaderColor] = useState('white');

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
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
        
        return 'white'; // default
      } catch (error) {
        console.warn('Error in getHeaderColor:', error);
        return 'white'; // fallback
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

  // Scroll animations for second block
  const { scrollYProgress } = useScroll({
    target: secondBlockRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.6], [100, 0, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0.5, 1]);
  const titleBlur = useTransform(scrollYProgress, [0, 0.15, 0.4], [10, 5, 0]);
  
  const contentY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6], [0, 0.5, 1]);

  // Footer slide-in animation
  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

  return (
    <>
      {/* Fixed Header Navigation (reusable) */}
      <HeaderMegaMenu activeItem="services" />

        {/* Work Mega Menu — keep if unique to Services; else can be moved into component later */}
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
                      </div>
                        <div className="md:col-span-6">
                          <Link href={serviceHrefs[idx]}>
                            <div className="w-full h-64 rounded-lg bg-zinc-100 overflow-hidden">
                              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                                <source src="/media/services-menu.mp4" type="video/mp4" />
                              </video>
                </div>
                          </Link>
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
                      blurb: '15+ years of experience in branding. I believe every consumer is a human at their core, and every interaction—whether with a brand story, product, or media—is an experience. Only those built on mental, emotional, and behavioral connections create the maximum impact to solve tomorrow\'s challenges.',
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
                </div>
              </div>
            </div>
                  ))}
          </div>
        </div>
            </div>
          </motion.div>
        )}

    
      <section data-theme="light" data-block="1" className="w-screen h-screen relative overflow-hidden">
        {/* Background Video */}
            <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media/services-header.mp4" type="video/mp4" />
              </video>
          <div className="absolute inset-0 bg-black/50"></div>
            </div>

        {/* Main Content */}
        <div className="relative z-10 w-full h-full">
          {/* Services Title */}
          <div className="absolute bottom-0 left-0 z-20 pl-[2.5vw] pb-[5vh]">
            <h1 
              className="text-white"
              style={{ 
                fontFamily: 'Lausanne', 
                fontWeight: 600,
                fontSize: 'clamp(120px, 11.5vw, 190px)',
                lineHeight: '0.88',
                letterSpacing: '-0.02em'
              }}
            >
              Services
            </h1>
          </div>
        </div>
      </section>

      {/* Second Block - AI Strategy & Execution */}
      <section data-theme="light" data-block="2" className="relative">
        {/* Sticky Background Video Container */}
        <div className="sticky top-0 w-screen h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/block.mp4" type="video/mp4" />
            </video>
        </div>
        </div>

        {/* Scroll Container for Animations */}
        <div ref={secondBlockRef} className="relative w-screen h-screen">
          {/* Content */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center">
            <div className="pl-[5vw] pt-[4vh]">
              {/* Main Title */}
              <motion.h2 
                className="text-white leading-tight"
                style={{ 
                  fontFamily: 'Ghost',
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 8vw, 150px)',
                  lineHeight: '0.9',
                  y: titleY,
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`
                }}
              >
                Brand<br />Transformation
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-white mt-66 max-w-md"
                style={{ 
                  fontFamily: 'Lausanne',
                  fontSize: 'clamp(18px, 1.5vw, 28px)',
                  lineHeight: '1.4',
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Driving AI transformation for products, platforms and people.
              </motion.p>

              {/* Button */}
              <motion.button 
                className="mt-8 bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-neutral-600 transition-colors"
                style={{
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Explore →
              </motion.button>
        </div>
          </div>
        </div>
      </section>

      {/* Third Block - Copy of Second Block */}
      <section data-theme="light" data-block="3" className="relative">
        {/* Sticky Background Video Container */}
        <div className="sticky top-0 w-screen h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/services-header.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scroll Container for Animations */}
        <div className="relative w-screen h-screen">
          {/* Content */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center">
            <div className="pl-[5vw] pt-[4vh]">
              {/* Main Title */}
              <motion.h2 
                className="text-white leading-tight"
                style={{ 
                  fontFamily: 'Ghost',
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 8vw, 150px)',
                  lineHeight: '0.9',
                  y: titleY,
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`
                }}
              >
                Digital<br />Transformation
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-white mt-66 max-w-md"
                style={{ 
                  fontFamily: 'Lausanne',
                  fontSize: 'clamp(18px, 1.5vw, 28px)',
                  lineHeight: '1.4',
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                This is the third block description text.
              </motion.p>

              {/* Button */}
              <motion.button 
                className="mt-8 bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-neutral-600 transition-colors"
                style={{
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Explore →
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Block - Copy of Second Block */}
      <section data-theme="light" data-block="4" className="relative">
        {/* Sticky Background Video Container */}
        <div className="sticky top-0 w-screen h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/block.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scroll Container for Animations */}
        <div className="relative w-screen h-screen">
          {/* Content */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center">
            <div className="pl-[5vw] pt-[4vh]">
              {/* Main Title */}
              <motion.h2 
                className="text-white leading-tight"
                style={{ 
                  fontFamily: 'Ghost',
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 8vw, 150px)',
                  lineHeight: '0.9',
                  y: titleY,
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`
                }}
              >
                Marketing<br />Transformation
              </motion.h2>

              {/* Description */}
            <motion.p 
                className="text-white mt-66 max-w-md"
                style={{ 
                  fontFamily: 'Lausanne',
                  fontSize: 'clamp(18px, 1.5vw, 28px)',
                  lineHeight: '1.4',
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                This is the fourth block description text.
            </motion.p>

              {/* Button */}
              <motion.button 
                className="mt-8 bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-neutral-600 transition-colors"
                style={{
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Explore →
              </motion.button>
          </div>
          </div>
        </div>
      </section>

      {/* Fifth Block - Copy of Second Block */}
      <section data-theme="light" data-block="5" className="relative">
        {/* Sticky Background Video Container */}
        <div className="sticky top-0 w-screen h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/services-header.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scroll Container for Animations */}
        <div className="relative w-screen h-screen">
          {/* Content */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center">
            <div className="pl-[5vw] pt-[4vh]">
              {/* Main Title */}
              <motion.h2 
                className="text-white leading-tight"
                style={{ 
                  fontFamily: 'Ghost',
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 8vw, 150px)',
                  lineHeight: '0.9',
                  y: titleY,
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`
                }}
              >
                AI<br />Transformation
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-white mt-66 max-w-md"
                style={{ 
                  fontFamily: 'Lausanne',
                  fontSize: 'clamp(18px, 1.5vw, 28px)',
                  lineHeight: '1.4',
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                This is the fifth block description text.
              </motion.p>

              {/* Button */}
              <motion.button 
                className="mt-8 bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-neutral-600 transition-colors"
                style={{
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Explore →
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Sixth Block - Copy of Second Block */}
      <section data-theme="light" data-block="6" className="relative">
        {/* Sticky Background Video Container */}
        <div className="sticky top-0 w-screen h-screen">
          <div className="w-full h-full relative overflow-hidden">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/media/block.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Scroll Container for Animations */}
        <div className="relative w-screen h-screen">
          {/* Content */}
          <div className="absolute inset-0 z-20 w-full h-full flex items-center">
            <div className="pl-[5vw] pt-[4vh]">
              {/* Main Title */}
              <motion.h2 
                className="text-white leading-tight"
                style={{ 
                  fontFamily: 'Ghost',
                  fontStyle: 'italic',
                  fontSize: 'clamp(80px, 8vw, 150px)',
                  lineHeight: '0.9',
                  y: titleY,
                  opacity: titleOpacity,
                  filter: `blur(${titleBlur}px)`
                }}
              >
                Spatial<br />Transformation
              </motion.h2>

              {/* Description */}
              <motion.p 
                className="text-white mt-66 max-w-md"
                style={{ 
                  fontFamily: 'Lausanne',
                  fontSize: 'clamp(18px, 1.5vw, 28px)',
                  lineHeight: '1.4',
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                This is the sixth block description text.
              </motion.p>

              {/* Button */}
              <motion.button 
                className="mt-8 bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-neutral-600 transition-colors"
                style={{
                  y: contentY,
                  opacity: contentOpacity
                }}
              >
                Explore →
              </motion.button>
          </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <motion.section ref={footerRef} data-theme="dark" data-block="footer" className="w-screen h-screen relative bg-black" style={{ marginTop: 50, y: footerY }}>
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Main Content Area */}
          <div className="flex-1 flex items-center px-8 lg:px-16">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
              {/* Left Side - Text Content */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 
                  className="text-white mb-6"
                  style={{ 
                    fontFamily: 'Ghost',
                    fontStyle: 'italic',
                    fontSize: 'clamp(60px, 8vw, 120px)',
                    lineHeight: '0.9'
                  }}
                >
                  Our<br />Story
                </h2>
                <p 
                  className="text-white max-w-md"
                  style={{ 
                    fontFamily: 'Lausanne',
                    fontSize: 'clamp(18px, 1.5vw, 24px)',
                    lineHeight: '1.5',
                    fontWeight: 400
                  }}
                >
                  The story behind The Tomorrow is one of exploration, creativity and curiosity.
                </p>
              </div>

              {/* Right Side - Logo */}
              <div className="lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                  <img 
                    src="/media/TheTomorrow_LogoWhite.svg" 
                    alt="The Tomorrow Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
            </div>
          </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="border-t border-gray-600 px-8 lg:px-16 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
              {/* Left Column - Contact Information */}
              <div className="mb-6 lg:mb-0">
                <div 
                  className="text-white space-y-1"
                  style={{ 
                    fontFamily: 'Lausanne',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    fontWeight: 400
                  }}
                >
                  <div>Willem II Singel 8</div>
                  <div>6041 HS, Roermond</div>
                  <div>The Netherlands</div>
                  <div>hello@exoape.com</div>
                </div>
              </div>

              {/* Right Column - Navigation Links */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                {/* Left Sub-column */}
                <div 
                  className="text-white space-y-1"
                  style={{ 
                    fontFamily: 'Lausanne',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    fontWeight: 400
                  }}
                >
                  <div>Work</div>
                  <div>Studio</div>
                  <div>News</div>
                  <div>Contact</div>
                </div>

                {/* Right Sub-column */}
                <div 
                  className="text-white space-y-1"
                  style={{ 
                    fontFamily: 'Lausanne',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    fontWeight: 400
                  }}
                >
                  <div>Behance</div>
                  <div>Dribbble</div>
                  <div>Linkedin</div>
                  <div>Instagram</div>
                </div>
              </div>
            </div>

            {/* Bottom Right Link */}
            <div className="mt-8 flex justify-end">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                <span 
                  className="text-white underline"
                  style={{ 
                    fontFamily: 'Lausanne',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  Our Story
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}