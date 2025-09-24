'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeaderMegaMenu({ activeItem = null }) {
  const headerInnerRef = useRef(null);
  const buttonRefs = {
    Industries: useRef(null),
    Services: useRef(null),
    Work: useRef(null),
    Ideas: useRef(null),
    Profile: useRef(null)
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeIdeasIndex, setActiveIdeasIndex] = useState(0);
  const [activeIndustriesIndex, setActiveIndustriesIndex] = useState(0);
  const [activeServicesIndex, setActiveServicesIndex] = useState(0);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });
  const [headerColor, setHeaderColor] = useState('white');

  // Data for mega menus
  const serviceHrefs = [
    '/services/brand-transformation',
    '/services/digital-transformation',
    '/services/media-transformation',
    '/services/ai-transformation',
    '/services/spatial-transformation',
  ];

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

  const ideasItems = [
    { title: 'Blog', k: 'thought' },
    { title: 'Podcasts', k: 'cases' },
    { title: 'Events', k: 'insights' },
    { title: 'Reports', k: 'innovation' },
    { title: 'Books', k: 'trends' }
  ];

  useEffect(() => {
    const measure = () => {
      const container = headerInnerRef.current;
      const activeKey = activeItem ? activeItem.charAt(0).toUpperCase() + activeItem.slice(1) : null;
      const ref = activeKey ? buttonRefs[activeKey] : null;
      if (!container || !ref?.current) return setUnderlinePos({ left: 0, width: 0 });
      const cRect = container.getBoundingClientRect();
      const sRect = ref.current.getBoundingClientRect();
      setUnderlinePos({ left: sRect.left - cRect.left, width: sRect.width });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeItem]);

  useEffect(() => {
    const getHeaderColor = () => {
      try {
        const centerY = window.innerHeight * 0.5;
        const sections = Array.from(document.querySelectorAll('[data-block]'));
        for (const section of sections) {
          const r = section.getBoundingClientRect();
          if (r.top <= centerY && r.bottom >= centerY) {
            const blockType = section.dataset?.block;
            if (blockType === 'footer') return null;
            if (['2','3','4','5','6','8'].includes(blockType)) return 'black';
            return 'white';
          }
        }
        return 'white';
      } catch {
        return 'white';
      }
    };

    const refresh = () => setHeaderColor(getHeaderColor());
    refresh();
    const onScroll = () => requestAnimationFrame(refresh);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
      animate={{ opacity: headerColor === null ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <div ref={headerInnerRef} className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
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
        <nav className="hidden md:flex items-center gap-10">
          {['Industries', 'Services', 'Work', 'Ideas', 'Profile'].map((item) => (
            <motion.div
              key={item}
              className="relative"
              onMouseEnter={() => { setActiveMenu(item.toLowerCase()); setIsMenuOpen(true); }}
              onMouseLeave={() => {
                setTimeout(() => {
                  const megaMenu = document.querySelector('.mega-menu-container');
                  if (!megaMenu || !megaMenu.matches(':hover')) {
                    setIsMenuOpen(false);
                    setActiveMenu(null);
                  }
                }, 50);
              }}
            >
              <motion.button
                className={`relative transition-colors duration-200 ${
                  (activeItem && item.toLowerCase() === activeItem) ? 'text-black' : 'text-zinc-500 hover:text-black'
                }`}
                style={{ fontFamily: 'Lausanne', fontSize: '16px', fontWeight: 300 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.15 }}
                ref={buttonRefs[item]}
              >
                {item}
              </motion.button>
            </motion.div>
          ))}
        </nav>

        {/* Absolute underline aligned with header's bottom border */}
        {activeItem && (
          <span
            className="absolute bottom-[-1px] h-[2px] bg-black hidden md:block"
            style={{ left: underlinePos.left, width: underlinePos.width }}
          />
        )}

        {/* Right: Auth/Proposal */}
        <div className="hidden md:block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
          <span className="hover:text-black cursor-pointer">Sign In</span>
          <span className="mx-2">|</span>
          <span className="hover:text-black cursor-pointer">Request Proposal</span>
        </div>
      </div>

      {/* Mega Menus pulled from Services page (trimmed to key content) */}
      {/* Industries Mega Menu */}
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
              <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                <nav>
                  {industries.slice(0, 5).map((item, idx) => (
                    <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx)}>
                      <Link href={item.href} className={`block w-full text-left py-5 transition-colors ${idx === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
                        <span className="inline-flex items-center gap-3">
                          <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                <nav>
                  {industries.slice(5, 10).map((item, idx) => (
                    <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx + 5)}>
                      <Link href={item.href} className={`block w-full text-left py-5 transition-colors ${(idx + 5) === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
                        <span className="inline-flex items-center gap-3">
                          <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 6).padStart(2,'0')}</span>
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-4 lg:col-span-4">
                <nav>
                  {industries.slice(10, 15).map((item, idx) => (
                    <div key={item.title} onMouseEnter={() => setActiveIndustriesIndex(idx + 10)}>
                      <Link href={item.href} className={`block w-full text-left py-5 transition-colors ${(idx + 10) === activeIndustriesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
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

      {/* Services Mega Menu */}
      {isMenuOpen && headerColor !== null && activeMenu === 'services' && (
        <motion.div className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2, ease: 'easeOut' }} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}>
          <div className="w-screen max-w-none">
            <div className="grid grid-cols-12 gap-0 px-6 md:px-10 lg:px-16 py-10">
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
                      <Link href={item.href} className={`block w-full text-left py-5 transition-colors ${idx === activeServicesIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
                        <span className="inline-flex items-center gap-3">
                          <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                {[
                  { heading: '', sub: 'Create. Communicate.', blurb: 'A signature program to craft your brand`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.', image: '/media/industries.png' },
                  { heading: '', sub: 'Connect. Catalyze.', blurb: 'A signature program to craft your Digital`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.', image: '/media/industries-3.jpg' },
                  { heading: '', sub: 'Capture. Convert.', blurb: 'A signature program to craft your Media`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.', image: '/media/industries-2.jpg' },
                  { heading: '', sub: 'Generate. Simplify.', blurb: 'A signature program to craft your AI`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.', image: '/media/industries.png' },
                  { heading: '', sub: 'Design in the real world', blurb: 'A signature program to craft your Spatial`s essence with compelling narratives, distinctive identities, and engaging content for unique competitive positioning.', image: '/media/industries-1.jpg' },
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

      {/* Work Mega Menu */}
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
                      <Link href={item.href} className={`block w-full text-left py-5 transition-colors text-zinc-500 hover:text-black`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
                        <span className="inline-flex items-center gap-3">
                          <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                          {item.title}
                        </span>
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                <h3 className="text-black mb-8 whitespace-nowrap" style={{ fontFamily: 'Lausanne', fontSize: 30, fontWeight: 400, letterSpacing: '-0.01em' }}>
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

      {/* Ideas Mega Menu */}
      {isMenuOpen && headerColor !== null && activeMenu === 'ideas' && (
        <motion.div className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2, ease: 'easeOut' }} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}>
          <div className="w-screen max-w-none">
            <div className="grid grid-cols-12 gap-0 px-6 md:px-10 lg:px-16 py-10">
              <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-zinc-200 pr-6 md:pr-8 lg:pr-10">
                <nav className="divide-y divide-zinc-100">
                  {ideasItems.map((item, idx) => (
                    <button key={item.k} className={`w-full text-left py-5 transition-colors ${idx === activeIdeasIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }} onMouseEnter={() => setActiveIdeasIndex(idx)}>
                      <span className="inline-flex items-center gap-3">
                        <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                        {item.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                {[
                  { heading: '', sub: 'Strategic Thinking', blurb: 'Explore our thought leadership content that shapes the future of branding, digital transformation, and creative strategy across industries.' },
                  { heading: '', sub: 'Success Stories', blurb: 'Dive deep into our portfolio of transformative projects and see how we\'ve helped brands achieve remarkable growth and market positioning.' },
                  { heading: '', sub: 'Market Intelligence', blurb: 'Stay ahead with our comprehensive industry analysis, market trends, and strategic insights that drive informed decision-making.' },
                  { heading: '', sub: 'Innovation Hub', blurb: 'Discover cutting-edge methodologies, experimental approaches, and breakthrough technologies that are reshaping the creative landscape.' },
                  { heading: '', sub: 'Future Vision', blurb: 'Explore emerging trends, predictions, and forward-thinking strategies that will define the next decade of brand evolution.' },
                ].map((panel, idx) => (
                  <div key={idx} className={`${idx === activeIdeasIndex ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                      <div className="md:col-span-6">
                        <div className="text-zinc-500 mb-4" style={{ fontFamily: 'Lausanne' }}>{panel.heading}</div>
                        <h3 className="text-black leading-tight mb-5" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400 }}>{panel.sub}</h3>
                        <p className="text-zinc-700 max-w-xl" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>{panel.blurb}</p>
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

      {/* Profile Mega Menu */}
      {isMenuOpen && headerColor !== null && activeMenu === 'profile' && (
        <motion.div className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white" initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2, ease: 'easeOut' }} onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}>
          <div className="w-screen max-w-none">
            <div className="grid grid-cols-12 gap-0 px-6 md:px-10 lg:px-16 py-10">
              <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-zinc-200 pr-6 md:pr-8 lg:pr-10">
                <nav className="divide-y divide-zinc-100">
                  {[
                    { title: 'Company Overview', k: 'what' },
                    { title: 'Careers', k: 'leadership' },
                    { title: 'Founder', k: 'social' },
                    { title: 'Team', k: 'careers' },
                    { title: 'Press & News', k: 'press' },
                  ].map((item, idx) => (
                    <button key={item.k} className={`w-full text-left py-5 transition-colors ${idx === activeProfileIndex ? 'text-black' : 'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }} onMouseEnter={() => setActiveProfileIndex(idx)}>
                      <span className="inline-flex items-center gap-3">
                        <span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx + 1).padStart(2,'0')}</span>
                        {item.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
              <div className="col-span-12 md:col-span-8 lg:col-span-9 pl-6 md:pl-10">
                {[
                  { heading: '', sub: 'Creative Transformation', blurb: 'We help governments, organizations and startups craft experiences that combine technology and anthropology to impact people mentally, emotionally and behaviorally' },
                  { heading: '', sub: 'Experience and vision', blurb: 'Meet the team guiding our work and partnerships.' },
                  { heading: '', sub: 'Haidar Hawie', blurb: '15+ years of experience in branding. I believe every consumer is a human at their core, and every interaction—whether with a brand story, product, or media—is an experience. Only those built on mental, emotional, and behavioral connections create the maximum impact to solve tomorrow\'s challenges.' },
                  { heading: '', sub: 'Top Tier Talent', blurb: 'We are a very small, elite team structure, free from the layers of management that stifle creativity, operating from the sunny lands of Dubai' },
                  { heading: '', sub: 'Newsroom', blurb: 'Latest announcements and brand updates.' },
                ].map((panel, idx) => (
                  <div key={idx} className={`${idx === activeProfileIndex ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                      <div className="md:col-span-6">
                        <div className="text-zinc-500 mb-4" style={{ fontFamily: 'Lausanne' }}>{panel.heading}</div>
                        <h3 className="text-black leading-tight mb-5" style={{ fontFamily: 'Lausanne', fontSize: 36, fontWeight: 400 }}>{panel.sub}</h3>
                        <p className="text-zinc-700 max-w-xl" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>{panel.blurb}</p>
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
    </motion.div>
  );
}


