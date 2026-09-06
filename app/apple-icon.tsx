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
          color: "#fbfefe",
          // Mirrors --gradient-cta in app/theme.css (Satori cannot read CSS vars).
          background: "linear-gradient(135deg, #0f4a56 0%, #1d6b78 45%, #e8842a 100%)",
        }}
      >
        G
      </div>
    ),
    size
  );
}
