'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { urlFor } from '../../../../sanity/lib/image';
import { urlForFile } from '../../../../sanity/lib/file';

interface LeadershipArticle {
  _id: string;
  title: string;
  tag: string;
  industry?: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  writer: string;
}

interface LeadershipTemplate {
  _id: string;
  title: string;
  heroImage?: any;
  heroSmallLabel?: string;
  heroTitle?: string;
  heroParagraph?: string;
  heroVideo?: any;
  heroVideoUrl?: string;
  articlesTitle?: string;
  industries?: string[];
  footerTitle?: string;
  footerParagraph?: string;
  footerLogo?: any;
}

interface Props {
  leadershipTemplate: LeadershipTemplate;
  articles: LeadershipArticle[];
  serviceSlug: string;
}

export default function LeadershipPageClientCMS({ leadershipTemplate, articles, serviceSlug }: Props) {
  const videoRef = useRef(null);
  const footerRef = useRef(null);
  const [showMoreArticles, setShowMoreArticles] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkUnderLabel, setIsDarkUnderLabel] = useState(false);
  const [hidePinned, setHidePinned] = useState(false);
  const [headerColor, setHeaderColor] = useState<'black' | 'white' | null>('black');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isFilterDropdownOpen && !target.closest('.filter-dropdown-container')) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  // Close menu when header is hidden
  useEffect(() => {
    if (headerColor === null && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [headerColor, isMenuOpen]);

  // Compute current header color based on section under viewport center and theme
  useEffect(() => {
    const getThemeAtViewportCenter = () => {
      const centerY = window.innerHeight * 0.5;
      const themedEls = Array.from(document.querySelectorAll('[data-theme]')) as HTMLElement[];
      let theme: string = 'light';
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
        const sections = Array.from(document.querySelectorAll('[data-block]')) as HTMLElement[];
        for (const section of sections) {
          const r = section.getBoundingClientRect();
          if (r.top <= centerY && r.bottom >= centerY) {
            const blockType = section.dataset?.block;
            if (blockType === '1') return 'white';
            if (blockType === '7') return 'white';
            if (blockType === 'footer') return null;
            if (['2','3','4','5','6','8'].includes(blockType || '')) return 'black';
          }
        }
        return 'black';
      } catch {
        return 'black';
      }
    };

    const refresh = () => {
      try {
        const theme = getThemeAtViewportCenter();
        setIsDarkUnderLabel(theme === 'dark');
        const newHeaderColor = getHeaderColor();
        setHeaderColor(newHeaderColor as any);
        const footer = footerRef.current as any;
        if (footer) {
          const fr = (footer as HTMLElement).getBoundingClientRect();
          const isFooterVisible = fr.top < window.innerHeight && fr.bottom > 0;
          setHidePinned(isFooterVisible);
        }
      } catch {}
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

  // Get industries from CMS or use defaults
  const industries = leadershipTemplate.industries && leadershipTemplate.industries.length > 0 
    ? leadershipTemplate.industries
    : ['Automotive', 'Healthcare', 'Technology', 'Finance', 'Real Estate'];

  // Get unique categories from articles for the Filter dropdown
  const availableCategories = Array.from(new Set(articles.map(article => article.tag).filter(Boolean)));

  // Filter articles based on current filter and showMoreArticles state
  const filteredArticles = selectedFilter === 'All'
    ? (showMoreArticles ? articles : articles.slice(0, 8)) // Show first 8 articles (2 rows) by default
    : articles.filter(article => {
        // Check if the selected filter is an industry (from left buttons) or a category (from right dropdown)
        const isIndustryFilter = industries.includes(selectedFilter);
        if (isIndustryFilter) {
          return article.industry === selectedFilter;
        } else {
          return article.tag === selectedFilter;
        }
      });

  // Get video source
  const getVideoSrc = () => {
    if (leadershipTemplate.heroVideo?.asset?._ref) {
      return urlForFile(leadershipTemplate.heroVideo);
    }
    if (leadershipTemplate.heroVideoUrl) {
      return leadershipTemplate.heroVideoUrl;
    }
    return '/media/leadership.mp4'; // fallback
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Logo and Menu */}
      <motion.div 
        className="fixed top-8 left-8 z-[60] flex items-center gap-6" 
        style={{ color: headerColor || 'white' }}
        animate={{ opacity: headerColor === null ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col gap-1 cursor-pointer">
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ backgroundColor: headerColor || 'white' }} />
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: headerColor || 'white' }} />
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ backgroundColor: headerColor || 'white' }} />
        </button>
        <motion.h1 className="font-bold tracking-wider" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 20px)', letterSpacing: '0.2em', color: headerColor || 'white' }}>
          TOMORROW
        </motion.h1>
      </motion.div>

      {/* Mega Menu Panel */}
      {isMenuOpen && headerColor !== null && (
        <div className="fixed left-0 right-0 top-[var(--header-h)] z-40 bg-white shadow-xl h-[calc(100vh-72px-100px)] overflow-hidden">
          <div className="w-full h-full flex">
            <div className="w-80 bg-black h-full flex flex-col overflow-auto">
              <div className="p-6"><button onClick={() => setIsMenuOpen(false)} className="text-white text-2xl font-light hover:text-gray-300 transition-colors" /></div>
              <div className="h-10" />
              <div className="flex-1 px-6">
                <nav className="space-y-1">
                  {[
                    { name: 'Industries', hasArrow: true },
                    { name: 'Capabilities', hasArrow: true },
                    { name: 'Our Insights', hasArrow: true },
                    { name: 'Locations', hasArrow: false },
                    { name: 'Careers', hasArrow: true },
                    { name: 'About Us', hasArrow: true }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between py-3 px-4 cursor-pointer transition-colors text-white hover:bg-gray-800`}>
                      <span className="text-base" style={{ fontFamily: 'Lausanne' }}>{item.name}</span>
                      {item.hasArrow && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex-1 bg-white h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="relative">
                  <input type="text" placeholder="Type to search..." className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Lausanne' }}>Leadership</h3>
                  <div className="w-16 h-0.5 bg-gray-300" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    ['Strategic Leadership','Executive Coaching','Team Development','Change Management','Organizational Design','Culture Transformation'],
                    ['Leadership Assessment','Succession Planning','Performance Management','Talent Development','Leadership Training','Executive Search'],
                    ['Leadership Research','Leadership Workshops','Leadership Consulting','Leadership Evolution','Leadership Launch','Leadership Management']
                  ].map((col, ci) => (
                    <div className="space-y-4" key={ci}>
                      {col.map((s, i) => (
                        <div key={i} className="text-black hover:text-gray-600 cursor-pointer transition-colors"><span style={{ fontFamily: 'Lausanne' }}>{s}</span></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Leadership Header */}
      <div className="w-screen h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {leadershipTemplate.heroImage?.asset?._ref ? (
            <img
              src={urlFor(leadershipTemplate.heroImage).width(1920).height(1080).quality(90).url()}
              alt="Leadership Background"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/media/industries.png"
              alt="Leadership Background"
              className="w-full h-full object-cover"
            />
          )}
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
              Thought Leadership
            </h1>
          </div>
        </div>
      </div>

      {/* Articles Grid Section */}
      <section data-theme="light" data-block="2" className="w-full bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="mb-16">
            <h2 className="text-black mb-8" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {leadershipTemplate.articlesTitle || 'Leadership Articles'}
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div className="flex flex-wrap gap-4">
                {['All', ...industries].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-3 rounded-full transition-colors ${
                      selectedFilter === filter
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              {/* Filter Button with Dropdown */}
              <div className="relative filter-dropdown-container">
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}
                >
                  Filter
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isFilterDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      {availableCategories.length > 0 ? (
                        availableCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedFilter(category);
                              setIsFilterDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                            style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}
                          >
                            {category}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500 text-sm">
                          No categories available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredArticles.map((article, index) => (
              <Link key={index} href={`/services/${serviceSlug}/Leadership/${article.slug.current}`}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                    <img
                      src={article.mainImage ? urlFor(article.mainImage).url() : '/media/article-1.jpg'}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: 'Lausanne' }}>
                      {article.tag}
                    </span>
                  </div>
                  <h3 className="text-black group-hover:text-gray-600 transition-colors" style={{ fontFamily: 'Lausanne', fontSize: 18, fontWeight: 400, lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Show More Button */}
          {selectedFilter === 'All' && articles.length > 8 && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowMoreArticles(!showMoreArticles)}
                className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 400 }}
              >
                {showMoreArticles ? 'Show Less' : 'Show More Articles'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <motion.section ref={footerRef} data-theme="dark" data-block="footer" className="w-screen h-screen relative bg-black" style={{ marginTop: 50, y: footerY }}>
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex-1 flex items-center px-8 lg:px-16">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <motion.div className="lg:w-1/2 mb-8 lg:mb-0" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                <h2 className="text-white mb-6" style={{ fontFamily: 'Ghost', fontStyle: 'italic', fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 0.9 }}>
                  {leadershipTemplate.footerTitle || 'Our<br />Story'}
                </h2>
                <p className="text-white max-w-md" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(18px, 1.5vw, 24px)', lineHeight: 1.5, fontWeight: 400 }}>
                  {leadershipTemplate.footerParagraph || 'The story behind The Tomorrow is one of exploration, creativity and curiosity.'}
                </p>
              </motion.div>
              <motion.div className="lg:w-1/2 flex justify-center lg:justify-end" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }}>
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                  <img 
                    src={leadershipTemplate.footerLogo ? urlFor(leadershipTemplate.footerLogo).url() : '/media/TheTomorrow_LogoWhite.svg'} 
                    alt="The Tomorrow Logo" 
                    className="w-full h-full object-contain" 
                  />
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
