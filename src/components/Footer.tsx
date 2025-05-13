
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GenUI Assistant. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/api-config">API Settings</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

export default Footer;
