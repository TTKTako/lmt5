'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Nav() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Learn', path: '/learn' },
        { name: 'IDE', path: '/ide?lang=python' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="fixed top-0 w-full bg-[#1a0b2e]/95 backdrop-blur-sm z-50 border-b border-[#ffed00]/20">
          <nav className="flex justify-between items-center p-4 px-10 w-full max-w-[1920px] mx-auto">
            <p className="text-[#ffed00] text-2xl font-bold neon-text">
              <Link href="/">LMT 5</Link>
            </p>
            
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-8 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`text-[#ffed00] transition-all duration-300 hover:text-[#ffd700] ${
                      pathname === item.path
                        ? 'opacity-100 border-b-2 border-[#ffed00] pb-1 neon-text-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-[#ffed00] p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1a0b2e]/95 backdrop-blur-sm border-b border-[#ffed00]/20 z-40">
              <ul className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      onClick={closeMenu}
                      className={`block text-[#ffed00] transition-all duration-300 py-2 ${
                        pathname === item.path
                          ? 'opacity-100 font-semibold neon-text-sm'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    );
}