'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '../../../sanity/lib/client'
import { PortableTextComponent } from '../../../sanity/lib/portableText'
// @ts-ignore
import { useState } from 'react'

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

export default function IndustriesArticleClient({ post }: { post: Post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Logo and Menu */}
      <motion.div 
        className="fixed top-8 left-8 z-[60] flex items-center gap-6" 
        style={{ color: 'black' }}
      >
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex flex-col gap-1 cursor-pointer">
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ backgroundColor: 'black' }} />
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'black' }} />
          <motion.div className={`w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ backgroundColor: 'black' }} />
        </button>
        <motion.h1 className="font-bold tracking-wider" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(16px, 1.2vw, 20px)', letterSpacing: '0.2em', color: 'black' }}>
          TOMORROW
        </motion.h1>
      </motion.div>

      {/* Mega Menu Panel (copied behavior from brand page) */}
      {isMenuOpen && (
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
                  <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Lausanne' }}>Brand Transformation</h3>
                  <div className="w-76 h-0.5 bg-gray-300" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { title: 'Capabilities', items: ['Brand Architecture','Brand Strategy', 'Brand Identity', 'Brand Content',  'Brand Experience'] },
                    { title: 'Thought Leadership', items: ['Global News', 'Market Reports', 'Strategic Insights', 'Global Trends', 'Case Studies'] },
                    { title: 'Industries', items: ['Real Estate', 'Luxury & Fashion', 'Technology & Startups', 'Professional Services', 'Healthcare & Wellness'] }
                  ].map((col, ci) => (
                    <div className="space-y-4" key={ci}>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500" style={{ fontFamily: 'Lausanne' }}>{col.title}</h4>
                      {col.items.map((s, i) => (
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

      {/* Header */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-1">
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

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              >
                <div className="w-full max-w-sm mb-8 mt-48">
                  <div className="mb-2">
                    <div className="w-6 h-6">
                      <Image src="/media/icon.svg" alt="Custom icon" width={24} height={24} className="w-6 h-6" />
                    </div>
                  </div>

                  <MetaRow label="Date" value={new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <MetaRow label="Category" value={post.tag} />
                  <MetaRow label="Writer" value={post.writer} />
                </div>
              </motion.div>

              {/* Share section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="w-full max-w-sm mt-16"
              >
                <p
                  className="text-gray-600 mb-4 pb-3 border-b border-gray-200"
                  style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}
                >
                  Share
                </p>
                <div className="flex items-center gap-3">
                  <CircleBtn ariaLabel="Copy link">
                    <LinkIcon />
                  </CircleBtn>
                  <CircleBtn ariaLabel="Share to X">
                    <XIcon />
                  </CircleBtn>
                  <CircleBtn ariaLabel="Share to Facebook">
                    <FacebookIcon />
                  </CircleBtn>
                  <CircleBtn ariaLabel="Share to LinkedIn">
                    <LinkedInIcon />
                  </CircleBtn>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }} className="lg:col-span-1">
              <div className="relative w-full h-[600px] lg:h-[700px] mt-12">
                {post.mainImage && (
                  <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" priority />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-white py-16 lg:py-24">
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="w-full h-px bg-gray-300 mb-12" />

        <div className="mx-auto w-full max-w-[900px] px-6 md:px-10 lg:px-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }} className="text-black font-black mb-12" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 900 }}>
            {post.secondTitle || 'BUILD. POSITION. DOMINATE.'}
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }} className="prose prose-lg max-w-none" style={{ fontFamily: 'Lausanne' }}>
            {[
              { paragraph: post.paragraph1, image: post.image1, video: post.video1, number: 1 },
              { paragraph: post.paragraph2, image: post.image2, video: post.video2, number: 2 },
              { paragraph: post.paragraph3, image: post.image3, video: post.video3, number: 3 },
              { paragraph: post.paragraph4, image: post.image4, video: post.video4, number: 4 },
              { paragraph: post.paragraph5, image: post.image5, video: post.video5, number: 5 },
              { paragraph: post.paragraph6, image: post.image6, video: post.video6, number: 6 },
              { paragraph: post.paragraph7, image: post.image7, video: post.video7, number: 7 }
            ].map((section, index) => (
              <div key={index}>
                {section.paragraph && (
                  <div className="text-black text-lg leading-relaxed mb-6">
                    <PortableTextComponent value={section.paragraph} />
                  </div>
                )}

                {section.video && (
                  <div className="my-8">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full rounded-lg object-cover">
                        <source src={section.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {section.image && (
                  <div className="my-8">
                    <div className="relative w-full h-[400px]">
                      <Image src={urlFor(section.image).url()} alt={`Article image ${section.number}`} fill className="object-cover rounded-lg" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {(!post.paragraph1 || post.paragraph1.length === 0) &&
             (!post.paragraph2 || post.paragraph2.length === 0) &&
             (!post.paragraph3 || post.paragraph3.length === 0) &&
             (!post.paragraph4 || post.paragraph4.length === 0) &&
             (!post.paragraph5 || post.paragraph5.length === 0) &&
             (!post.paragraph6 || post.paragraph6.length === 0) &&
             (!post.paragraph7 || post.paragraph7.length === 0) && (
              <div className="text-gray-500 text-center py-8">
                <p>Article content will appear here once added in Sanity CMS.</p>
                <p className="text-sm mt-2">Add content to the paragraph fields in your Sanity post.</p>
              </div>
            )}
          </motion.div>

          {post.bottomImage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }} className="mt-16">
              <div className="relative w-full h-[500px]">
                <Image src={urlFor(post.bottomImage).url()} alt="Article bottom image" fill className="object-cover" />
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }} className="mt-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'Lausanne', fontWeight: 600 }}>
                Key Takeaways
              </h3>
              <ul className="space-y-3 text-gray-700" style={{ fontFamily: 'Lausanne' }}>
                {post.keyTakeaways && post.keyTakeaways.length > 0 ? (
                  post.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{takeaway}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Add key takeaways in the Sanity CMS to see them here</span>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER (DARK) — with slide-in animation */}
      <motion.section 
        className="w-screen h-screen relative bg-black" 
        initial={{ y: '100vh' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      >
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
                <h2 className="text-white mb-6" style={{ fontFamily: 'Ghost', fontStyle: 'italic', fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 0.9 }}>
                  Our<br />Story
                </h2>
                <p className="text-white max-w-md" style={{ fontFamily: 'Lausanne', fontSize: 'clamp(18px, 1.5vw, 24px)', lineHeight: 1.5, fontWeight: 400 }}>
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
                  <Image src="/media/TheTomorrow_LogoWhite.svg" alt="The Tomorrow Logo" width={320} height={320} className="w-full h-full object-contain" />
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
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200">
      <span className="text-gray-600" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 400 }}>
        {label}
      </span>
      <span className="text-gray-900" style={{ fontFamily: 'Lausanne', fontSize: 14, fontWeight: 600 }}>
        {value}
      </span>
    </div>
  )
}

function CircleBtn({ children, ariaLabel }: { children: any; ariaLabel: string }) {
  return (
    <button
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
    >
      <span className="text-gray-800">{children}</span>
    </button>
  )
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54 0l3.36-3.36a5 5 0 0 0-7.07-7.07l-1.41 1.41"/>
      <path d="M14 11a5 5 0 0 0-7.54 0L3.1 14.36a5 5 0 0 0 7.07 7.07l1.41-1.41"/>
    </svg>
  )
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073C0 18.063 4.388 23.027 10.125 23.927v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
    </svg>
  )
}


