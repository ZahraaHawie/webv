/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Home() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroVideoRef = useRef(null);
  const firstViewportRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const block4VideoRef = useRef(null);
  const block5VideoRef = useRef(null);
  const { scrollYProgress: fp } = useScroll();
  const yText = useTransform(fp, [0, 1], [0, 60]);
  const yImage = useTransform(fp, [0, 1], [0, -120]);

  // Parallax helpers for sections below
  const companyRef = useRef(null);
  const yCompany = useTransform(fp, [0, 1], [20, -20]);

  const b4Ref = useRef(null);
  const yB4Video = useTransform(fp, [0, 1], [30, -30]);
  const yB4Text = useTransform(fp, [0, 1], [-10, 20]);

  const b5Ref = useRef(null);
  const yB5Left = useTransform(fp, [0, 1], [20, -20]);
  const yB5Right = useTransform(fp, [0, 1], [-15, 15]);

  const b6Ref = useRef(null);
  const yB6Left = useTransform(fp, [0, 1], [20, -20]);
  const yB6Right = useTransform(fp, [0, 1], [-15, 15]);

  const b8Ref = useRef(null);
  const yB8Left = useTransform(fp, [0, 1], [20, -20]);
  const yB8Right = useTransform(fp, [0, 1], [-15, 15]);

  const b9Ref = useRef(null);
  const yB9Left = useTransform(fp, [0, 1], [20, -20]);
  const yB9Right = useTransform(fp, [0, 1], [-15, 15]);

  // Parallax for transformation section - Temporarily disabled
  // const transformationRef = useRef(null);
  // const { scrollYProgress: transformationProgress } = useScroll({
  //   target: transformationRef,
  //   offset: ["start end", "end start"]
  // });
  // const yTransformationBg = useTransform(transformationProgress, [0, 1], [0, -100]);
  // const yTransformationTitle = useTransform(transformationProgress, [0, 1], [0, -50]);
  // const yTransformationSubtitle = useTransform(transformationProgress, [0, 1], [0, -30]);
  // const yTransformationVideo = useTransform(transformationProgress, [0, 1], [0, 60]);

  const headingVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  useEffect(() => {
    setIsMounted(true);
    const video = heroVideoRef.current;
    if (!video) return;
    let attempts = 0;
    const tryPlay = () => {
      video.play().catch(() => {
        attempts += 1;
        if (attempts < 5) setTimeout(tryPlay, 400);
      });
    };
    const onCanPlay = () => tryPlay();
    const onWaiting = () => tryPlay();
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('waiting', onWaiting);
    tryPlay();
    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('waiting', onWaiting);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header menu (from industries) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[60] bg-white border-b border-zinc-200" 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div ref={headerRef} className="relative max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
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
            {[{label:'Industries',href:'/industries'},{label:'Services',href:'/services'},{label:'Work',href:'#'},{label:'Ideas',href:'/ideas'},{label:'Profile',href:'/profile'}].map((item) => (
              <Link key={item.label} href={item.href} className={`text-zinc-500 hover:text-black transition-colors duration-200`} style={{ fontFamily: 'Lausanne', fontSize: 16, fontWeight: 300 }}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
            <span className="hover:text-black cursor-pointer">Sign In</span>
            <span className="mx-2">|</span>
            <span className="hover:text-black cursor-pointer">Contact Us</span>
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

      {/* Hero full-viewport video */}
      <section className="relative h-[100vh] w-full overflow-hidden pt-20 md:pt-24">
            <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/home-3.mp4"
              autoPlay
              muted
              loop
              playsInline
          preload="auto"
        />
      </section>

      {/* First viewport: matches reference layout */}
      <section ref={firstViewportRef} className="relative h-[100vh] w-full bg-white mt-16 md:mt-24 lg:mt-28 overflow-visible">
  <div className="max-w-[1600px] mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-10 lg:px-16">
    {/* Left copy */}
    <motion.div
      className="lg:col-span-7 self-center relative z-[10] -mt-52 md:-mt-55 lg:-mt-66"
      style={{ y: yText }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.p className="mb-6 ml-4 italic text-zinc-600" style={{ fontFamily: 'Lausanne', fontSize: 20 }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.6 }}
      >
        Hybrid Human Experiences<sup>®</sup>
      </motion.p>
      <motion.h2
        className="text-black leading-[0.8]"
        style={{
          fontFamily: 'Lausanne',
          fontWeight: 350,
          letterSpacing: '-0.02em',
          fontSize: 'clamp(54px, 12vw, 150px)',
        }}
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span className="block" variants={lineVariants}>Creative</motion.span>
        <motion.span className="block" variants={lineVariants}>Transformation</motion.span>
        <motion.span className="block" variants={lineVariants}>Agency</motion.span>
      </motion.h2>
    </motion.div>
    {/* Right media */}
    <div className="lg:col-span-5 relative">
      <motion.div className="absolute right-[-16px] md:right-[-24px] lg:right-[-40px] top-[93%] -translate-y-1/2 w-[60vw] lg:w-[48vw] h-[140vh] overflow-visible z-[1]" style={{ y: yImage }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="/media/home-2.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  </div>
      </section>

      {/* company description */}
      <section className="bg-white py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16"
        >
          <div className="mb-10 md:mb-14">
            <h3 className="text-black max-w-[420px]" style={{ fontFamily: 'Ghost', fontStyle: 'italic', fontSize: '19px', fontWeight: 400 }}>We help governments, organizations and startups

craft experiences that combine technology and anthropology 

to impact people mentally, emotionally and behaviorally

craft experience.</h3>
          </div>
        </motion.div>
      </section>

      {/* spacer between company description and block 4 */}
      <div className="h-24 md:h-32 lg:h-40"></div>

            {/* Block 4 — EXACT from services/brand-transformation */}
            <section data-theme="light" data-block="4" className="relative flex flex-col">
        <div className=" px-18">
          <motion.h2 
            className="text-black font-bold leading-tight" 
            style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '10%', marginBottom: '10%', maxWidth: '80%' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Shaping tomorrow by merging technology and anthropology into transformative visions.
          </motion.h2>
        </div>

      </section>



      {/* Transformations Section */}
      <section className="bg-white py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {/* First Row */}
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover"
                  style={{ height: '334px', width: '274px' }}
                >
                  <source src="/media/home-1.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>

            {/* Second Row */}
            <div className="col-span-1"></div>
            <div className="col-span-1">
            <motion.div 
              className="text-black-400 mb-8" 
              style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 300, marginLeft: '1%', marginTop: '2%', marginBottom: '15%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              01
            </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 
                  className="text-black font-bold mb-4" 
                  style={{ fontFamily: 'Lausanne', fontSize: '45px', lineHeight: 1.2, fontWeight: 300 }}
                >
                  Brand 
                </h2>

                <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{  marginTop: '2%', width: 320 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
                
                 <p 
                   className="text-gray-600 leading-relaxed mb-6" 
                   style={{ maxWidth: '350px' , fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                 >
                   A signature brand development program designed to craft your brand's essence with compelling narratives.
                 </p>
                 
                 <motion.button
                   className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                   style={{ fontFamily: 'Lausanne', fontSize: '16px' }}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                   viewport={{ once: true, margin: "-100px" }}
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                 >
                   Explore
                 </motion.button>
              </motion.div>
            </div>
            <div className="col-span-1"></div>

            {/* Third Row */}
            <div className="col-span-1">

            <motion.div 
              className="text-black-400 mb-8" 
              style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 300, marginLeft: '-17%', marginTop: '2%', marginBottom: '15%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              02
            </motion.div>
                
              <motion.div
                style={{ marginLeft: '-70px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 
                  className="text-black font-bold mb-4" 
                  style={{ fontFamily: 'Lausanne', fontSize: '45px', lineHeight: 1.2, fontWeight: 300 }}
                >Digital
                </h2>
                <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{  marginTop: '2%', width: 320 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
                
                 <p 
                   className="text-gray-600 leading-relaxed mb-6" 
                   style={{ maxWidth: '350px' , fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                 >
                   A signature brand development program designed to craft your brand's essence with compelling narratives.
                 </p>
              </motion.div>
               <motion.button
                    className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                    style={{ fontFamily: 'Lausanne', fontSize: '16px', marginLeft: '-75px' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                 
                  >
                    Explore
                  </motion.button>
            </div>
            
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <motion.div style={{ marginTop: '-130px', marginLeft: '60px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover"
                  style={{ height: '334px', width: '274px' }}
                >
                  <source src="/media/home-8.mp4" type="video/mp4" />
                </video>
              </motion.div>
              
            </div>

            {/* Fourth Row */}
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover"
                  style={{ height: '334px', width: '274px' }}
                >
                  <source src="/media/home-9.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>
            <div className="col-span-1">
                
              <motion.div
                style={{ marginTop: '200px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
              className="text-black-400 mb-8" 
              style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 300, marginLeft: '-1%', marginTop: '2%', marginBottom: '15%' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              03
            </motion.div>
                <h2 
                  className="text-black font-bold mb-4" 
                  style={{ fontFamily: 'Lausanne', fontSize: '45px', lineHeight: 1.2, fontWeight: 300 }}
                >
                  Media
                </h2>

                <motion.div 
                  className="h-px bg-gray-300 mb-8" 
                  style={{ marginTop: '2%', width: 320 }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                />
                 
                <p 
                  className="text-gray-600 leading-relaxed mb-6" 
                  style={{ maxWidth: '350px', fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                >
                  A signature brand development program designed to craft your brand's essence with compelling narratives.
                </p>
                <motion.button
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore
                </motion.button>
               
              </motion.div>
            </div>

            {/* Fifth Row */}
            <div className="col-span-1">
              <motion.div
                style={{ marginTop: '40px', marginLeft: '-70px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="text-black-400 mb-8" 
                  style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 300, marginLeft: '-1%', marginTop: '2%', marginBottom: '15%' }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  04
                </motion.div>
                <h2 
                  className="text-black font-bold mb-4" 
                  style={{ fontFamily: 'Lausanne', fontSize: '45px', lineHeight: 1.2, fontWeight: 300 }}
                >
                  AI
                </h2>

                <motion.div 
                  className="h-px bg-gray-300 mb-8" 
                  style={{ marginTop: '2%', width: 320 }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                />
                 
                <p 
                  className="text-gray-600 leading-relaxed mb-6" 
                  style={{ maxWidth: '350px', fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                >
                  A signature brand development program designed to craft your brand's essence with compelling narratives.
                </p>
                 
                <motion.button
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore
                </motion.button>
              </motion.div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>

            {/* Sixth Row */}
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover"
                  style={{ height: '334px', width: '274px' }}
                >
                  <source src="/media/home-6.mp4" type="video/mp4" />
                </video>
              </motion.div>
            </div>
            <div className="col-span-1">
              <motion.div
                style={{ marginTop: '200px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div 
                  className="text-black-400 mb-8" 
                  style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 300, marginLeft: '-1%', marginTop: '5%', marginBottom: '15%' }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  05
                </motion.div>
                <h2 
                  className="text-black font-bold mb-4" 
                  style={{ fontFamily: 'Lausanne', fontSize: '45px', lineHeight: 1.2, fontWeight: 300 }}
                >
                  Spatial
                </h2>

                <motion.div 
                  className="h-px bg-gray-300 mb-8" 
                  style={{ marginTop: '2%', width: 320 }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                />
                 
                <p 
                  className="text-gray-600 leading-relaxed mb-6" 
                  style={{ maxWidth: '350px', fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                >
                  A signature brand development program designed to craft your brand's essence with compelling narratives.
                </p>
                <motion.button
                  className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
                  style={{ fontFamily: 'Lausanne', fontSize: '16px' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.9, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore
                </motion.button>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Spacer between sections */}
      <div className="h-24 md:h-32 lg:h-40 bg-white"></div>

      {/* Three Pinned Viewport Sections - Extended Duration */}
      <div className="relative h-[300vh]">
        {/* First Viewport Section - Pinned Longer */}
        <section className="sticky top-0 h-[100vh] w-full overflow-hidden">
          <img 
            src="/media/eci2.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => console.log('Header image loaded successfully!')}
            onError={(e) => console.error('Header image failed to load:', e)}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
            <div className="mb-8">
              <p 
                className="text-white mb-4 opacity-80" 
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontSize: '18px', 
                  fontWeight: 300, 
                  letterSpacing: '0.1em',
                  marginLeft: '10px'
                }}
              >
                Government
              </p>
              <h2
                className="text-white leading-[0.9]"
                style={{
                  fontFamily: 'Lausanne',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(48px, 8vw, 120px)',
                }}
              >
                Etihad<br />
                Insurance
              </h2>
            </div>

            <div className="absolute top-1/2 right-16 md:right-20 lg:right-24 transform -translate-y-1/2">
              <div className="relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover shadow-2xl"
                  style={{ height: '390px', width: '488px' }}
                >
                  <source src="/media/services-menu.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Viewport Section - Pinned Longer */}
        <section className="sticky top-0 h-[100vh] w-full overflow-hidden">
          <img 
            src="/media/rouyati.png"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => console.log('Second section image loaded successfully!')}
            onError={(e) => console.error('Second section image failed to load:', e)}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
            <div className="mb-8">
              <p 
                className="text-white mb-4 opacity-80" 
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontSize: '18px', 
                  fontWeight: 300, 
                  letterSpacing: '0.1em',
                  marginLeft: '10px'
                }}
              >
                B2B
              </p>
              <h2
                className="text-white leading-[0.9]"
                style={{
                  fontFamily: 'Lausanne',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(48px, 8vw, 120px)',
                }}
              >
                Rouyati<br />
                Municipality
              </h2>
            </div>

            <div className="absolute top-1/2 right-16 md:right-20 lg:right-24 transform -translate-y-1/2">
              <div className="relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover shadow-2xl"
                  style={{ height: '390px', width: '488px' }}
                >
                  <source src="/media/work-megamenu1.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third Viewport Section - Now with Card Transition */}
        <section className="sticky top-0 h-[100vh] w-full overflow-hidden">
          <img 
            src="/media/sebastian.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => console.log('Third section image loaded successfully!')}
            onError={(e) => console.error('Third section image failed to load:', e)}
          />
          
          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-16 max-w-[1600px] mx-auto">
            <div className="mb-8">
              <p 
                className="text-white mb-4 opacity-80" 
                style={{ 
                  fontFamily: 'Lausanne', 
                  fontSize: '18px', 
                  fontWeight: 300, 
                  letterSpacing: '0.1em',
                  marginLeft: '10px'
                }}
              >
                B2C
              </p>
              <h2
                className="text-white leading-[0.9]"
                style={{
                  fontFamily: 'Lausanne',
                  fontWeight: 300,
                  letterSpacing: '-0.02em',
                  fontSize: 'clamp(48px, 8vw, 120px)',
                }}
              >
                Sebastian<br />
                Wolf
              </h2>
            </div>

            <div className="absolute top-1/2 right-16 md:right-20 lg:right-24 transform -translate-y-1/2">
              <div className="relative">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full object-cover shadow-2xl"
                  style={{ height: '390px', width: '488px' }}
                >
                  <source src="/media/sw-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

        {/* Block 8 (LIGHT) */}
        <section data-theme="light" data-block="8" className="w-full bg-white py-24">
        <div className="max-w-[1400px] mx-auto pl-6 pr-2 md:pl-10 md:pr-4 lg:pl-16 lg:pr-3">
          <h2
            className="text-black mb-16"
            style={{
              fontFamily: 'Lausanne',
              fontSize: '65px',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginLeft: '-45px',
              marginTop: '4%',
            }}
          >
            Transforming Industry Futures
          </h2>

          <div className="relative" style={{ marginLeft: '-38px' }}>
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

      {/* FOOTER - Similar to brand-transformation page */}
      <section className="w-screen h-screen relative bg-black" style={{ marginTop: 50 }}>
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="flex-1 flex items-center px-8 lg:px-16">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <motion.div 
                className="lg:w-1/2 mb-8 lg:mb-0" 
                initial={{ opacity: 0, x: -50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }} 
                viewport={{ once: true }}
              >
                <h2 
                  className="text-white mb-6" 
                  style={{ 
                    fontFamily: 'Ghost', 
                    fontStyle: 'italic', 
                    fontSize: 'clamp(60px, 8vw, 120px)', 
                    lineHeight: 0.9 
                  }}
                >
                  Our<br />Story
                </h2>
                <p 
                  className="text-white max-w-md" 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 'clamp(18px, 1.5vw, 24px)', 
                    lineHeight: 1.5, 
                    fontWeight: 400 
                  }}
                >
                  The story behind The Tomorrow is one of exploration, creativity and curiosity.
                </p>
              </motion.div>
              <motion.div 
                className="lg:w-1/2 flex justify-center lg:justify-end" 
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8, delay: 0.4 }} 
                viewport={{ once: true }}
              >
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                  <img 
                    src="/media/TheTomorrow_LogoWhite.svg" 
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
                <div 
                  className="text-white space-y-1" 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 14, 
                    lineHeight: 1.4, 
                    fontWeight: 400 
                  }}
                >
                  <div>Willem II Singel 8</div>
                  <div>6041 HS, Roermond</div>
                  <div>The Netherlands</div>
                  <div>hello@exoape.com</div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                <div 
                  className="text-white space-y-1" 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 14, 
                    lineHeight: 1.4, 
                    fontWeight: 400 
                  }}
                >
                  <div>Work</div>
                  <div>Studio</div>
                  <div>News</div>
                  <div>Contact</div>
                </div>
                <div 
                  className="text-white space-y-1" 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 14, 
                    lineHeight: 1.4, 
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
            <div className="mt-8 flex justify-end">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60" />
                <span 
                  className="text-white underline" 
                  style={{ 
                    fontFamily: 'Lausanne', 
                    fontSize: 14, 
                    fontWeight: 400 
                  }}
                >
                  Our Story
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

