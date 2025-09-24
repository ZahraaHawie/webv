'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeaderMegaMenu from '../../components/HeaderMegaMenu';

export default function IndustriesLanding() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const block4VideoRef = useRef(null);
  const block5VideoRef = useRef(null);

  useEffect(() => {
    // Autoplay inline videos in later blocks
    try { block4VideoRef.current?.play?.(); } catch {}
    try { block5VideoRef.current?.play?.(); } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeaderMegaMenu activeItem="industries" />

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
            src="https://pub-67bf47f1bb204758b0d18a001253a483.r2.dev/home-4.mp4"
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
              Automotive
            </h1>
          </div>
        </div>
      </section>

      {/* Second section */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-10 md:pb-12 lg:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-end">
          <div className="md:col-span-7">
            <h1 className="text-black leading-none" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.02em', fontSize: '75px', whiteSpace: 'nowrap' }}>
              Automotive Industry
            </h1>
            <h2 className="text-zinc-400 leading-none mt-2 mb-30" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.02em', fontSize: '50px', whiteSpace: 'nowrap' }}>
            Driving Tomorrow’s Creative Power
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <button className="px-5 py-2 rounded-full bg-black text-white" style={{ fontFamily: 'Lausanne' }}>Request Consultation</button>
              <button className="px-5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black" style={{ fontFamily: 'Lausanne' }}>Find your plan</button>
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="text-black/80" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.6 }}>
            The automotive future unites electrification, autonomy, and connectivity, shaping sustainable mobility worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Large image section */}
      <section className="pb-20 md:pb-28 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full h-[55vh] md:h-[70vh] lg:h-[75vh] rounded-2xl overflow-hidden">
            <img src="/media/inustries-hero.png" alt="Industry hero" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Three-column narrative section */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Title spanning all columns */}
            <h2
              className="text-black md:col-span-3 mb-6 md:mb-10 lg:mb-10"
              style={{ fontFamily: 'Lausanne', fontWeight: 300, letterSpacing: '-0.02em', fontSize: '45px', lineHeight: 1.15 }}
            >
              As specialists in urban design and landscape architecture, we utilize advanced technology to create spaces that are both aesthetically pleasing and exciting.
            </h2>

            {/* Column 1 intentionally left empty to create the 3-column rhythm */}
            <div className="hidden md:block" />

            {/* Column 2: two short paragraphs */}
            <div className="space-y-5">
              <p className="text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.8 }}>
              At Studio D, we highly value fresh ideas, creativity, and imagination. We believe that by approaching spatial design on an eye-level basis, we can bring innovative solutions to every project. Perspective is the guiding principle in our projects, and we believe that every design should contribute to a better future.
              </p>
              <p className="text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.8 }}>
              We place utmost importance on understanding and addressing the needs of our clients and stakeholders, and we actively engage with all parties involved to ensure a collaborative design process. 
              </p>
      </div>

            {/* Column 3: continued narrative */}
            <div className="space-y-5">
              <p className="text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.8 }}>
                Drawing on experience in large-scale master planning and landscape interventions, we craft concepts that address pressing global challenges such as climate change and urbanization—creating sustainable, vibrant environments that improve well‑being and resilience.
              </p>
              <p className="text-zinc-700" style={{ fontFamily: 'Lausanne', fontSize: 16, lineHeight: 1.8 }}>Moreover, we pride ourselves in crafting concepts and visions that tackle pressing global challenges like climate change and urbanization, reflecting our commitment to creating a positive impact on a broader scale.</p>
                </div>
          </div>
        </div>
      </section>

      {/* Block 3 — EXACT from services/brand-transformation */}
      <section data-theme="light" data-block="3" className="w-screen h-screen relative bg-white flex items-center justify-center">
        <div className="w-4/5 h-3/4 bg-black rounded-lg shadow-2xl overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/media/AI-transf.mp4" type="video/mp4" />
          </video>
      </div>
      </section>

      {/* Block 4 — EXACT from services/brand-transformation */}
      <section data-theme="light" data-block="4" className="w-screen h-screen relative bg-white flex flex-col">
        <div className="pt-10 px-18 pb-8">
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
          <div className="w-1/2 pl-8 flex flex-col justify-end" style={{ marginLeft: '15%', marginTop: '10%' }}>
            <div className="max-w-sm">
              <motion.div 
                className="text-gray-400 mb-6" 
                style={{ fontFamily: 'Lausanne', fontSize: 24, fontWeight: 300 }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                01
              </motion.div>
              <motion.h3 
                className="text-black mb-6 leading-tight" 
                style={{ fontFamily: 'Lausanne', fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1.2, fontWeight: 400 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Brand Transformation
              </motion.h3>
              <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{  marginTop: '2%', width: 370 }}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
              <motion.p 
                className="text-black leading-relaxed" 
                style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 18px)', lineHeight: 1.6, fontWeight: 400 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                In the design process, we highly value the eye-level perspective as it offers a genuine experience of spatial projects. This perspective provides invaluable insights into the functionality of a spatial plan, revealing its strengths and areas that may require improvement.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5 — EXACT from services/brand-transformation */}
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
              Digital Transformation
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '5%', marginTop: '2%', width: 400 }}
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

      {/* Block 6 — EXACT from services/brand-transformation */}
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
              Media Transformation
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '30%', marginTop: '2%', width: 400 }}
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
              We use computational algorithms and parametric modeling to create highly flexible and adaptive designs, allowing dynamic adjustments based on specific requirements and constraints.
            </motion.p>
                </div>
              </div>
      </section>


      {/* Block 8 — Spatial Transformation */}
      <section data-theme="light" data-block="8" className="w-screen h-screen relative bg-white flex">
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
              04
            </motion.div>
            <motion.h3 
              className="text-black mb-6 leading-tight" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '5%', marginTop: '3%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              AI Transformation
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '5%', marginTop: '2%', width: 400 }}
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
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/media/AI-transf.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Block 9 — Spatial Transformation */}
      <section data-theme="light" data-block="9" className="w-screen h-screen relative bg-white flex">
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
              05
            </motion.div>
            <motion.h3 
              className="text-black mb-6 leading-tight" 
              style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 42px)', lineHeight: 1.2, fontWeight: 400, marginLeft: '30%', marginTop: '3%' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Spatial Transformation
            </motion.h3>
            <motion.div 
              className="h-px bg-gray-300 mb-8" 
              style={{ marginLeft: '30%', marginTop: '2%', width: 400 }}
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
              We use computational algorithms and parametric modeling to create highly flexible and adaptive designs, allowing dynamic adjustments based on specific requirements and constraints.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Block 7: THOUGHT LEADERSHIP (DARK) */}
      <section data-theme="dark" data-block="7" className="w-full bg-black text-white" style={{ marginTop: '150px' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12 lg:mb-16">
            <h2 className="md:col-span-6 leading-none" style={{ fontFamily: 'Lausanne', fontWeight: 400, letterSpacing: '-0.02em', marginLeft: '4%', fontSize: 48 }}>
              IDEAS
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
                <img src="/media/events.png" alt="Fossil Hero" className="w-full h-[60vh] object-cover aspect-[4/5]" />
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
                          <span style={{ fontFamily: 'Lausanne' }}>{i===1?'NEWS': i===2? 'REPORTS':'PODCASTS'}</span>
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

      {/* Contact Footer */}
      <section ref={footerRef} data-theme="light" data-block="contact-footer" className="w-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Left copy */}
            <div className="md:col-span-6 -ml-4 md:-ml-18">
              <h2 className="text-black" style={{ fontFamily: 'Lausanne', fontWeight: 450, letterSpacing: '-0.04em', lineHeight: 0.8, fontSize: '77px' }}>
                let’s<br />design<br />tomorrow
              </h2>
              <div className="mt-8 space-y-4 text-black/70" style={{ fontFamily: 'Lausanne', fontSize: 18, lineHeight: 1.6 }}>
                <p>Have a story to tell or a vision to elevate?</p>
                <p>We’d love to hear from you and create something extraordinary.</p>
              </div>
            </div>

            {/* Right form */}
            <div className="md:col-span-6">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full h-14 rounded-xl border border-zinc-300 focus:border-black focus:outline-none px-5 text-black bg-white placeholder:text-zinc-400"
                  style={{ fontFamily: 'Lausanne', fontSize: 16 }}
                />
                <input
                  type="email"
                  placeholder="Business Email*"
                  className="w-full h-14 rounded-xl border border-zinc-300 focus:border-black focus:outline-none px-5 text-black bg-white placeholder:text-zinc-400"
                  style={{ fontFamily: 'Lausanne', fontSize: 16 }}
                />
                <textarea
                  placeholder="Message*"
                  className="w-full min-h-[220px] rounded-xl border border-zinc-300 focus:border-black focus:outline-none px-5 py-4 text-black bg-white placeholder:text-zinc-400"
                  style={{ fontFamily: 'Lausanne', fontSize: 16 }}
                />
                <button
                  type="button"
                  className="w-full h-16 rounded-xl bg-black text-white hover:opacity-90 transition-opacity"
                  style={{ fontFamily: 'Lausanne', fontSize: 18, fontWeight: 600 }}
                >
                  Submit Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}


