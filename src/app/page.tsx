'use client';

import { useState, useEffect } from 'react';
import { Nav } from '../components/nav';
import { MoveRight } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = 'WELCOME TO LMT 5';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const scheduleData = [
    {
      day: 'Day 1',
      date: '19 Dec 2025',
      events: [
        { time: '08:00 - 08:30', title: 'Registration' },
        { time: '08:30 - 09:30', title: 'พิธีเปิดค่าย' },
        { time: '09:30 - 12:00', title: 'Ice Breaking' },
        { time: '12:00 - 13:00', title: 'Lunch Break' },
        { time: '13:00 - 18:00', title: 'Python Class' },
      ]
    },
    {
      day: 'Day 2',
      date: '20 Dec 2025',
      events: [
        { time: '08:00 - 08:30', title: 'Registration' },
        { time: '08:30 - 11:30', title: 'Software / Hardware Class' },
        { time: '11:30 - 12:30', title: 'Lunch Break' },
        { time: '12:30 - 15:30', title: 'Software / Hardware Class' },
        { time: '15:30 - 18:00', title: 'Walk Rally' },
      ]
    },
    {
      day: 'Day 3',
      date: '21 Dec 2025',
      events: [
        { time: '08:00 - 08:30', title: 'Registration' },
        { time: '08:30 - 09:30', title: 'Talk with Senior' },
        { time: '09:30 - 10:30', title: 'Brief Project' },
        { time: '10:30 - 11:30', title: 'Brainstorm & Design' },
        { time: '11:30 - 12:30', title: 'Lunch Break' },
        { time: '12:30 - 14:00', title: 'Brainstorm & Design' },
        { time: '14:00 - 16:00', title: 'Project Presentation' },
        { time: '16:00 - 17:00', title: 'พิธีปิดค่าย' },
        { time: '17:00 - 18:00', title: 'Party (*optional)' },
      ]
    },
  ];

  return (
    <div className="bg-[#0f0515] min-h-screen">
      <Nav/>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-radial from-[#ffed00]/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        
        <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-200 neon-text mb-6 tracking-wider">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 mb-8 max-w-2xl mx-auto">
            Kasetsart University, Computer Engineering Camp
          </p>
          <a href="/learn">
            <button className="flex flex-row items-center gap-2 px-8 py-3 bg-transparent border-2 border-[#ffed00] text-[#ffed00] rounded-lg hover:bg-[#ffed00] hover:text-[#0f0515] transition-all duration-300 neon-border text-lg font-semibold">
              Learn Now <MoveRight />
            </button>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffed00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-[#ffed00] neon-text mb-16">Schedule</h2>
          
          <div className="relative">
            {/* Timeline Line - Mobile left, Desktop center */}
            <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ffed00] via-purple-500 to-[#ffed00]"></div>
            
            <div className="space-y-12">
              {scheduleData.map((day, dayIndex) => (
                <div key={dayIndex} className={`relative pl-16 md:pl-0 ${dayIndex % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'}`}>
                  {/* Timeline Dot - Mobile left, Desktop center */}
                  <div className={`absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-8 w-[20px] h-[20px] bg-[#ffed00] rounded-full neon-dot`}></div>
                  
                  {/* Day Header */}
                  <div className={`mb-6 ${dayIndex % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#ffed00] neon-text mb-2">{day.day}</h3>
                    <p className="text-purple-300 text-lg">{day.date}</p>
                  </div>
                  
                  {/* Events Card */}
                  <div className={`bg-[#1a0b2e]/80 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 ${dayIndex % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="space-y-3">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className={`flex items-start gap-4 text-sm md:text-base ${dayIndex % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <span className="text-purple-300 font-mono whitespace-nowrap">{event.time}</span>
                          <span className="text-gray-300">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
