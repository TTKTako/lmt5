'use client';

import { useState, useEffect } from 'react';
import { Nav } from '../components/nav';
import ASCIIText from '../components/ASCIIText';

export default function Home() {

  return (
    <div className="bg-[#0f0515] min-h-screen">
      <Nav/>
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20 bg-gray-900">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <ASCIIText
              text='404!'
              enableWaves={true}
              asciiFontSize={8}
          />
        </div>
      </section>
    </div>
  );
}
