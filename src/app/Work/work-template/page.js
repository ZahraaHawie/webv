'use client';

import { useRef, useState, useEffect, forwardRef } from 'react';
import { PortableTextComponent } from '../../../sanity/lib/portableText';
import Link from 'next/link';
import { motion } from 'framer-motion';

// -----------------------------
// Helpers & Animation Hooks
// -----------------------------
const useIntersectionAnimation = (threshold = 0.3) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold }
    );
    const element = ref.current;
    if (element) observer.observe(element);
    return () => element && observer.unobserve(element);
  }, [threshold]);

  return [ref, isVisible];
};

const AnimatedElement = forwardRef(function AnimatedElement({ children, isVisible, delay = 0, ...props }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default function WorkTemplate(props = {}) {
  const { 
    heroVideoUrl = "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/high.mp4",
    heroTitle = "Rouyati",
    introTitleFirstWord = undefined,
    introTitleSecondWord = undefined,
    introParagraph1 = undefined,
    introParagraph2 = undefined,
    introParagraph3 = undefined,
    introSectionVideoUrl = undefined,
    firstComponentLeftTitle = undefined,
    firstComponentLeftLongTitle = undefined,
    firstComponentRightTitle1 = undefined,
    firstComponentRightParagraph1 = undefined,
    firstComponentRightTitle2 = undefined,
    firstComponentRightParagraph2 = undefined,
    firstComponentRightTitle3 = undefined,
    firstComponentRightParagraph3 = undefined,
    mediaGroup1VideoUrl = undefined,
    mediaGroup1ImageUrl = undefined,
    mediaGroup1LeftImageUrl = undefined,
    mediaGroup1RightImageUrl = undefined,
    secondComponentLeftTitle = undefined,
    secondComponentLeftLongTitle = undefined,
    secondComponentRightTitle1 = undefined,
    secondComponentRightParagraph1 = undefined,
    secondComponentRightTitle2 = undefined,
    secondComponentRightParagraph2 = undefined,
    secondComponentRightTitle3 = undefined,
    secondComponentRightParagraph3 = undefined,
    secondMediaImageUrl = undefined,
    secondMediaGrid1Url = undefined,
    secondMediaGrid2Url = undefined,
    secondMediaGrid3Url = undefined,
    secondMediaVideoUrl = undefined,
    thirdComponentLeftTitle = undefined,
    thirdComponentLeftLongTitle = undefined,
    thirdComponentRightTitle1 = undefined,
    thirdComponentRightParagraph1 = undefined,
    thirdComponentRightTitle2 = undefined,
    thirdComponentRightParagraph2 = undefined,
    thirdComponentRightTitle3 = undefined,
    thirdComponentRightParagraph3 = undefined,
    thirdMediaLeftImageUrl = undefined,
    thirdMediaRightImageUrl = undefined,
    thirdMediaImageUrl = undefined,
    thirdMediaVideoUrl = undefined,
    upNextLink = undefined,
    upNextImageUrl = undefined,
    clientName = undefined,
    projectName = undefined,
    services = [],
    industries = [],
    servicesDisplay = undefined,
    industriesDisplay = undefined,
    year = undefined,
  } = props;
  const normalizedServices = Array.isArray(services) ? services : (services ? [services] : []);
  const normalizedIndustries = Array.isArray(industries) ? industries : (industries ? [industries] : []);
  const pickString = (obj) => {
    if (!obj || typeof obj !== 'object') return ''
    const vals = Object.values(obj)
    for (let i = 0; i < vals.length; i++) {
      const v = vals[i]
      if (typeof v === 'string' && v.trim()) return v
    }
    return ''
  }
  const displayServices = normalizedServices
    .map((s) => (typeof s === 'string' ? s : (s?.title || s?.name || pickString(s) || '')))
    .filter(Boolean)
    .join(', ');
  const displayIndustries = normalizedIndustries
    .map((s) => (typeof s === 'string' ? s : (s?.title || s?.name || pickString(s) || '')))
    .filter(Boolean)
    .join(', ');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  // Animation hooks
  const [clientTableRef, isClientTableVisible] = useIntersectionAnimation();
  const [mainTitleRef, isMainTitleVisible] = useIntersectionAnimation();
  const [firstTextRef, isFirstTextVisible] = useIntersectionAnimation();
  const [secondTextRef, isSecondTextVisible] = useIntersectionAnimation();
  const [thirdTextRef, isThirdTextVisible] = useIntersectionAnimation();
  const [brandTitleRef, isBrandTitleVisible] = useIntersectionAnimation();
  const [brandHeadlineRef, isBrandHeadlineVisible] = useIntersectionAnimation();
  const [brandStrategyRef, isBrandStrategyVisible] = useIntersectionAnimation();
  const [brandIdentityRef, isBrandIdentityVisible] = useIntersectionAnimation();
  const [brandContentRef, isBrandContentVisible] = useIntersectionAnimation();
  const [brandTitle2Ref, isBrandTitle2Visible] = useIntersectionAnimation();
  const [brandHeadline2Ref, isBrandHeadline2Visible] = useIntersectionAnimation();
  const [brandStrategy2Ref, isBrandStrategy2Visible] = useIntersectionAnimation();
  const [brandIdentity2Ref, isBrandIdentity2Visible] = useIntersectionAnimation();
  const [brandContent2Ref, isBrandContent2Visible] = useIntersectionAnimation();
  const [brandTitle3Ref, isBrandTitle3Visible] = useIntersectionAnimation();
  const [brandHeadline3Ref, isBrandHeadline3Visible] = useIntersectionAnimation();
  const [brandStrategy3Ref, isBrandStrategy3Visible] = useIntersectionAnimation();
  const [brandIdentity3Ref, isBrandIdentity3Visible] = useIntersectionAnimation();
  const [brandContent3Ref, isBrandContent3Visible] = useIntersectionAnimation();

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const menuItems = ['Industries', 'Services', 'Work', 'Ideas', 'Profile'];

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Cursor (desktop only) */}
      {isHoveringClickable && (
        <div
          className="fixed pointer-events-none z-[9999] hidden md:flex w-[64px] h-[64px] rounded-full bg-white/80 backdrop-blur-sm items-center justify-center transition-all duration-100"
          style={{ left: mousePosition.x - 32, top: mousePosition.y - 32 }}
        >
          <div className="relative w-8 h-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-6 bg-black rounded-sm" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-black rounded-sm" />
          </div>
        </div>
      )}

      {/* Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 py-4 flex items-center justify-between">
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
            {menuItems.map((item) => (
              <motion.button
                key={item}
                className={`transition-colors duration-200 ${item === 'Work' ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
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

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 z-[50] bg-white md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="pt-20 px-4">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <motion.button
                key={item}
                className={`block w-full text-left text-2xl ${item === 'Work' ? 'text-black' : 'text-zinc-500'}`}
                style={{ fontFamily: 'Lausanne', fontWeight: 300 }}
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <button className="block text-zinc-700 mb-2" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Sign In</button>
            <button className="block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16 }}>Contact Us</button>
          </div>
        </div>
      </motion.div>

      {/* --------------------------------- */}
      {/* Hero Section */}
      {/* --------------------------------- */}
      <section data-theme="light" data-block="1" className="w-screen min-h-[100svh] relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={heroVideoUrl || "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/high.mp4"}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full min-h-[100svh] flex items-end justify-start">
          <div className="px-4 sm:px-6 lg:px-8 pb-10">
            <h1
              className="text-white font-semibold leading-[0.88] tracking-[-0.02em] text-[clamp(3rem,11.5vw,11rem)]"
              style={{ fontFamily: 'Lausanne' }}
            >
              {heroTitle || "Rouyati"}
            </h1>
          </div>
        </div>
      </section>

      {/* --------------------------------- */}
      {/* Intro Section */}
      {/* --------------------------------- */}
      <section className="w-screen bg-white">
        <div className="w-full">
          {/* Client Table */}
          <AnimatedElement
            ref={clientTableRef}
            isVisible={isClientTableVisible}
            delay={0.1}
            className="hidden lg:block mb-10 sm:mb-16 px-4 sm:px-6 lg:px-8 mt-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-8 text-sm">
              <div className="font-medium text-black" style={{ fontFamily: 'Lausanne' }}>Client</div>
              <div className="font-medium text-black" style={{ fontFamily: 'Lausanne' }}>Project</div>
              <div className="font-medium text-black" style={{ fontFamily: 'Lausanne' }}>Services</div>
              <div className="font-medium text-black" style={{ fontFamily: 'Lausanne' }}>Industry</div>
              <div className="font-medium text-black" style={{ fontFamily: 'Lausanne' }}>Year</div>

              <div className="text-black" style={{ fontFamily: 'Lausanne' }}>{clientName || ''}</div>
              <div className="text-black" style={{ fontFamily: 'Lausanne' }}>{projectName || ''}</div>
              <div className="text-black space-y-1" style={{ fontFamily: 'Lausanne' }}>{servicesDisplay || displayServices || '-'}</div>
              <div className="text-black space-y-1" style={{ fontFamily: 'Lausanne' }}>{industriesDisplay || displayIndustries || '-'}</div>
              <div className="text-black" style={{ fontFamily: 'Lausanne' }}>{year || ''}</div>
            </div>
          </AnimatedElement>

          {/* Main Intro Content */}
          <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-10 pt-8 sm:pt-16">
            <div className="lg:col-span-8 mb-10  lg:mb-0">
              <AnimatedElement ref={mainTitleRef} isVisible={isMainTitleVisible} delay={0.2}>
                <h1
                  className="text-black font-semibold leading-[0.95] tracking-[-0.02em] text-[clamp(2.25rem,8vw,6.25rem)]"
                  style={{ fontFamily: 'Lausanne' }}
                >
                  {(introTitleFirstWord || 'Modernizing')}<br />{(introTitleSecondWord || 'Naturopathy')}
                </h1>
              </AnimatedElement>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:space-y-8 lg:max-w-prose">
              <AnimatedElement ref={firstTextRef} isVisible={isFirstTextVisible} delay={0.3}>
                {introParagraph1 ? (
                  <div className="text-black leading-relaxed text-[clamp(1rem,1vw+0.9rem,1.125rem)]" style={{ fontFamily: 'Lausanne' }}>
                    <PortableTextComponent value={introParagraph1} />
                  </div>
                ) : (
                  <p className="text-black leading-relaxed text-[clamp(1rem,1vw+0.9rem,1.125rem)]" style={{ fontFamily: 'Lausanne' }}>
                    Juthoor is a wellness brand offering a range of botanical beverage lines derived from carefully selected herbs to address health concerns
                  </p>
                )}
              </AnimatedElement>

              <div>
                <AnimatedElement ref={secondTextRef} isVisible={isSecondTextVisible} delay={0.4}>
                  {introParagraph2 ? (
                    <div className="text-black leading-relaxed mb-4 text-[clamp(1rem,1vw+0.9rem,1.125rem)]" style={{ fontFamily: 'Lausanne' }}>
                      <PortableTextComponent value={introParagraph2} />
                    </div>
                  ) : (
                    <p className="text-black leading-relaxed mb-4 text-[clamp(1rem,1vw+0.9rem,1.125rem)]" style={{ fontFamily: 'Lausanne' }}>
                      Juthoor approached us at The Tomorrow to transform their brand and break away from the stereotype of apothecary products which didn&apos;t appeal to a younger audience.
                    </p>
                  )}
                </AnimatedElement>
                <AnimatedElement ref={thirdTextRef} isVisible={isThirdTextVisible} delay={0.5}>
                  {introParagraph3 ? (
                    <div className="text-gray-600 leading-relaxed text-[clamp(0.95rem,0.8vw+0.8rem,1rem)]" style={{ fontFamily: 'Lausanne' }}>
                      <PortableTextComponent value={introParagraph3} />
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed text-[clamp(0.95rem,0.8vw+0.8rem,1rem)]" style={{ fontFamily: 'Lausanne' }}>
                      They sought our expertise to develop a fresh, modern brand strategy, a trendy visual identity, and innovative packaging solutions. Their goal was to create a vibrant and appealing brand that resonates with youthful consumers while still emphasizing their commitment to holistic health and sustainability.
                    </p>
                  )}
                </AnimatedElement>
              </div>
            </div>
          </div>

          {/* Video in Intro Section */}
          <div className="max-w-none mx-auto px-2 sm:px-3 lg:px-2 xl:px-6 mt-10 sm:mt-16">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={introSectionVideoUrl || "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/sw-video.mp4"}
              />
            </div>
          </div>

          {/* --------------------------------- */}
          {/* First Component */}
          {/* --------------------------------- */}
          <section className="text-first-component">
            <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-10 pt-20 pb-20 lg:pt-28 lg:pb-28">
              {/* Left Column */}
              <div className="lg:col-span-4 mb-10 lg:mb-0">
                <motion.h2
                  ref={brandTitleRef}
                  className="text-black text-[clamp(1.25rem,1.5vw,1.875rem)] font-[450] leading-tight tracking-[-0.04em]"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandTitleVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                >
                  {firstComponentLeftTitle || 'Brand'}
                </motion.h2>

                <motion.h3
                  ref={brandHeadlineRef}
                  className="text-black mt-6 sm:mt-10 text-[clamp(1.375rem,2vw,2.313rem)] font-[450] leading-snug tracking-[-0.04em] max-w-md"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandHeadlineVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                  {firstComponentLeftLongTitle || 'Empowering Saudis to build a futuristic vision for their homeland'}
                </motion.h3>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h4 className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]" style={{ fontFamily: 'Lausanne' }}>
                    {firstComponentRightTitle1 || 'Brand Strategy'}
                  </h4>
                  <motion.p
                    ref={brandStrategyRef}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandStrategyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {firstComponentRightParagraph1 || 'We benchmarked against top city-building games and created a people-powered vision to build Saudi Arabia\'s tomorrow, aligning with cultural relevance and national goals.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentityVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  >
                    {firstComponentRightTitle2 || 'Brand Identity'}
                  </motion.h4>
                  <motion.p
                    ref={brandIdentityRef}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentityVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                  >
                    {firstComponentRightParagraph2 || 'The logo blends a palm tree with urban streets, symbolizing heritage and progress. The modern typography ensures legibility, and the color palette evokes stability, growth, and optimism.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                  >
                    {firstComponentRightTitle3 || 'Brand Content'}
                  </motion.h4>
                  <motion.p
                    ref={brandContentRef}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
                  >
                    {firstComponentRightParagraph3 || 'We integrated Saudi cultural elements into the game. The narrative, “Saudi in the Eyes of Its People,” lets players shape their homeland\'s future, fostering deep emotional connection and pride.'}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Media Group 1 */}
            <div className="max-w-none mx-auto px-2 sm:px-3 lg:px-2 xl:px-6 mt-10 sm:mt-16 space-y-6">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src={mediaGroup1VideoUrl || "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/sw-video.mp4"}
              />
            </div>

              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                <img src={mediaGroup1ImageUrl || "/media/rouyati.png"} alt="Custom image" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={mediaGroup1LeftImageUrl || "/media/‎images-rouyati2.jpeg"} alt="Left image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden bg-gray-300 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={mediaGroup1RightImageUrl || "/media/‎images-rouyati1.jpeg"} alt="Right image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------- */}
          {/* Second Component */}
          {/* --------------------------------- */}
          <section className="text-second-component">
            <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-10 pt-20">
              {/* Left Column */}
              <div className="lg:col-span-4 mb-10 lg:mb-0">
                <motion.h2
                  ref={brandTitle2Ref}
                  className="text-black text-[clamp(1.25rem,1.5vw,1.875rem)] font-[450] leading-tight tracking-[-0.04em]"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandTitle2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                >
                  {secondComponentLeftTitle || 'Product'}
                </motion.h2>

                <motion.h3
                  ref={brandHeadline2Ref}
                  className="text-black mt-6 sm:mt-10 text-[clamp(1.375rem,2vw,2.313rem)] font-[450] leading-snug tracking-[-0.04em] max-w-md"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandHeadline2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                  {secondComponentLeftLongTitle || 'Empowering Saudis to build a futuristic vision for their homeland'}
                </motion.h3>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h4 className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]" style={{ fontFamily: 'Lausanne' }}>
                    {secondComponentRightTitle1 || 'Brand Strategy'}
                  </h4>
                  <motion.p
                    ref={brandStrategy2Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandStrategy2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {secondComponentRightParagraph1 || 'We benchmarked against top city-building games and created a people-powered vision to build Saudi Arabia\'s tomorrow, aligning with cultural relevance and national goals.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentity2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  >
                    {secondComponentRightTitle2 || 'Brand Identity'}
                  </motion.h4>
                  <motion.p
                    ref={brandIdentity2Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentity2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                  >
                    {secondComponentRightParagraph2 || 'The logo blends a palm tree with urban streets, symbolizing heritage and progress. The modern typography ensures legibility, and the color palette evokes stability, growth, and optimism.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContent2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                  >
                    {secondComponentRightTitle3 || 'Brand Content'}
                  </motion.h4>
                  <motion.p
                    ref={brandContent2Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContent2Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
                  >
                    {secondComponentRightParagraph3 || 'We integrated Saudi cultural elements into the game. The narrative, “Saudi in the Eyes of Its People,” lets players shape their homeland\'s future, fostering deep emotional connection and pride.'}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Media Group 2 */}
            <div className="max-w-none mx-auto px-2 sm:px-3 lg:px-2 xl:px-6 mt-10 sm:mt-16 space-y-6">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={secondMediaImageUrl || "https://pub-411c527512cc4192888c7693de42f3f6.r2.dev/billiboard-rouyati.jpg"}
                  alt="Custom image"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={secondMediaGrid1Url || "/media/‎images-rouyati2.jpeg"} alt="First image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden bg-gray-300 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={secondMediaGrid2Url || "/media/‎images-rouyati1.jpeg"} alt="Second image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden bg-gray-400 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={secondMediaGrid3Url || "/media/‎images-rouyati2.jpeg"} alt="Third image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>

              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={secondMediaVideoUrl || "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/high.mp4"}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------- */}
          {/* Third Component */}
          {/* --------------------------------- */}
          <section className="text-third-component">
            <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-10 pt-20">
              {/* Left Column */}
              <div className="lg:col-span-4 mb-10 lg:mb-0">
                <motion.h2
                  ref={brandTitle3Ref}
                  className="text-black text-[clamp(1.25rem,1.5vw,1.875rem)] font-[450] leading-tight tracking-[-0.04em]"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandTitle3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                >
                  {thirdComponentLeftTitle || 'Media'}
                </motion.h2>

                <motion.h3
                  ref={brandHeadline3Ref}
                  className="text-black mt-6 sm:mt-10 text-[clamp(1.375rem,2vw,2.313rem)] font-[450] leading-snug tracking-[-0.04em] max-w-md"
                  style={{ fontFamily: 'Lausanne' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isBrandHeadline3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                  {thirdComponentLeftLongTitle || 'Empowering Saudis to build a futuristic vision for their homeland'}
                </motion.h3>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h4 className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]" style={{ fontFamily: 'Lausanne' }}>
                    {thirdComponentRightTitle1 || 'Brand Strategy'}
                  </h4>
                  <motion.p
                    ref={brandStrategy3Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandStrategy3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {thirdComponentRightParagraph1 || 'We benchmarked against top city-building games and created a people-powered vision to build Saudi Arabia\'s tomorrow, aligning with cultural relevance and national goals.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentity3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  >
                    {thirdComponentRightTitle2 || 'Brand Identity'}
                  </motion.h4>
                  <motion.p
                    ref={brandIdentity3Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandIdentity3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                  >
                    {thirdComponentRightParagraph2 || 'The logo blends a palm tree with urban streets, symbolizing heritage and progress. The modern typography ensures legibility, and the color palette evokes stability, growth, and optimism.'}
                  </motion.p>
                </div>

                <div>
                  <motion.h4
                    className="text-black mb-3 text-[clamp(1rem,1vw,1.25rem)] font-medium leading-tight tracking-[-0.02em]"
                    style={{ fontFamily: 'Lausanne' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContent3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                  >
                    {thirdComponentRightTitle3 || 'Brand Content'}
                  </motion.h4>
                  <motion.p
                    ref={brandContent3Ref}
                    className="text-gray-600 leading-relaxed text-[clamp(1rem,0.9vw,1.125rem)] max-w-prose"
                    style={{ fontFamily: 'Lausanne', color: '#6E6F70' }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isBrandContent3Visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
                  >
                    {thirdComponentRightParagraph3 || 'We integrated Saudi cultural elements into the game. The narrative, “Saudi in the Eyes of Its People,” lets players shape their homeland\'s future, fostering deep emotional connection and pride.'}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Media Group 3 */}
            <div className="max-w-none mx-auto px-2 sm:px-3 lg:px-2 xl:px-6 mt-10 sm:mt-16 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative overflow-hidden bg-gray-200 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={thirdMediaLeftImageUrl || "/media/‎images-rouyati2.jpeg"} alt="Left image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative overflow-hidden bg-gray-300 aspect-[4/3] md:aspect-[16/9] rounded-xl">
                  <img src={thirdMediaRightImageUrl || "/media/‎images-rouyati1.jpeg"} alt="Right image" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>

              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl">
                <img src={thirdMediaImageUrl || "/media/rouyati.png"} alt="Custom image" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={thirdMediaVideoUrl || "https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/C4D_30486804_OC.mp4"}
                />
              </div>
            </div>
          </section>

          {/* --------------------------------- */}
          {/* Up Next */}
          {/* --------------------------------- */}
          <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-3 xl:px-6 mt-24 mb-4">
            <h2 className="text-black text-[clamp(1.125rem,1.3vw,1.5rem)] font-normal leading-tight tracking-[-0.01em]" style={{ fontFamily: 'Lausanne' }}>
              Up Next
            </h2>
          </div>

          <div className="max-w-none mx-auto px-2 sm:px-3 lg:px-2 xl:px-6">
            <div className="relative w-full rounded-xl overflow-hidden aspect-[16/9] md:aspect-[8/3]">
              <Link
                href={upNextLink || "/Work/next-project"}
                className="block w-full h-full"
                style={{ cursor: 'none' }}
                onMouseEnter={() => setIsHoveringClickable(true)}
                onMouseLeave={() => setIsHoveringClickable(false)}
              >
                <img
                  src={upNextImageUrl || "/media/juthoor2.jpg"}
                  alt="Product bottles showcase"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
