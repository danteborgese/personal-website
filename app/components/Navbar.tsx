"use client";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { useState } from "react";

export default function Navbar() {
  const navItems = [
    {
      name: "Work",
      link: "#work",
    },
    {
      name: "Content",
      link: "#content",
    },
    {
      name: "Interests",
      link: "#interests",
    },
    {
      name: "Library",
      link: "#library",
    },
    {
      name: "Socials",
      link: "#socials",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const CustomNavbarLogo = () => {
    return (
      <a
        href="#hero"
        onClick={(e) => handleLinkClick(e as any, '#hero')}
        className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white"
      >
        <span className="font-medium">Dante Borgese</span>
      </a>
    );
  };

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <CustomNavbarLogo />
          <NavItems 
            items={navItems} 
            onItemClick={() => {}}
          />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <CustomNavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleLinkClick(e, item.link)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
