import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanent (308) redirects from URLs of the previous static site that
  // were in its sitemap / search index, to their current equivalents.
  async redirects() {
    return [
      { source: "/en/oferta", destination: "/en/services", permanent: true },
      { source: "/en/oferta.html", destination: "/en/services", permanent: true },
      { source: "/o-nas", destination: "/o-studiu", permanent: true },
      { source: "/privacy-policy", destination: "/en/privacy-policy", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/en.html", destination: "/en", permanent: true },
      { source: "/oferta.html", destination: "/oferta", permanent: true },
      { source: "/realizacje.html", destination: "/realizacje", permanent: true },
      { source: "/o-nas.html", destination: "/o-studiu", permanent: true },
      { source: "/kontakt.html", destination: "/kontakt", permanent: true },
      { source: "/polityka-prywatnosci.html", destination: "/polityka-prywatnosci", permanent: true },
      { source: "/privacy-policy.html", destination: "/en/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
