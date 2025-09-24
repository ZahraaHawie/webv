"use client";

// @ts-ignore
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projectId, dataset } from '../../../sanity/env'
import { urlFor } from '../../../sanity/lib/image'
import { urlForFile } from '../../../sanity/lib/file'

type TransformationDoc = any

export default function TransformationTemplateClient({ doc }: { doc: TransformationDoc }) {
  const block1VideoRef = useRef<HTMLVideoElement | null>(null)
  const block3VideoRef = useRef<HTMLVideoElement | null>(null)
  const block4VideoRef = useRef<HTMLVideoElement | null>(null)
  const block5VideoRef = useRef<HTMLVideoElement | null>(null)
  const secondBlockRef = useRef<HTMLDivElement | null>(null)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkUnderLabel, setIsDarkUnderLabel] = useState(false)
  const [hidePinned, setHidePinned] = useState(false)
  const [headerColor, setHeaderColor] = useState<'black' | 'white' | null>('black')

  // Function to convert video URLs to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const vimeoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&controls=0&background=1&cover=1&fit=cover&playsinline=1&dnt=1`
      }
    }
    
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = ''
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || ''
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`
      }
    }
    
    // Return original URL for other cases
    return url
  }


  // Color transition for Block 2 (same as brand page)
  const { scrollYProgress } = useScroll({ target: secondBlockRef, offset: ['start start', 'end end'] });
  const backgroundColor = useTransform(scrollYProgress, [0, 0.01, 0.1], [
    'rgb(255, 251, 235)', // amber-50
    'rgb(255, 251, 235)',
    'rgb(255, 255, 255)'
  ]);

  useEffect(() => {
    block1VideoRef.current?.play().catch(() => {})
    block3VideoRef.current?.play().catch(() => {})
    block4VideoRef.current?.play().catch(() => {})
    block5VideoRef.current?.play().catch(() => {})
    
    // Ensure Block 4 Item 2 video autoplays when loaded
    const block4Item2Video = document.querySelector('[data-block="5"] video') as HTMLVideoElement
    if (block4Item2Video) {
      block4Item2Video.play().catch(() => {})
    }
  }, [])

  // Close menu when header is hidden
  useEffect(() => {
    if (headerColor === null && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [headerColor, isMenuOpen])

  // Compute current header color based on section under viewport center and theme
  useEffect(() => {
    const getThemeAtViewportCenter = () => {
      const centerY = window.innerHeight * 0.5
      const themedEls = Array.from(document.querySelectorAll('[data-theme]')) as HTMLElement[]
      let theme: string = 'light'
      for (const el of themedEls) {
        const r = el.getBoundingClientRect()
        if (r.top <= centerY && r.bottom >= centerY) {
          theme = el.dataset.theme || 'light'
          break
        }
      }
      return theme
    }

    const getHeaderColor = () => {
      try {
        const centerY = window.innerHeight * 0.5
        const sections = Array.from(document.querySelectorAll('[data-block]')) as HTMLElement[]
        for (const section of sections) {
          const r = section.getBoundingClientRect()
          if (r.top <= centerY && r.bottom >= centerY) {
            const blockType = section.dataset?.block
            if (blockType === '1') return 'white'
            if (blockType === '7') return 'white'
            if (blockType === 'footer') return null
            if (['2','3','4','5','6','8'].includes(blockType || '')) return 'black'
          }
        }
        return 'black'
      } catch {
        return 'black'
      }
    }

    const refresh = () => {
      try {
        const theme = getThemeAtViewportCenter()
        setIsDarkUnderLabel(theme === 'dark')
        const newHeaderColor = getHeaderColor()
        setHeaderColor(newHeaderColor as any)
        const footer = footerRef.current as any
        if (footer) {
          const fr = (footer as HTMLElement).getBoundingClientRect()
          const isFooterVisible = fr.top < window.innerHeight && fr.bottom > 0
          setHidePinned(isFooterVisible)
        }
      } catch {}
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          refresh()
          ticking = false
        })
        ticking = true
      }
    }

    const initialRefresh = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refresh)
      } else {
        refresh()
      }
    }

    initialRefresh()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('DOMContentLoaded', refresh)
    }
  }, [])

  const { scrollYProgress: footerScrollProgress } = useScroll({ target: footerRef, offset: ['start end', 'end start'] });
  const footerY = useTransform(footerScrollProgress, [0, 0.3, 1], ['100vh', '20vh', '0vh']);

  return (
    <>
      {/* Sticky Logo and Menu (theme-aware like Brand page) */}
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
                  <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Lausanne' }}>Brand</h3>
                  <div className="w-16 h-0.5 bg-gray-300" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    ['Brand Strategy','Brand Identity','Visual Design','Brand Guidelines','Logo Design','Typography'],
                    ['Brand Positioning','Brand Architecture','Brand Messaging','Brand Voice','Brand Storytelling','Brand Experience'],
                    ['Brand Research','Brand Workshops','Brand Consulting','Brand Evolution','Brand Launch','Brand Management']
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
      {doc.pinnedWord && (
        <motion.div 
          className="fixed bottom-8 left-8 z-50 pointer-events-none"
          animate={{ opacity: hidePinned ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          style={{ color: isDarkUnderLabel ? '#fff' : '#000' }}
        >
          <div className="-rotate-90 origin-left" style={{ fontFamily: 'TWKGhost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>
            {doc.pinnedWord}
          </div>
        </motion.div>
      )}

      {/* Block 1: Hero Section (Video left, text right) */}
      <section data-theme="light" data-block="1" className="w-screen h-screen relative bg-amber-50 flex">
        <div className="w-1/2 h-full relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Debug info - remove this later */}
            {(() => {
              console.log('Block 1 Video Debug:', {
                block1VideoUrl: doc.block1VideoUrl,
                block1Video: doc.block1Video,
                sanityFileUrl: urlForFile(doc.block1Video)
              });
              return null;
            })()}
            {doc.block1VideoUrl ? (
              <iframe
                src={getEmbedUrl(doc.block1VideoUrl)}
                className="w-full h-full"
                allowFullScreen
              />
            ) : urlForFile(doc.block1Video) ? (
              <video ref={block1VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src={urlForFile(doc.block1Video)} type="video/mp4" />
              </video>
            ) : (
              <video ref={block1VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/media/brand-headervideo.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center p-16">
          <div className="text-gray-700 italic mb-4" style={{ fontFamily: 'Ghost', fontSize: 20, fontWeight: 400, fontStyle: 'italic' }}>{doc.block1Small}</div>
          <h2 className="text-gray-800 mb-8 leading-tight" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(48px, 5vw, 72px)', lineHeight: 1.1, fontWeight: 400, letterSpacing: '-0.05em' }}
            dangerouslySetInnerHTML={{ __html: doc.block1Title?.replace(/\n/g, '<br />') || '' }}
          />
          <p className="text-gray-700 max-w-lg" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.6, fontWeight: 400 }}>
            {doc.block1Paragraph}
          </p>
        </div>
      </section>

      {/* Block 2: Sticky Text Section with Color Transition */}
      <section ref={secondBlockRef} data-theme="light" data-block="2" className="relative w-screen h-[200vh]">
        <motion.div className="sticky top-0 h-screen w-screen relative" style={{ backgroundColor }}>
          <div className="absolute" style={{ top: '20%', left: '10%', width: '70%', fontFamily: 'Lausanne', fontSize: 'clamp(38px, 5vw, 33px)', lineHeight: 1.1, fontWeight: 300 }}>
            <div>{doc.block2Paragraph}</div>
          </div>
          <div className="absolute overflow-hidden" style={{ top: '70%', left: 0, width: '100%', height: 'calc(clamp(120px, 30vw, 200px) * 1.08)' }}>
            <div className="flex whitespace-nowrap animate-scroll items-center" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(120px, 30vw, 200px)', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 1, padding: '0.04em 0' }}>
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

      {/* Block 3: Full Video Section */}
      <section data-theme="light" data-block="3" className="w-screen h-screen relative bg-white flex items-center justify-center">
        <div className="w-4/5 h-3/4 bg-black rounded-lg shadow-2xl overflow-hidden">
          {doc.block3VideoUrl ? (
            <iframe 
              src={getEmbedUrl(doc.block3VideoUrl)} 
              className="w-full h-full" 
              style={{ objectFit: 'cover', width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              frameBorder="0"
            />
          ) : urlForFile(doc.block3Video) ? (
            <video ref={block3VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src={urlForFile(doc.block3Video)} type="video/mp4" />
            </video>
          ) : (
            <video ref={block3VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/media/block4-brand.mp4" type="video/mp4" />
            </video>
          )}
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
            {doc.block4MainTitle}
          </motion.h2>
        </div>
        <div className="flex-1 flex px-36 pb-16">
          <div className="w-1/2 pr-8">
            <div className="h-full bg-gray-200 overflow-hidden" style={{ width: '90%', marginLeft: '36%', marginTop: '25%' }}>
              {/* Debug info - remove this later */}
              {(() => {
                console.log('Block 4 Item 1 Video Debug:', {
                  block4Item1VideoUrl: doc.block4Item1VideoUrl,
                  block4Item1Video: doc.block4Item1Video,
                  sanityFileUrl: urlForFile(doc.block4Item1Video)
                });
                return null;
              })()}
              {doc.block4Item1VideoUrl ? (
                <iframe
                  src={getEmbedUrl(doc.block4Item1VideoUrl)}
                  className="w-full h-full"
                  allowFullScreen
                  frameBorder="0"
                />
              ) : urlForFile(doc.block4Item1Video) ? (
                <video ref={block4VideoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={urlForFile(doc.block4Item1Video)} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-lg mb-2">No video uploaded</div>
                    <div className="text-sm">Upload a video in &quot;Block 4 - Item 1 Video&quot;</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 pl-8 flex flex-col justify-center" style={{ marginLeft: '15%', marginTop: '5%' }}>
            <div className="max-w-sm">
              {/* Item 1 */}
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
                {doc.block4Item1Title}
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
                {doc.block4Item1Paragraph}
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
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 3vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '3%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {doc.block4Item2Title}
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
              {doc.block4Item2Paragraph}
            </motion.p>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center" style={{ marginRight: '5%', marginTop: '8%' }}>
          <div className="h-5/6 bg-gray-200 overflow-hidden" style={{ width: '200%', marginTop: '5%', marginRight: '3%' }}>
            {/* Debug info - remove this later */}
            {(() => {
              console.log('Block 4 Item 2 Video Debug:', {
                block4Item2VideoUrl: doc.block4Item2VideoUrl,
                block4Item2Video: doc.block4Item2Video,
                sanityFileUrl: urlForFile(doc.block4Item2Video)
              });
              return null;
            })()}
            {doc.block4Item2VideoUrl ? (
              <iframe
                src={getEmbedUrl(doc.block4Item2VideoUrl)}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            ) : urlForFile(doc.block4Item2Video) ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              >
                <source src={urlForFile(doc.block4Item2Video)} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-lg mb-2">No video uploaded</div>
                  <div className="text-sm">Upload a video in &quot;Block 4 - Item 2 Video&quot;</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Block 6 (LIGHT) */}
      <section data-theme="light" data-block="6" className="w-screen h-screen relative bg-white flex">
        <div className="w-1/2 h-full flex flex-col justify-center" style={{ marginLeft: '8.7%', marginTop: '5%' }}>
          <div className="h-5/6 bg-gray-100 overflow-hidden relative" style={{ width: '110%', marginLeft: '3%', marginTop: '20%', marginRight: '3%', marginBottom: '20%' }}>
            {doc.block4Item3VideoUrl ? (
              <iframe
                src={getEmbedUrl(doc.block4Item3VideoUrl)}
                className="w-full h-full"
                allowFullScreen
                frameBorder="0"
              />
            ) : urlForFile(doc.block4Item3Video) ? (
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              >
                <source src={urlForFile(doc.block4Item3Video)} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-lg mb-2">No video uploaded</div>
                  <div className="text-sm">Upload a video in &quot;Block 4 - Item 3 Video&quot;</div>
                </div>
              </div>
            )}
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
              {doc.block4Item3Title}
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
              {doc.block4Item3Paragraph}
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
                {/* Article 1 */}
                <li className="py-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[12px] tracking-[0.12em] text-white/60 mb-2">
                        <span className="inline-block w-1.5 h-1.5 bg-white/40" />
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article1Category || 'GLOBAL NEWS'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article1Time || '2 MIN READ'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article1Date || '15 JULY 2025'}</span>
                      </div>
                      <h3 className="leading-tight" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 37 }}>
                        {doc.block7Article1Title || 'Howden Rebrand Signals Global Growth Push'}
                      </h3>
                    </div>
                    {doc.block7Article1Link ? (
                      <a 
                        href={doc.block7Article1Link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors cursor-pointer" 
                        aria-label="Open Article"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <button className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors" aria-label="Open">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    )}
                  </div>
                </li>

                {/* Article 2 */}
                <li className="py-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[12px] tracking-[0.12em] text-white/60 mb-2">
                        <span className="inline-block w-1.5 h-1.5 bg-white/40" />
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article2Category || 'STRATEGIC INSIGHTS'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article2Time || '4 MIN READ'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article2Date || '2 JULY 2025'}</span>
                      </div>
                      <h3 className="leading-tight" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 37 }}>
                        {doc.block7Article2Title || 'Brand Audit: Current Identity vs. Market Impact'}
                      </h3>
                    </div>
                    {doc.block7Article2Link ? (
                      <a 
                        href={doc.block7Article2Link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors cursor-pointer" 
                        aria-label="Open Article"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <button className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors" aria-label="Open">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    )}
                  </div>
                </li>

                {/* Article 3 */}
                <li className="py-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-[12px] tracking-[0.12em] text-white/60 mb-2">
                        <span className="inline-block w-1.5 h-1.5 bg-white/40" />
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article3Category || 'MARKET REPORTS'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article3Time || '3 MIN READ'}</span>
                        <span className="mx-1">|</span>
                        <span style={{ fontFamily: 'Lausanne' }}>{doc.block7Article3Date || '16 JUNE 2025'}</span>
                      </div>
                      <h3 className="leading-tight" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.01em', fontSize: 37 }}>
                        {doc.block7Article3Title || 'Future of Branding: Trends Shaping Identity and Growth'}
                      </h3>
                    </div>
                    {doc.block7Article3Link ? (
                      <a 
                        href={doc.block7Article3Link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors cursor-pointer" 
                        aria-label="Open Article"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    ) : (
                      <button className="shrink-0 w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 grid place-items-center transition-colors" aria-label="Open">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M8 8h8v8M16 8l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="overflow-hidden" style={{ width: '100%', '--marqueeSize': 'clamp(120px, 30vw, 200px)', height: 'calc(var(--marqueeSize) * 1.08)', marginTop: 50 } as any}>
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
              marginLeft: '15px',
              marginTop: '4%',
            }}
          >
            Transforming Industry Futures
          </h2>

          <div className="relative" style={{ marginLeft: '22px' }}>
            {/* Horizontal slider container */}
            <div 
              className="flex gap-8 overflow-x-auto scroll-smooth pb-4"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              } as any}
            >
              {/* Industry Panel 1 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry1Image ? (
                    <img
                      src={urlFor(doc.block8Industry1Image).url()}
                      alt={doc.block8Industry1Title || 'Industry 1'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 1 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry1Title || 'Industry 1'}
                </h3>
              </div>

              {/* Industry Panel 2 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry2Image ? (
                    <img
                      src={urlFor(doc.block8Industry2Image).url()}
                      alt={doc.block8Industry2Title || 'Industry 2'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 2 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry2Title || 'Industry 2'}
                </h3>
              </div>

              {/* Industry Panel 3 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry3Image ? (
                    <img
                      src={urlFor(doc.block8Industry3Image).url()}
                      alt={doc.block8Industry3Title || 'Industry 3'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 3 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry3Title || 'Industry 3'}
                </h3>
              </div>

              {/* Industry Panel 4 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry4Image ? (
                    <img
                      src={urlFor(doc.block8Industry4Image).url()}
                      alt={doc.block8Industry4Title || 'Industry 4'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 4 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry4Title || 'Industry 4'}
                </h3>
              </div>

              {/* Industry Panel 5 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry5Image ? (
                    <img
                      src={urlFor(doc.block8Industry5Image).url()}
                      alt={doc.block8Industry5Title || 'Industry 5'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 5 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry5Title || 'Industry 5'}
                </h3>
              </div>

              {/* Industry Panel 6 */}
              <div className="flex flex-col min-w-[300px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  {doc.block8Industry6Image ? (
                    <img
                      src={urlFor(doc.block8Industry6Image).url()}
                      alt={doc.block8Industry6Title || 'Industry 6'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <div className="text-lg mb-2">No image uploaded</div>
                        <div className="text-sm">Upload image in &quot;Block 8 - Industry 6 Image&quot;</div>
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="text-black mt-4"
                  style={{
                    fontFamily: 'Lausanne',
                    fontSize: '30px',
                    fontWeight: 400,
                  }}
                >
                  {doc.block8Industry6Title || 'Industry 6'}
                </h3>
              </div>
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

      {/* FOOTER */}
      <motion.section ref={footerRef as any} data-theme="dark" data-block="footer" className="w-screen h-screen relative bg-black" style={{ marginTop: 50, y: footerY }}>
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
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items_center justify_center">
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
  )
}



