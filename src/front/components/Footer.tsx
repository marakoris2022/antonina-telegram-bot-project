'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Instagram, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link 
            href="https://instagram.com/your_instagram" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          <Link 
            href="mailto:example@example.com" 
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </Link>
          <Link 
            href="tel:+1234567890" 
            className="text-foreground/60 hover:text-primary transition-colors"
          >
            <span className="sr-only">Телефон</span>
            <Phone className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-foreground/60">
            &copy; {currentYear} Antonina Fitness. Все права защищены.
          </p>
        </div>
        <div className="mt-8 md:order-3 md:mt-0">
          <Button asChild variant="ghost" size="sm">
            <Link href="#hero" className="text-sm">
              Наверх
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
