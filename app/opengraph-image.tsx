import { ImageResponse } from "next/og";

export const alt = "Dheesh Medekar — AI / Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#A1A1AA",
            fontSize: 26,
            letterSpacing: 6,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#F5F5F5",
            }}
          />
          DM._
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              color: "#F5F5F5",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Dheesh Medekar
          </div>
          <div
            style={{
              fontSize: 42,
              color: "#71717A",
              marginTop: 20,
              letterSpacing: -1,
            }}
          >
            AI / LLM · Backend · Full-Stack
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#A1A1AA",
            letterSpacing: 2,
          }}
        >
          Intelligent systems, real-time applications, full-stack products.
        </div>
      </div>
    ),
    size
  );
}
