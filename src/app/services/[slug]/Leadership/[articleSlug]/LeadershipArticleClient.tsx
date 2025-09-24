'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { urlFor } from '../../../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';

interface Post {
  _id: string
  title: string
  slug: { current: string }
  tag: string
  writer: string
  publishedAt: string
  mainImage: any
  paragraph1?: any[]
  image1?: any
  video1?: string
  paragraph2?: any[]
  image2?: any
  video2?: string
  paragraph3?: any[]
  image3?: any
  video3?: string
  paragraph4?: any[]
  image4?: any
  video4?: string
  paragraph5?: any[]
  image5?: any
  video5?: string
  paragraph6?: any[]
  image6?: any
  video6?: string
  paragraph7?: any[]
  image7?: any
  video7?: string
  secondTitle?: string
  keyTakeaways?: string[]
  bottomImage?: any
}

interface Props {
  post: Post
  serviceSlug: string
}

export default function LeadershipArticleClient({ post, serviceSlug }: Props) {
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

  // Function to convert video URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&controls=0&background=1&cover=1&fit=cover&playsinline=1&dnt=1`;
      }
    }
    
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`;
      }
    }
    
    return url;
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

      {/* ===== Header ===== */}
      <section data-theme="light" data-block="1" className="w-full bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT: Headline + Meta */}
            <div className="lg:col-span-1">
              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-black leading-tight mb-8 mt-2"
                style={{
                  fontFamily: 'Lausanne',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.04em',
                  fontSize: '70px',
                }}
              >
                {post.title}
              </motion.h1>

              {/* Meta + Share */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="flex items-center gap-6 mb-8"
              >
                <div className="flex items-center gap-3 text-sm text-gray-600" style={{ fontFamily: 'Lausanne' }}>
                  <span className="inline-block w-1.5 h-1.5 bg-gray-400" />
                  <span>{post.tag || 'Uncategorized'}</span>
                  <span className="mx-1">|</span>
                  <span>{post.writer || 'Anonymous'}</span>
                  <span className="mx-1">|</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </motion.div>

              {/* Back to Leadership */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="mb-8"
              >
                <Link 
                  href={`/services/${serviceSlug}/Leadership`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                  style={{ fontFamily: 'Lausanne', fontSize: 14 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Leadership
                </Link>
              </motion.div>
            </div>

            {/* RIGHT: Hero Image */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="aspect-[4/5] overflow-hidden rounded-lg"
              >
                {post.mainImage ? (
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="text-lg mb-2">No image available</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Article Content ===== */}
      <section data-theme="light" data-block="2" className="w-full bg-white pb-24">
        <div className="mx-auto w-full max-w-[1000px] px-6 md:px-10 lg:px-16">
          <div className="prose prose-lg max-w-none">
            {/* Paragraph 1 */}
            {post.paragraph1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <PortableText value={post.paragraph1} />
              </motion.div>
            )}

            {/* Image 1 */}
            {post.image1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <img
                  src={urlFor(post.image1).url()}
                  alt="Article image"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}

            {/* Video 1 */}
            {post.video1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={getEmbedUrl(post.video1)}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </motion.div>
            )}

            {/* Paragraph 2 */}
            {post.paragraph2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <PortableText value={post.paragraph2} />
              </motion.div>
            )}

            {/* Image 2 */}
            {post.image2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <img
                  src={urlFor(post.image2).url()}
                  alt="Article image"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}

            {/* Video 2 */}
            {post.video2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={getEmbedUrl(post.video2)}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </motion.div>
            )}

            {/* Continue with remaining paragraphs, images, and videos... */}
            {/* Paragraph 3 */}
            {post.paragraph3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <PortableText value={post.paragraph3} />
              </motion.div>
            )}

            {/* Image 3 */}
            {post.image3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <img
                  src={urlFor(post.image3).url()}
                  alt="Article image"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}

            {/* Video 3 */}
            {post.video3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={getEmbedUrl(post.video3)}
                    className="w-full h-full"
                    allowFullScreen
                    frameBorder="0"
                  />
                </div>
              </motion.div>
            )}

            {/* Second Title */}
            {post.secondTitle && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-black mb-8"
                style={{
                  fontFamily: 'Lausanne',
                  fontWeight: 600,
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                {post.secondTitle}
              </motion.h2>
            )}

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12 p-8 bg-gray-50 rounded-lg"
              >
                <h3 className="text-black mb-6" style={{ fontFamily: 'Lausanne', fontSize: 24, fontWeight: 600 }}>
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.6 }}>
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Bottom Image */}
            {post.bottomImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <img
                  src={urlFor(post.bottomImage).url()}
                  alt="Article bottom image"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            )}
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
