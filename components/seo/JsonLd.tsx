import { SITE } from "@/lib/site";

/**
 * JSON-LD structured data. Rendered once in the home page so search engines
 * resolve the Person entity, their affiliations and the site itself.
 */
export function JsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    jobTitle: [
      "Acting Director of Strategic Policy and Legislation",
      "Governance & Policy Professional",
    ],
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    knowsAbout: [
      "Public policy",
      "Legislative drafting",
      "Public administration",
      "Governance reform",
      "Civic engagement",
      "Digital equity",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Johnson Shoyama Graduate School of Public Policy, University of Regina",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "National Institute for Legislative and Democratic Studies / University of Benin",
      },
      { "@type": "CollegeOrUniversity", name: "University of Benin" },
      {
        "@type": "EducationalOrganization",
        name: "Transparency International School of Integrity",
      },
    ],
    worksFor: [
      { "@type": "GovernmentOrganization", name: "Government of Saskatchewan" },
    ],
    founder: [
      { "@type": "Organization", name: "The Knights Collective Foundation" },
      { "@type": "Organization", name: "The Policy Roundtable" },
    ],
    sameAs: [
      SITE.socials.linkedin,
      SITE.socials.x,
      SITE.socials.instagram,
      SITE.socials.facebook,
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE.url}/#person` },
  };

  const graph = { "@context": "https://schema.org", "@graph": [person, website] };

  return (
    <script
      type="application/ld+json"
      // Serialized server-side from a local literal — no user input involved.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
