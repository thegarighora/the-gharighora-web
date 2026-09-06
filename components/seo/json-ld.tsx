/**
 * Renders schema.org JSON-LD into the page.
 *
 * A plain <script type="application/ld+json"> is used rather than next/script:
 * structured data must be present in the server-rendered HTML for crawlers that
 * do not execute JavaScript. The payload is our own data (never user input), so
 * there is nothing untrusted to escape here beyond closing-tag safety.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // `<` is escaped so a stray "</script>" in a string can never break out.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
