import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * First-person profile band — About page's opening section.
 * Left rail carries the clean portrait photo; the right column holds the bio.
 */
export function AboutExecutive() {
  return (
    <section
      aria-labelledby="about-heading"
      className="relative overflow-hidden w-full bg-white font-inter text-slate-900 pt-[calc(var(--nav-h)+2.5rem)] pb-16 sm:pb-20 lg:pb-24 border-b border-slate-200/80"
    >
      {/* Background Vertical Alignment Lines (Grid Architecture) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-5 divide-x divide-slate-200/60 z-0">
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
        <div className="h-full hidden md:block" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <Reveal>
            <span className="block font-inter text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Profile
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              id="about-heading"
              className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              About Bunmi
            </h1>
          </Reveal>
        </div>

        {/* Main Grid: Photo (Left) & Biographical Text (Right) */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* LEFT: Portrait Photo */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-slate-200/80 bg-slate-100">
                <Image
                  src="/images/pictures/mainpic2.jpeg"
                  alt="Olubunmi (Bunmi) Ayantunji"
                  fill
                  priority
                  sizes="(min-width: 1024px) 35vw, (min-width: 640px) 70vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Biographical Narrative */}
          <div className="lg:col-span-7">
            <Reveal delay={0.16}>
              <div className="space-y-6 font-inter text-base font-light leading-relaxed text-slate-600 sm:text-lg sm:leading-loose">
                <p>
                  <span className="font-semibold text-slate-900">Olubunmi (Bunmi) Ayantunji</span> is a
                  governance and policy professional whose work spans governance reform, public policy
                  design, and strategic innovation. A lawyer by training, he holds a Master’s degree in
                  Legislative Studies and another in Public Administration. Across roles in Nigeria and
                  Canada, he has built a career strengthening decision-making structures, drafting
                  legislations, and supporting governments in developing and implementing coherent,
                  accountable policies.
                </p>
                <p>
                  He previously served in Nigeria’s Federal Parliament as a Senior Legislative
                  Advisor in the Senate, where he managed inter-parliamentary and intergovernmental
                  relations and contributed to national-level legislative strategy. In Canada, he
                  currently serves as Acting Director of Strategic Policy and Legislation with the
                  provincial government of Saskatchewan, providing leadership on cabinet-level policy
                  development, and strategic governance initiatives.
                </p>
                <p>
                  Olubunmi’s professional work is complemented by service in academic and civic
                  institutions. He has served as Board Secretary of the Institute of Public
                  Administration of Canada (IPAC-Regina Region), Vice President of the Board of the
                  Saskatchewan Council for International Cooperation (SCIC), and a Board Member of
                  SaskCulture, among other roles supporting civic engagement and cultural
                  development.
                </p>
                <p>
                  He remains active in community and cultural life, including serving as a volunteer
                  in his local Church.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
