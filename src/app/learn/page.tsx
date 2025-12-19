'use client';

import { useState } from 'react';
import { Nav } from '../../components/nav';

// Configuration for courses - easy to modify
const coursesConfig = {
  Python: {
    visible: true,
    hasIDE: true,
    slides: [
      { id: 1, title: 'Introduction to Python', url: '/slides/python/intro', visible: false },
      { id: 2, title: 'Python Applications', url: '/slides/python/variables', visible: false },
    ],
    ideUrl: '/ide?lang=python'
  },
  Software: {
    visible: true,
    hasIDE: true,
    slides: [
      { id: 1, title: 'Website Development', url: '/Web_Development_compressed.pdf', visible: false },
    ],
    ideUrl: '/ide?lang=software'
  },
  Hardware: {
    visible: true,
    hasIDE: false,
    slides: [
      { id: 1, title: 'ESP32 Programming [IOT]', url: 'https://www.canva.com/design/DAG7i3Qk_KI/yl68rIGfgD5XdmjcxmkVTA/view?utm_content=DAG7i3Qk_KI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h7bdecc7e36', visible: true },
    ]
  }
};

export default function LearnPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const visibleCourses = Object.entries(coursesConfig).filter(([_, config]) => config.visible);
  const selectedCourseConfig = selectedCourse ? coursesConfig[selectedCourse as keyof typeof coursesConfig] : null;
  const visibleSlides = selectedCourseConfig?.slides.filter(slide => slide.visible) || [];

  return (
    <div className="bg-[#0f0515] min-h-screen">
      <Nav />
      
      <section className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-[#ffed00] neon-text mb-4">
            Learning Hub
          </h1>
          <p className="text-center text-purple-300 mb-12 text-lg">
            Select a course to view available materials
          </p>

          {/* Course Selection */}
          {!selectedCourse ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {visibleCourses.map(([courseName, config]) => (
                <button
                  key={courseName}
                  onClick={() => setSelectedCourse(courseName)}
                  className="group relative bg-[#1a0b2e]/80 backdrop-blur-sm border-2 border-purple-500/30 rounded-lg p-8 hover:border-[#ffed00] transition-all duration-300 hover:shadow-lg hover:shadow-[#ffed00]/20"
                >
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-[#ffed00] mb-2 group-hover:neon-text-sm transition-all">
                      {courseName}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      {config.slides.filter(s => s.visible).length} lessons available
                    </p>
                    {config.hasIDE && (
                      <span className="inline-block mt-3 text-xs text-purple-400 border border-purple-400/50 rounded-full px-3 py-1">
                        IDE Available
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="mb-8 flex items-center gap-2 text-purple-300 hover:text-[#ffed00] transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Courses
              </button>

              {/* Selected Course Title */}
              <h2 className="text-4xl font-bold text-[#ffed00] neon-text mb-8 text-center">
                {selectedCourse}
              </h2>

              {/* IDE Button (if available) */}
              {selectedCourseConfig?.hasIDE && (
                <div className="mb-8 flex justify-center">
                  <a
                    href={selectedCourseConfig.ideUrl}
                    className="px-6 py-3 bg-transparent border-2 border-[#ffed00] text-[#ffed00] rounded-lg hover:bg-[#ffed00] hover:text-[#0f0515] transition-all duration-300 neon-border text-lg font-semibold flex items-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Open IDE
                  </a>
                </div>
              )}

              {/* Slides List */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-purple-300 mb-4">Lessons</h3>
                {visibleSlides.length > 0 ? (
                  visibleSlides.map((slide) => (
                    <a
                      key={slide.id}
                      href={slide.url}
                      className="block bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-[#ffed00] transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-[#ffed00] font-bold text-xl group-hover:neon-text-sm">
                            {String(slide.id).padStart(2, '0')}
                          </span>
                          <h4 className="text-xl text-gray-300 group-hover:text-[#ffed00] transition-all">
                            {slide.title}
                          </h4>
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 group-hover:text-[#ffed00] transition-all">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </a>
                  ))
                ) : (
                  <p className="text-center text-purple-300 py-8">No lessons available at the moment</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
