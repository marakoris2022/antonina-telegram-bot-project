'use client';

import { useEffect } from 'react';
import { Header } from '@/front/components/Header';
import { Footer } from '@/front/components/Footer';
import { Hero } from '@/front/widgets/Hero';
import { About } from '@/front/widgets/About';
import { Services } from '@/front/widgets/Services';
import { Benefits } from '@/front/widgets/Benefits';
import { Gallery } from '@/front/widgets/Gallery';
import { Testimonials } from '@/front/widgets/Testimonials';
import { FAQ } from '@/front/widgets/FAQ';
import { CTA } from '@/front/widgets/CTA';
import { Contacts } from '@/front/widgets/Contacts';

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLAnchorElement;
        if (target.matches('a[href^="#"]')) {
          e.preventDefault();
          const id = target.getAttribute('href');
          if (id === '#') return;
          
          const element = document.querySelector(id as string);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="about" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <About />
          </div>
        </section>
        
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <Services />
          </div>
        </section>
        
        <section id="benefits" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <Benefits />
          </div>
        </section>
        
        <section id="gallery" className="py-20">
          <div className="container mx-auto px-4">
            <Gallery />
          </div>
        </section>
        
        <section id="testimonials" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <Testimonials />
          </div>
        </section>
        
        <section id="faq" className="py-20">
          <div className="container mx-auto px-4">
            <FAQ />
          </div>
        </section>
        
        <section id="cta" className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <CTA />
          </div>
        </section>
        
        <section id="contacts" className="py-20">
          <div className="container mx-auto px-4">
            <Contacts />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
