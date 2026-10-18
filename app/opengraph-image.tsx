import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} | ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card in the portfolio's palette. Everything important sits in the centre 630×630 square,
 * because WhatsApp and some other apps crop the card to a square from the middle; the wide version
 * (LinkedIn, Slack, X) also shows a short location in the top-left corner.
 */
export default function OpengraphImage() {
  const [first, ...rest] = site.name.split(" ");
  const host = site.url.replace(/^https?:\/\//, "");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#ECECE8",
        color: "#0F1012",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 116,
          fontWeight: 600,
          letterSpacing: -5,
          lineHeight: 0.95,
        }}
      >
        <div>{first}</div>
        <div>{rest.join(" ")}</div>
      </div>
      <div style={{ height: 6, width: 96, background: "#2536FF", marginTop: 40 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: 34,
          color: "#2536FF",
          marginTop: 30,
          lineHeight: 1.25,
        }}
      >
        {site.title.split(" / ").map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
      {/* Short enough to stay fully outside the centre square, so a square crop never cuts it. */}
      <div style={{ position: "absolute", left: 64, top: 56, fontSize: 24, color: "#46484D" }}>
        Accra, Ghana
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          fontSize: 22,
          color: "#46484D",
        }}
      >
        {host}
      </div>
    </div>,
    size,
  );
}
