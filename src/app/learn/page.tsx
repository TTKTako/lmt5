'use client';

import { useState } from 'react';
import { Nav } from '../../components/nav';
import { tr } from 'motion/react-client';

// Configuration for courses - easy to modify
interface Slide {
  id: number;
  title: string;
  url: string;
  visible: boolean;
  download?: boolean;
}

interface CourseConfig {
  visible: boolean;
  hasIDE: boolean;
  slides: Slide[];
  ideUrl?: string;
}

const coursesConfig: Record<string, CourseConfig> = {
  Python: {
    visible: true,
    hasIDE: true,
    slides: [
      { id: 0, title: 'Elab Link', url: 'https://elab.cpe.ku.ac.th/elab/accounts/login/?next=/elab/', visible: true },
      // { id: 1, title: 'Introduction to Python', url: 'https://www.canva.com/design/DAG77JG__0U/Es0H1MEZwDcna-KGyxS75w/view?utm_content=DAG77JG__0U&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfcbe5a788e', visible: true },
      { id: 1, title: 'Introduction to Python [Answer Key]', url: 'https://www.canva.com/design/DAG1UIKzaAw/-veXNI0lSRcA2HZ1EhxZPQ/view?utm_content=DAG1UIKzaAw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h957e561774', visible: true },
      // { id: 2, title: 'Python Applications', url: 'https://www.canva.com/design/DAG77ACzIrI/eGnS9m0TinRt-acQy_P6VQ/view?utm_content=DAG77ACzIrI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8e252cb85d', visible: true },
      { id: 2, title: 'Python Applications [Answer Key]', url: 'https://www.canva.com/design/DAG1UGyjIjA/KqSEn_9xcOxtd0hxyDWS1Q/view?utm_content=DAG1UGyjIjA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1c4444ef8d', visible: true },
      { id: 3, title: 'Python Hackathon', url: 'https://www.canva.com/design/DAG7e9Q405E/XZ_NOHSHpREZ--DpMCY9Tw/view?utm_content=DAG7e9Q405E&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb249b60597', visible: true },
      { id: 4, title: 'Hackathon Grader', url: 'https://grader.ttktako.dev/login', visible: true },
    ],
    ideUrl: '/ide?lang=python'
  },
  Software: {
    visible: true,
    hasIDE: true,
    slides: [
      { id: 1, title: 'Website Development Slide', url: '/Web_Development_compressed.pdf', visible: true },
      { id: 2, title: 'CSS Lab 1: Basic CSS', url: '/websiteLab/CSS1BasicCss.zip', visible: true, download: true },
      { id: 3, title: 'CSS Lab 2: Basic CSS', url: '/websiteLab/CSS2BasicProperty.zip', visible: false, download: true },
      { id: 4, title: 'CSS Lab 3: Basic CSS', url: '/websiteLab/CSS3Selector.zip', visible: false, download: true },
      { id: 5, title: 'CSS Lab 4: Basic CSS', url: '/websiteLab/CSS4OtherProperty.zip', visible: false, download: true },
      { id: 6, title: 'CSS Lab 5: Basic CSS', url: '/websiteLab/CSS5BoxProperty.zip', visible: false, download: true },
      { id: 7, title: 'HTML Lab: Example', url: '/websiteLab/HTML_example.zip', visible: true, download: true },
      { id: 8, title: 'Practice Lab 1: LMT Invitations', url: '/websiteLab/practice1_LMT_invitations.zip', visible: true, download: true },
      { id: 9, title: 'Practice Lab 2: Spanish Color', url: '/websiteLab/Practice2_SpanishColor.zip', visible: false, download: true },
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
                      download={slide.download}
                      target={slide.download ? undefined : '_blank'}
                      rel={slide.download ? undefined : 'noopener noreferrer'}
                      className={`block bg-[#1a0b2e]/80 backdrop-blur-sm border rounded-lg p-6 transition-all duration-300 hover:shadow-lg group ${
                        slide.download 
                          ? 'border-[#39ff14]/50 hover:border-[#39ff14] hover:shadow-[#39ff14]/20' 
                          : 'border-purple-500/30 hover:border-[#ffed00] hover:shadow-purple-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className={`font-bold text-xl group-hover:neon-text-sm ${
                            slide.download ? 'text-[#39ff14]' : 'text-[#ffed00]'
                          }`}>
                            {String(slide.id).padStart(2, '0')}
                          </span>
                          <div className="flex items-center gap-3">
                            <h4 className={`text-xl transition-all ${
                              slide.download 
                                ? 'text-gray-300 group-hover:text-[#39ff14]' 
                                : 'text-gray-300 group-hover:text-[#ffed00]'
                            }`}>
                              {slide.title}
                            </h4>
                            {slide.download && (
                              <span className="flex items-center gap-1 text-xs text-[#39ff14] border border-[#39ff14]/50 rounded-full px-2 py-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download
                              </span>
                            )}
                          </div>
                        </div>
                        {slide.download ? (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#39ff14]/70 group-hover:text-[#39ff14] transition-all">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 group-hover:text-[#ffed00] transition-all">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        )}
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
