"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

const LINE_URL = "https://line.me/R/ti/p/@154cxzgk?oat_content=url";

const NAV_LINKS: NavLink[] = [
  { label: "Our Brand", href: "/#ourbrand" },
  { label: "News", href: "/#news" },
  { label: "Visit Us", href: "/visit-us" },
  { label: "Customer Service", href: LINE_URL, external: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-(--black) text-(--white)">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="shrink-0" aria-label="Saiens">
          <Image
            src="/images/4e5eb5e9-ee4f-4310-8968-239e6d312f1d/logo+white+small.png"
            alt="Saiens"
            width={140}
            height={25}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span
            className={`block h-px w-6 bg-(--white) transition-transform ${
              isMenuOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-(--white) transition-opacity ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-6 bg-(--white) transition-transform ${
              isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          isMenuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              onNavigate={() => setIsMenuOpen(false)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  link,
  onNavigate,
}: {
  link: NavLink;
  onNavigate?: () => void;
}) {
  const className =
    "text-sm uppercase tracking-wide text-(--white) transition-colors hover:text-(--accent)";

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}
