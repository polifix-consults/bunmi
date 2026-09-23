import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${SITE.name} | ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Editorial OG card rendered at build time — cream canvas, charcoal grotesque
 * wordmark and the maroon accent rule, mirroring the site's masthead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F1E6",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#57514A",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Public Policy · Governance
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              color: "#211D17",
              fontWeight: 700,
              letterSpacing: "-0.035em",
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              marginTop: 28,
              width: 120,
              height: 3,
              background: "#7A2135",
            }}
          />
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#57514A",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 900,
            }}
          >
            {SITE.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8A8276",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <span>Legislative Draftsman · Policy Analyst · Author</span>
          <span>{SITE.locations}</span>
        </div>
      </div>
    ),
    size,
  );
}
