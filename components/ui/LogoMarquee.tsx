import Image from "next/image";
import { INSTITUTIONS } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/cn";

/**
 * Infinite social-proof rail. The list is duplicated once and the track is
 * translated -50%, so the loop is seamless; the copy is `aria-hidden` to keep
 * the accessible name list free of duplicates.
 */
export function LogoMarquee({ className }: { className?: string }) {
  return (
    <div className={cn("marquee-mask relative overflow-hidden", className)}>
      <ul className="animate-marquee pause-on-hover flex w-max items-center gap-x-12 sm:gap-x-16 lg:gap-x-20">
        {[0, 1].map((pass) =>
          INSTITUTIONS.map(({ name, icon, logo }) => {
            const Icon = icon ? getIcon(icon) : null;

            return (
              <li
                key={`${pass}-${name}`}
                aria-hidden={pass === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-3 text-ink-faint transition-colors duration-300 hover:text-ink"
              >
                {logo ? (
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-line/60 bg-paper-bright p-0.5 shadow-xs">
                    <Image
                      src={logo}
                      alt={name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : Icon ? (
                  <Icon className="h-4 w-4 shrink-0 text-ink/70" aria-hidden="true" />
                ) : null}
                <span className="whitespace-nowrap font-sans text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink/80 sm:text-xs">
                  {name}
                </span>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}
