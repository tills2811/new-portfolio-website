import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shreyash Arali: I take products from an empty repo to production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colours = ["#FF4D2E", "#BFA8FF", "#FFD43B", "#0B5D4B", "#8EC9FF", "#F4D6CC"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fff", padding: 64, gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ fontSize: 30, fontWeight: 700 }}>Shreyash Arali</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.92, letterSpacing: -2 }}>
            I take products from an empty repo to production.
          </div>
          <div style={{ fontSize: 26, color: "#2A2A2A" }}>Full-stack engineer: Next.js, Python, LangGraph</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", width: 420, gap: 12, alignContent: "center" }}>
          {colours.map((c) => (
            <div key={c} style={{ width: 132, height: 165, background: c, borderRadius: 8 }} />
          ))}
        </div>
      </div>
    ),
    size
  );
}
