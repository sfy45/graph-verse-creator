
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold gradient-text">
              GenUI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink to="/features">Features</NavLink>
              <NavLink to="/docs">Documentation</NavLink>
              <NavLink to="/examples">Examples</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button size="sm">Sign In</Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <MobileNavLink to="/features" onClick={() => setIsMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink to="/docs" onClick={() => setIsMenuOpen(false)}>Documentation</MobileNavLink>
            <MobileNavLink to="/examples" onClick={() => setIsMenuOpen(false)}>Examples</MobileNavLink>
            <MobileNavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" className="justify-start">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-foreground/80 hover:text-foreground transition-colors">
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children }: { to: string; onClick: () => void; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="block text-foreground/80 hover:text-foreground py-2 transition-colors" 
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
