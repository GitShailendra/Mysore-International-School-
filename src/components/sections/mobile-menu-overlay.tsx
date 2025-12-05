"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Search } from "lucide-react";
import logo from "../../assets/SVG/LOGOTEXT.svg";

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

const mainNavItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us",
    subItems: [
      { label: "Founder & Chairman", href: "/about-us/founder-chairman" },
      { label: "Vision & Mission", href: "/about-us/vision-mission" },
      { label: "Core Values", href: "/about-us/core-values" },
      { label: "History", href: "/about-us/history" },
    ],
  },
  {
    label: "Our Campus",
    href: "/our-campus",
  },
  {
    label: "Academics",
    href: "/academics",
    subItems: [
      { label: "Curriculum", href: "/academics/curriculum" },
      { label: "Faculty & Team", href: "/academics/faculty-team" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    subItems: [
      { label: "How to Apply", href: "/admissions/how-to-apply" },
      { label: "Careers", href: "/admissions/careers" },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    subItems: [
      { label: "Arts & Activities", href: "/student-life/arts-activities" },
      { label: "Athletics", href: "/student-life/athletics" },
      { label: "Events & Community Service", href: "/student-life/events-community-service" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const utilityNavItems = [
  { label: "Parents & Families", href: "/parents-and-families" },
  { label: "Alumni", href: "/alumni" },
  { label: "Support", href: "/support" },
  { label: "Bears' Den", href: "/bears-den" },
  { label: "My Mysore International School Login", href: "/admin-login" },
];

const NavLink = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  return (
    <Link 
      href={item.href} 
      onClick={onClose}
      className="text-white/80 hover:text-white transition-colors duration-300 font-body"
    >
      {item.label}
    </Link>
  );
};

const AccordionItem = ({ item, onClose }: { item: NavItem; onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <li className="border-b border-white/20 last:border-b-0">
      <div className="flex justify-between items-center h-[76px]">
        <Link 
          href={item.href} 
          onClick={onClose}
          className="font-display text-[28px] text-white hover:text-brand-accent-lime transition-colors"
        >
          {item.label}
        </Link>
        {hasSubItems && (
          <button onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded} className="text-white p-2 -mr-2">
            <span className="sr-only">toggle {item.label} section</span>
            {isExpanded ? <Minus size={28} /> : <Plus size={28} />}
          </button>
        )}
      </div>
      {hasSubItems && (
        <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isExpanded ? "max-h-[1000px]" : "max-h-0"}`}>
          <ul className="pt-2 pb-6 space-y-[18px]">
            {item.subItems?.map((subItem) => (
              <li key={subItem.label}>
                <NavLink item={subItem} onClose={onClose} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className="fixed inset-0 z-[9000] bg-[#3A063A] transform transition-transform duration-500 ease-in-out data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full lg:hidden"
      aria-hidden={!isOpen}
    >
      <div className="relative h-full w-full text-white overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-[30px] right-[20px] z-30 flex items-center justify-center h-[33px] w-[33px]"
          aria-label="close menu"
        >
          <X size={32} className="text-white" />
        </button>

        <div className="pt-[80px] px-5 pb-8">
          <div className="mb-[21px] flex justify-center">
            <Link href="/" onClick={onClose}>
              <Image
                src={logo}
                width={245}
                height={18}
                alt="Mysore International School School"
              />
            </Link>
          </div>

       
          
          <nav className="border-t border-white/20">
            <ul>
              {mainNavItems.map((item) => (
                <AccordionItem key={item.label} item={item} onClose={onClose} />
              ))}
            </ul>
          </nav>

          <nav className="mt-8 pt-8 border-t border-white/20 space-y-4">
            {utilityNavItems.map((item) => (
              <Link 
                href={item.href} 
                key={item.label} 
                onClick={onClose}
                className="block text-xl font-semibold text-white hover:text-brand-accent-lime transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuOverlay;