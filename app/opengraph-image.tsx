import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card in the portfolio's palette. Swap for a designed image whenever you like. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ECECE8",
        color: "#0F1012",
        padding: 72,
      }}
    >
      <div style={{ fontSize: 30, color: "#46484D" }}>{site.location}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 44, color: "#2536FF", marginTop: 28 }}>{site.title}</div>
      </div>
      <div style={{ height: 8, width: 160, background: "#2536FF" }} />
    </div>,
    size,
  );
}
