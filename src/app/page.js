"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Home() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      {/* Hero (reference-composition) */}
      <section className="relative h-[100vh] w-full overflow-hidden pt-20 md:pt-24">
        {/* Left metadata block */}
        <div className="absolute top-14 left-10 sm:left-14 text-[11px] sm:text-[12px] leading-relaxed tracking-wide opacity-80 space-y-5 max-w-[220px]">
          <div className="space-y-1">
            <p className="mt-3 text-[26px] sm:text-[20px] md:text-[44px] font-semibold leading-snug font-['Lausanne']">Creative Transformation Agency</p>
          </div>
  
        </div>

        {/* Media blocks */}
        <div className="pointer-events-none">
          {/* Large video block (center-left) */}
          <div className="absolute left-[22%] top-[22%] w-[36vw] max-w-[580px] aspect-[16/9] rounded-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
            <video
              className="h-full w-full object-cover"
              src="/media/home-1.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Small video block (top-right) */}
          <div className="absolute right-[6%] top-[10%] w-[34vw] max-w-[640px] aspect-[16/9] rounded-md overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <video
              className="h-full w-full object-cover"
              src="/media/home-2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        {/* Bottom oversized wordmark */}
        <div className="absolute bottom-[1vw] left-20 sm:left-12 md:left-4 right-1 sm:right-2 md:right-6">
          <h1 className="select-none text-black font-[1000] leading-[0.85] tracking-tight text-[20vw] sm:text-[18vw] md:text-[16vw]">
            TOMORROW
          </h1>
        </div>
      </section>
    </div>
  );
}

