import Image from "next/image";
import { cn } from "@/lib/cn";
import { BOOK } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * Renders the official book cover image (/images/media/bookcover.png).
 */
export function CoverArt({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-[6px] bg-slate-900 shadow-2xl shadow-slate-900/40 ring-1 ring-slate-900/10 transition-transform duration-500 hover:scale-[1.02]",
        className,
      )}
      role="img"
      aria-label={`Cover art for the book, ${BOOK.workingTitle}, by ${SITE.name}`}
    >
      <Image
        src="/images/book_cover.png"
        alt={`Cover art for the book, ${BOOK.workingTitle}, by ${SITE.name}`}
        fill
        priority
        quality={95}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
        className="object-cover object-center"
      />
    </div>
  );
}
