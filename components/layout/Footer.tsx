"use client";

import Link from "next/link";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

import { NAV_LINKS, SITE } from "@/lib/site";
import { useNewsletterModal } from "@/components/context/NewsletterModalContext";

export function Footer() {
  const { openNewsletterModal } = useNewsletterModal();

  return (
    <footer className="relative w-full bg-white text-slate-900 overflow-hidden font-inter border-t border-slate-200">
      {/* Background Vertical Alignment Lines (Grid Architecture matching Hero) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-5 divide-x divide-slate-200/60 z-0">
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Social */}
          <div className="max-w-md lg:col-span-6 space-y-4">
            <p className="font-inter text-sm leading-relaxed text-slate-600 font-light">
              Connect with Me on Social Media
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) profile"
                className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="flex h-9 w-9 items-center justify-center rounded border border-slate-200 text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={openNewsletterModal}
                className="group inline-flex items-center gap-3 rounded-md bg-[#0A2540] px-5 py-3 font-inter text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#061628] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-left"
              >
                <Mail className="h-4 w-4 text-slate-200 shrink-0 transition-transform duration-200 group-hover:scale-105" aria-hidden="true" />
                <span>Subscribe to Sidewalk Parliament Newsletter</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-300 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Navigation / Explore */}
          <nav aria-label="Footer — explore" className="lg:col-span-3">
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
              EXPLORE
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-xs text-slate-600 font-medium transition-colors hover:text-slate-950"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">
              CONTACT
            </h2>
            <ul className="mt-5 space-y-4 text-xs font-inter text-slate-600">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-slate-950 font-medium"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-slate-900" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 font-medium">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-900" aria-hidden="true" />
                {SITE.locations}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-200 pt-7 text-[11px] text-slate-500 font-inter sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
          <p className="font-inter">Available to Travel Anywhere</p>
        </div>
      </div>
    </footer>
  );
}
