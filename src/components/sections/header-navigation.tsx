"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenuOverlay from "./mobile-menu-overlay";
import logo from "../../assets/SVG/LOGOTEXT.svg";
import aboutus from "../../assets/mis5.jpg";
import academics from "../../assets/mis.jpg";
import studentlife from "../../assets/mis2.jpg";
import campus from "../../assets/mis7.jpg";
import admissions from "../../assets/mis7.jpg";
import contact from "../../assets/mis8.jpg";

const mainNavItems = [
  {
    title: "About Us",
    href: "/about-us",
    image: aboutus,
    subItems: [
      { title: "Founder & Chairman", href: "/about-us/founder-chairman" },
      { title: "Overview", href: "/about-us/overview" },
    ],
  },
  {
    title: "Our Campus",
    href: "/our-campus",
    image: campus,
  },
  {
    title: "Academics",
    href: "/academics",
    image: academics,
    subItems: [
      { title: "Curriculum", href: "/academics/curriculum" },
      { title: "Faculty & Team", href: "/academics/faculty-team" },
    ],
  },
  {
    title: "Admissions",
    href: "/admissions",
    image: admissions,
    subItems: [
      { title: "How to Apply", href: "/admissions/how-to-apply" },
      { title: "Careers", href: "/admissions/careers" },
    ],
  },
  // {
  //   title: "Student Life",
  //   href: "/student-life",
  //   image: studentlife,
  //   subItems: [
  //     { title: "Arts & Activities", href: "/student-life/arts-activities" },
  //     { title: "Athletics", href: "/student-life/athletics" },
  //     { title: "Events & Community Service", href: "/student-life/events-community-service" },
  //   ],
  // },
  {
    title: "Contact Us",
    href: "/contact-us",
    image: contact,
  },
];

const utilityNavItems = [
  { title: "Login", href: "/admin-login", hasIcon: true },
];

const HeaderNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <>
      {/* Top Utility Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#580B57] hidden lg:block">
        <div className="mx-auto flex h-[32px] items-center justify-end px-5 md:px-10 max-w-[1700px] border-b border-white/10">
          <nav className="flex items-center gap-6 xl:gap-8">
            {utilityNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-white/90 hover:text-[#D1A3FF] font-sans text-[11px] xl:text-[12px] font-medium tracking-wide flex items-center gap-1.5 whitespace-nowrap transition-colors duration-200"
              >
                {item.hasIcon && <Lock className="h-3 w-3" />}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <header className="fixed top-0 lg:top-[32px] left-0 right-0 z-50 bg-[#580B57]">
        <div className="mx-auto flex h-[88px] items-center justify-between px-5 md:px-10 max-w-[1700px]">
          <div className="flex items-center">
            <Link href="/" className="mr-10">
              <Image
                src={logo}
                alt="Mysore International School"
                width={200}
                height={33}
                className="w-[200px] h-[33px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            {mainNavItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.subItems && setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.subItems ? (
                  // Items with dropdown - use button
                  <button
                    className={cn(
                      "px-4 xl:px-5 py-8 text-white hover:bg-[#4A0A4A] transition-colors duration-200 flex items-center font-semibold text-[14px] xl:text-[15px] uppercase tracking-[1px] relative",
                      activeMenu === item.title && "bg-[#4A0A4A]"
                    )}
                  >
                    {item.title}
                    {/* Yellow underline for active item */}
                    {activeMenu === item.title && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D1A3FF]" />
                    )}
                  </button>
                ) : (
                  // Items without dropdown - use Link
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 xl:px-5 py-8 text-white hover:bg-[#4A0A4A] transition-colors duration-200 flex items-center font-semibold text-[14px] xl:text-[15px] uppercase tracking-[1px] relative block"
                    )}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full bg-white shadow-2xl z-40 hidden lg:block"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-[1700px] mx-auto">
              {mainNavItems.map((item) =>
                item.title === activeMenu && item.subItems ? (
                  <div key={item.title} className="grid grid-cols-2 min-h-[400px]">
                    {/* Left Side - Image */}
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {/* Yellow title overlay */}
                      <div className="absolute bottom-10 left-10 z-20">
                        <h2 className="text-[#D1A3FF] text-5xl xl:text-6xl font-bold tracking-wide drop-shadow-lg uppercase">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    {/* Right Side - Menu Links */}
                    <div className="bg-white flex flex-col justify-center py-12 px-16">
                      <div className="space-y-2">
                        {/* Main page heading (non-clickable) */}
                        <div className="block py-4 text-[#580B57] text-xl font-bold font-serif uppercase tracking-wide">
                          {item.title}
                        </div>

                        {/* Sub items */}
                        {item.subItems.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="block py-4 text-gray-900 hover:text-[#580B57] transition-colors duration-200 border-b border-gray-200 last:border-b-0 text-base font-normal group"
                          >
                            <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                              {subItem.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </header>

      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default HeaderNavigation;
