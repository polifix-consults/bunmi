"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { ArrowUpRight, ChevronDown } from "lucide-react";

import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Global fixed header for interior pages, in the home page's white/slate/Inter
 * system. The home page (<Hero>) and the research library both render their own
 * self-contained header, so this is suppressed on those two routes.
 *
 * The inner rail matches the hero exactly — same max-width, gutters and type —
 * so the wordmark and links sit on the identical vertical rhythm site-wide.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);



  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300",
        scrolled || open
          ? "border-b border-slate-200 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
          : "border-b border-slate-200/60",
      )}
    >
      <div className="mx-auto flex h-[var(--nav-h)] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Home" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-xs">
            <Image
              src="/images/media/pfp.png"
              alt="Olubunmi Ayantunji"
              width={36}
              height={36}
              priority
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="font-inter text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-slate-900 transition-colors duration-200 group-hover:text-[#0A2540]">
            OLUBUNMI AYANTUNJI.
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            const hasSubLinks = Boolean(link.subLinks && link.subLinks.length > 0);

            return (
              <div key={link.href} className="relative group/nav py-3 flex items-center">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 py-1 font-inter text-xs tracking-widest whitespace-nowrap transition-colors duration-200",
                    active
                      ? "font-medium text-slate-900"
                      : "font-light text-slate-500 hover:text-slate-900",
                  )}
                >
                  <span>{link.label}</span>
                  {hasSubLinks ? (
                    <ChevronDown className="h-3 w-3 text-slate-400 transition-transform duration-200 group-hover/nav:rotate-180" />
                  ) : null}
                  {active ? (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute -bottom-1 left-0 h-[2px] w-full bg-slate-900"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </Link>

                {/* Secondary Dropdown Menu on Hover */}
                {hasSubLinks && link.subLinks ? (
                  <div className="invisible pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-1 opacity-0 transition-all duration-200 ease-out group-hover/nav:visible group-hover/nav:pointer-events-auto group-hover/nav:opacity-100 z-50">
                    <div className="w-80 rounded-lg border border-slate-200/90 bg-white p-2 shadow-xl ring-1 ring-slate-900/5 font-inter">
                      <div className="px-3 pt-2 pb-1.5 border-b border-slate-100">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400">
                          Platforms &amp; Initiatives
                        </span>
                      </div>
                      <div className="py-1">
                        {link.subLinks.map((sub) => (
                          <a
                            key={sub.title}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item flex items-start justify-between rounded-md p-2.5 transition-colors hover:bg-slate-50"
                          >
                            <div className="space-y-0.5 text-left">
                              <span className="block text-xs font-semibold text-slate-900 group-hover/item:text-[#0A2540]">
                                {sub.title}
                              </span>
                              {sub.tagline ? (
                                <span className="block text-[11px] font-light leading-snug text-slate-500">
                                  {sub.tagline}
                                </span>
                              ) : null}
                            </div>
                            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-all group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-[#0A2540]" />
                          </a>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 pt-1.5 px-1">
                        <Link
                          href={link.href}
                          className="block rounded py-1.5 text-center text-[10px] font-bold tracking-[0.16em] text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          View Policy Engagement Page &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex items-center gap-2 p-1 text-slate-900 transition-opacity hover:opacity-70 focus:outline-none md:hidden"
        >
          <span className="font-inter text-[11px] font-semibold tracking-[0.2em]">
            {open ? "Close" : "Menu"}
          </span>
          <div className="flex h-2.5 w-5 flex-col justify-between">
            <span
              className={cn(
                "block h-[1.5px] w-full bg-slate-900 transition-transform duration-300",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-full bg-slate-900 transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden max-h-[85vh] overflow-y-auto"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-4 py-6 sm:px-6">
              <li>
                <Link
                  href="/"
                  className="block py-2.5 font-inter text-xs font-light tracking-widest text-slate-500 transition-colors hover:text-slate-900"
                >
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * (i + 1), duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block py-2.5 font-inter text-xs tracking-widest transition-colors",
                        active ? "text-slate-900 font-medium" : "text-slate-500 font-light hover:text-slate-900",
                      )}
                    >
                      {link.label}
                    </Link>

                    {/* Mobile sub-links */}
                    {link.subLinks && link.subLinks.length > 0 ? (
                      <div className="ml-3 my-1 space-y-1 border-l border-slate-200 pl-3">
                        {link.subLinks.map((sub) => (
                          <a
                            key={sub.title}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-1.5 text-xs text-slate-600 hover:text-slate-900"
                          >
                            <span>{sub.title}</span>
                            <ArrowUpRight className="h-3 w-3 text-slate-400" />
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
