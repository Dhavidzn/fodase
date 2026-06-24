/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Cases from './components/Cases';
import Diferenciais from './components/Diferenciais';
import Sectors from './components/Sectors';
import Mission from './components/Mission';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-white selection:bg-white selection:text-black">
      {/* Universal navigation and progress bar */}
      <Header />

      {/* Main content elements */}
      <main id="main-content" className="relative">
        
        {/* Scroll-driven Video Hero */}
        <Hero />

        {/* Intro copy and 3x2 Services Grid */}
        <Services />

        {/* Interactive Case showcasing (Sentinel compare slider, GIS platform, dashboards) */}
        <Cases />

        {/* Bento style glowing differentials */}
        <Diferenciais />

        {/* Interactive sector node dashboard */}
        <Sectors />

        {/* Large quote mission statement */}
        <Mission />

        {/* Input specifications conforming contact form */}
        <ContactForm />

      </main>

      {/* Semantic footer containing navigation links and meta references */}
      <Footer />
    </div>
  );
}
