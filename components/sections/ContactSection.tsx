import { Facebook, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

/** Contact page body in the white/slate/Inter system: availability rail + form. */
export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className="w-full bg-white font-inter text-slate-900"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Availability */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="block font-inter text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Availability
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="contact-form-heading"
                className="mt-6 max-w-md text-2xl font-bold leading-[1.2] tracking-tight text-slate-900 sm:text-3xl"
              >
                Available for collaboration.
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md font-inter text-base font-light leading-loose text-slate-600 sm:text-lg">
                Open to policy consulting, legislative drafting, strategic
                organizational planning, and media commentary on governance and
                public administration.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-6 border-t border-slate-200 pt-8">
                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-900">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      Email
                    </h3>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-2 inline-block font-inter text-[0.9375rem] text-slate-900 underline-offset-4 transition-colors hover:text-slate-500 hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-slate-200 bg-white text-slate-900">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                      Based
                    </h3>
                    <p className="mt-2 font-inter text-[0.9375rem] font-light text-slate-600">
                      Available to travel anywhere in the world
                    </p>
                  </div>
                </li>

                <li className="pt-2 border-t border-slate-100 flex items-center gap-3">
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
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12} direction="right">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
