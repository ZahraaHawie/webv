'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeaderMegaMenu from '../../components/HeaderMegaMenu';

export default function PortalPage() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeaderMegaMenu activeItem="portal" />

      {/* Auth body */}
      <section className="pt-32 pb-24">
        <div className="max-w-[520px] mx-auto px-4">
          {/* Wordmark */}
          <div className="text-center mb-26 select-none" aria-label="The Tomorrow Agency">
            <img 
              src="/media/TheTomorrow_LogoBlack2.svg" 
              alt="The Tomorrow Agency" 
              className="mx-auto h-30 w-auto"
            />
          </div>

          <form className="space-y-6">
            {/* Username */}
            <div>
              <label className="block mb-2 text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 600 }}>Username</label>
              <input
                type="text"
                className="w-full h-12 rounded-xl border border-zinc-300 focus:border-black focus:outline-none px-4 text-black bg-white"
                style={{ fontFamily: 'Lausanne', fontSize: 16 }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-black" style={{ fontFamily: 'Lausanne', fontSize: 20, fontWeight: 600 }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full h-12 rounded-xl border border-zinc-300 focus:border-black focus:outline-none px-4 pr-11 text-black bg-white"
                  style={{ fontFamily: 'Lausanne', fontSize: 16 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.85 3.05-5.18 5.65-6.54" />
                        <path d="M1 1l22 22" />
                        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-.53 1.49-1.33 2.85-2.34 4" />
                        <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button type="button" className="w-full h-12 rounded-xl bg-black text-white hover:opacity-90 transition-opacity" style={{ fontFamily: 'Lausanne', fontSize: 18, fontWeight: 600 }}>
                Log In
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
