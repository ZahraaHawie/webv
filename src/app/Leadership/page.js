'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { client, urlFor } from '../../sanity/lib/client';
import { motion, useScroll, useTransform } from 'framer-motion'

export default function LeadershipPage() {
  const videoRef = useRef(null);
  const footerRef = useRef(null);
  const [showMoreArticles, setShowMoreArticles] = useState(false);
  // Filters
  const [selectedType, setSelectedType] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [selectedTransformation, setSelectedTransformation] = useState('All');
  const [isTransformationOpen, setIsTransformationOpen] = useState(false);
  const searchParams = useSearchParams();

  // Header menu state (copied from services/brand header)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null); // 'industries' | 'services' | 'work' | 'ideas' | 'profile' | null
  const [activeIdeasIndex, setActiveIdeasIndex] = useState(0);
  const [activeIndustriesIndex, setActiveIndustriesIndex] = useState(0);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const [activeServicesIndex, setActiveServicesIndex] = useState(0);
  const [headerColor, setHeaderColor] = useState('black');

  const serviceHrefs = [
    '/services/brand-transformation',
    '/services/digital-transformation',
    '/services/media-transformation',
    '/services/ai-transformation',
    '/services/spatial-transformation',
  ];
  const industriesMenu = [
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

  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  // Fetch posts from Sanity and map to articles
  const [articles, setArticles] = useState([]);

  // Industries list sourced from services/brand page mega menu
  const industries = [
    { title: 'Technology' },
    { title: 'Healthcare' },
    { title: 'Finance' },
    { title: 'Retail' },
    { title: 'Education' },
    { title: 'Manufacturing' },
    { title: 'Real Estate' },
    { title: 'Energy' },
    { title: 'Transportation' },
    { title: 'Media & Entertainment' },
    { title: 'Food & Beverage' },
    { title: 'Automotive' },
    { title: 'Fashion & Beauty' },
    { title: 'Sports & Fitness' },
    { title: 'Government' }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          title,
          "slug": slug.current,
          // tag is currently used as category/type in UI (Blog, Podcasts, etc.)
          tag,
          // optional fields if present in CMS
          type,
          industry,
          transformation,
          mainImage
        }`;
        const posts = await client.fetch(query);
        const mapped = posts.map((p) => ({
          title: p.title,
          // Prefer explicit type if available, otherwise tag (current schema)
          type: p.type || p.tag || 'Uncategorized',
          industry: p.industry || null,
          transformation: p.transformation || null,
          imgSrc: p.mainImage ? urlFor(p.mainImage).url() : '/media/panel-1.png',
          slug: p.slug,
        }));
        setArticles(mapped);
      } catch (e) {
        console.error('Failed to load posts', e);
      }
    };
    fetchPosts();
  }, []);

  // Initialize filters from URL params (e.g., ?type=Events)
  useEffect(() => {
    const typeQ = searchParams?.get('type');
    if (typeQ) {
      setSelectedType(typeQ);
      setShowMoreArticles(true);
    }
  }, [searchParams]);

  // Filter articles based on current filters
  const byType = (a) => selectedType === 'All' ? true : (a.type === selectedType);
  const byIndustry = (a) => selectedIndustry === 'All' ? true : (a.industry === selectedIndustry);
  const byTransformation = (a) => selectedTransformation === 'All' ? true : (a.transformation === selectedTransformation);
  const filtered = articles.filter(a => byType(a) && byIndustry(a) && byTransformation(a));
  const filteredArticles = showMoreArticles ? filtered : filtered.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header Navigation (from services/brand) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
        animate={{ opacity: headerColor === null ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
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
              <motion.div
                key={item}
                className="relative"
                onMouseEnter={() => {
                  setActiveMenu(item.toLowerCase());
                  setIsMenuOpen(true);
                }}
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
                  className={`font-medium tracking-wide transition-colors duration-200 ${
                    item === 'Ideas' ? 'text-black' : 'text-black/80 hover:text-black'
                  }`}
                  style={{ fontFamily: 'Lausanne', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.button>
              </motion.div>
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

        {/* Industries Mega Menu */}
        {isMenuOpen && activeMenu === 'industries' && (
          <motion.div className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white"
            initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}>
            <div className="w-screen max-w-none">
              <div className="grid grid-cols-12 gap-0 px-6 md:px-10 lg:px-16 py-10">
                <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                  <nav>
                    {industriesMenu.slice(0,5).map((item, idx) => (
                      <Link key={item.title} href={item.href} className={`block w-full text-left py-5 transition-colors ${idx===activeIndustriesIndex?'text-black':'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }} onMouseEnter={() => setActiveIndustriesIndex(idx)}>
                        <span className="inline-flex items-center gap-3"><span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx+1).padStart(2,'0')}</span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-4 pr-6 md:pr-8 lg:pr-10">
                  <nav>
                    {industriesMenu.slice(5,10).map((item, idx) => (
                      <Link key={item.title} href={item.href} className={`block w-full text-left py-5 transition-colors ${(idx+5)===activeIndustriesIndex?'text-black':'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }} onMouseEnter={() => setActiveIndustriesIndex(idx+5)}>
                        <span className="inline-flex items-center gap-3"><span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx+6).padStart(2,'0')}</span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-4">
                  <nav>
                    {industriesMenu.slice(10,15).map((item, idx) => (
                      <Link key={item.title} href={item.href} className={`block w-full text-left py-5 transition-colors ${(idx+10)===activeIndustriesIndex?'text-black':'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }} onMouseEnter={() => setActiveIndustriesIndex(idx+10)}>
                        <span className="inline-flex items-center gap-3"><span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx+11).padStart(2,'0')}</span>{item.title}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Services Mega Menu */}
        {isMenuOpen && activeMenu === 'services' && (
          <motion.div className="mega-menu-container absolute left-0 right-0 top-full z-[70] bg-white"
            initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
            onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => { setIsMenuOpen(false); setActiveMenu(null); }}>
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
                        <Link href={item.href} className={`block w-full text-left py-5 transition-colors ${idx===activeServicesIndex?'text-black':'text-zinc-500 hover:text-black'}`} style={{ fontFamily: 'Lausanne', fontSize: 24, letterSpacing: '0.02em' }}>
                          <span className="inline-flex items-center gap-3"><span className="text-zinc-400 text-sm" style={{ fontFamily: 'Lausanne' }}>{String(idx+1).padStart(2,'0')}</span>{item.title}</span>
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
                    <div key={idx} className={`${idx===activeServicesIndex?'block':'hidden'}`}>
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
      </motion.div>
      {/* Leadership Header */}
      <div className="w-screen h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/media/industries.png"
            alt="Leadership Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full h-full">
          <div className="absolute bottom-0 left-0 z-20 pl-[2.5vw] pb-[5vh]">
            <h1
              className="text-white"
              style={{
                fontFamily: 'Lausanne',
                fontWeight: 600,
                fontSize: '100px',
                lineHeight: '0.88',
                letterSpacing: '-0.02em',
              }}
            >
              Ideas
            </h1>
          </div>
        </div>
      </div>

      {/* Dynamic Title Section */}
      <div className="pt-32 pb-2 bg-white">
        <div className="ml-8 mr-8 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16">
          <h2 
            className="text-black font-bold leading-tight" 
            style={{ 
              fontFamily: 'Lausanne', 
              fontSize: 'clamp(48px, 6vw, 80px)', 
              lineHeight: 1.1, 
              fontWeight: 600, 
              letterSpacing: '-0.02em' 
            }}
          >
            {selectedType !== 'All' ? selectedType : (selectedIndustry !== 'All' ? selectedIndustry : (selectedTransformation !== 'All' ? selectedTransformation : 'All'))}
          </h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className="pt-6 pb-10 bg-white">
        <div className="ml-8 mr-8 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16">
          <div className="flex flex-wrap items-center justify-start gap-4">
            {/* All button */}
            <button
              onClick={() => { setSelectedType('All'); setSelectedIndustry('All'); setSelectedTransformation('All'); setShowMoreArticles(false); setIsTypeOpen(false); setIsIndustryOpen(false); setIsTransformationOpen(false); }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType === 'All' && selectedIndustry === 'All' && selectedTransformation === 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
              style={{ fontFamily: 'Lausanne' }}
            >
              All
            </button>

            {/* By Type dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsTypeOpen(!isTypeOpen); setIsIndustryOpen(false); setIsTransformationOpen(false); }}
                className={`pl-6 pr-10 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${selectedType !== 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                style={{ fontFamily: 'Lausanne' }}
              >
                By Type{selectedType !== 'All' ? `: ${selectedType}` : ''}
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isTypeOpen && (
                <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {['Blog', 'Podcasts', 'Events', 'Reports', 'Keynotes'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setSelectedType(t); setIsTypeOpen(false); setShowMoreArticles(true); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedType === t ? 'font-semibold' : ''}`}
                      style={{ fontFamily: 'Lausanne' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* By Industry dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsIndustryOpen(!isIndustryOpen); setIsTypeOpen(false); setIsTransformationOpen(false); }}
                className={`pl-6 pr-10 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${selectedIndustry !== 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                style={{ fontFamily: 'Lausanne' }}
              >
                By Industry{selectedIndustry !== 'All' ? `: ${selectedIndustry}` : ''}
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${isIndustryOpen ? 'rotate-180' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isIndustryOpen && (
                <div className="absolute mt-2 w-64 max-h-72 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {industries.map((ind) => (
                    <button
                      key={ind.title}
                      onClick={() => { setSelectedIndustry(ind.title); setIsIndustryOpen(false); setShowMoreArticles(true); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedIndustry === ind.title ? 'font-semibold' : ''}`}
                      style={{ fontFamily: 'Lausanne' }}
                    >
                      {ind.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* By Transformation dropdown */}
            <div className="relative">
              <button
                onClick={() => { setIsTransformationOpen(!isTransformationOpen); setIsTypeOpen(false); setIsIndustryOpen(false); }}
                className={`pl-6 pr-10 py-3 rounded-full text-sm font-medium transition-colors duration-200 ${selectedTransformation !== 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                style={{ fontFamily: 'Lausanne' }}
              >
                By Transformation{selectedTransformation !== 'All' ? `: ${selectedTransformation}` : ''}
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${isTransformationOpen ? 'rotate-180' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isTransformationOpen && (
                <div className="absolute mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {['Brand Transformation','Digital Transformation','Media Transformation','AI Transformation','Spatial Transformation'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setSelectedTransformation(t); setIsTransformationOpen(false); setShowMoreArticles(true); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedTransformation === t ? 'font-semibold' : ''}`}
                      style={{ fontFamily: 'Lausanne' }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Panels Container - all filtered panels together */}
      <div className="pt-0 pb-20">
        <div className="ml-8 mr-8 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr" style={{ gridAutoFlow: 'row' }}>
            {filteredArticles.map((article, index) => (
              <Link key={index} href={`/Leadership/${article.slug}`} className="flex flex-col">
                <div className="rounded-lg overflow-hidden h-[400px] bg-gray-100 relative">
                  {article.type && (
                    <div className="absolute top-4 left-4 bg-black text-white rounded-full px-4 py-2 text-sm font-medium" style={{ fontFamily: 'Lausanne' }}>
                      {article.type}
                    </div>
                  )}
                  <img
                    src={article.imgSrc}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-left mt-4 text-lg font-semibold" style={{ fontFamily: 'Lausanne' }}>
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* View More Articles Section */}
      {!showMoreArticles && selectedType === 'All' && selectedIndustry === 'All' && selectedTransformation === 'All' && articles.length > 8 && (
        <div className="pt-16 pb-20 bg-white">
          <div className="ml-8 mr-8 md:ml-12 md:mr-12 lg:ml-16 lg:mr-16">
            <div className="text-center">
              <button 
                onClick={() => setShowMoreArticles(true)}
                className="text-black text-lg font-medium hover:text-gray-700 transition-colors duration-200" 
                style={{ fontFamily: 'Lausanne' }}
              >
                View more articles +
              </button>
              <div className="w-45 h-px bg-black mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      )}

       {/* FOOTER (DARK) — with slide-in animation */}
       <motion.section ref={footerRef} className="w-screen h-screen relative bg-black" style={{ marginTop: 50, y: footerY }}>
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
    </div>
  );
}
