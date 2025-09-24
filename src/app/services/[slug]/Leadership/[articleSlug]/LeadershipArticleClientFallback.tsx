'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Article {
  title: string;
  tag: string;
  imgSrc: string;
  slug: string;
  writer: string;
  publishedAt: string;
  content: string;
}

interface Props {
  article: Article;
  serviceSlug: string;
}

export default function LeadershipArticleClientFallback({ article, serviceSlug }: Props) {
  const footerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkUnderLabel, setIsDarkUnderLabel] = useState(false);
  const [hidePinned, setHidePinned] = useState(false);
  const [headerColor, setHeaderColor] = useState<'black' | 'white' | null>('black');

  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

      {/* Pinned word */}
      <motion.div 
        className="fixed bottom-8 left-8 z-50 pointer-events-none"
        animate={{ opacity: hidePinned ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{ color: isDarkUnderLabel ? '#fff' : '#000' }}
      >
        <div className="-rotate-90 origin-left" style={{ fontFamily: 'TWKGhost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>
          Leadership Article
        </div>
      </motion.div>

      {/* Back Button */}
      <div className="fixed top-8 right-8 z-[60]">
        <Link href={`/services/${serviceSlug}/Leadership`}>
          <button 
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}
          >
            ← Back to Leadership
          </button>
        </Link>
      </div>

      {/* Hero Section */}
      <section data-theme="light" data-block="1" className="w-screen h-screen relative overflow-hidden bg-amber-50">
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={article.imgSrc}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center p-16">
            <div className="text-gray-700 italic mb-4" style={{ fontFamily: 'Ghost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>
              {article.tag}
            </div>
            <h1 className="text-gray-800 mb-8 leading-tight" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.05em' }}>
              {article.title}
            </h1>
            <div className="text-gray-600" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
              <div>By {article.writer}</div>
              <div>{formatDate(article.publishedAt)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section */}
      <section data-theme="light" data-block="2" className="w-full bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Lausanne' }}>
            <div 
              className="text-gray-800 leading-relaxed"
              style={{ fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
