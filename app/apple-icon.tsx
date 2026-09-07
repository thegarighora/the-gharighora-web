import { ImageResponse } from "next/og";

/** Home-screen icon for iOS. Same mark, larger canvas. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 110,
          fontWeight: 700,
          color: "#f8fafc",
          // Mirrors --gradient-cta in app/theme.css (Satori cannot read CSS vars).
          background:
            "linear-gradient(135deg, #115e59 0%, #0d9488 62%, #d97706 100%)",
        }}
      >
        G
      </div>
    ),
    size
  );
}
