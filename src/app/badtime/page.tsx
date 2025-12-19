'use client';

import { Nav } from '../../components/nav';

export default function BadTimePage() {
  return (
    <div className="bg-[#0f0515] min-h-screen">
      <Nav />
      
      {/* Hero Section with IFrame */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-radial from-[#ffed00]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative z-10 w-full h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-6xl h-[80vh] bg-black/50 backdrop-blur-sm border-2 border-[#ffed00]/50 rounded-lg overflow-hidden shadow-lg shadow-[#ffed00]/20">
            <iframe
              id="iframehtml5"
              width="100%"
              height="100%"
              src="https://undertale-play.com/wp-content/uploads/gg/bad-time-simulator/"
              frameBorder="0"
              className="w-full h-full"
              allowFullScreen
              style={{overflow: 'hidden'}}
            />
          </div>
        </div>
      </section>
    </div>
  );
}