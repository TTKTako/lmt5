import Link from 'next/link';
import { Github, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#1a0b2e]/95 backdrop-blur-sm border-t border-[#ffed00]/20 py-8">
      <div className="max-w-[1920px] mx-auto px-10">
        <div className="flex flex-col items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex gap-6">
            <Link 
              href="https://github.com/TTKTako/lmt5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group text-[#ffed00] hover:text-[#ffed00]/70 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a0b2e] border border-[#ffed00]/30 text-[#ffed00] text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                GitHub
              </span>
            </Link>
            <Link 
              href="https://www.facebook.com/share/16HBv2kJuQ/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group text-[#ffed00] hover:text-[#ffed00]/70 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a0b2e] border border-[#ffed00]/30 text-[#ffed00] text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Facebook
              </span>
            </Link>
            <Link 
              href="https://www.instagram.com/lmt_camp?igsh=NDA4dG5uMDV5cnEx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group text-[#ffed00] hover:text-[#ffed00]/70 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a0b2e] border border-[#ffed00]/30 text-[#ffed00] text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Instagram
              </span>
            </Link>
          </div>
          
          {/* Copyright Text */}
          <p className="text-[#ffed00]/80 text-sm text-center">
            © 2025 Let Me Try 5 Camp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
