import { ImageResponse } from "next/og";

/** Favicon, generated from the brand mark so there is no binary asset to keep in sync. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#f8fafc",
          // Mirrors --gradient-cta in app/theme.css (Satori cannot read CSS vars).
          background:
            "linear-gradient(135deg, #115e59 0%, #0d9488 62%, #d97706 100%)",
          borderRadius: 7,
        }}
      >
        G
      </div>
    ),
    size
  );
}
