import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-background text-foreground border-t border-primary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-light">
            © {new Date().getFullYear()} <span className="font-semibold text-primary">Ahmed RAOUANE</span>. All rights reserved.
          </div>

          <div className="flex gap-6">
            <Link
              href="https://github.com/ahmedRAOUANE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-all duration-300"
              title="Follow me on GitHub"
            >
              <FaGithub />
            </Link>

            <Link
              href="https://linkedin.com/in/ahmed-raouane"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-all duration-300"
              title="Follow me on LinkedIn"
            >
              <FaLinkedin />
            </Link>
            
            <Link
              href="https://x.com/RaouaneAhm93432"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-all duration-300"
              title='Follow me on X (formerly Twitter)'
            >
              <FaXTwitter />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;