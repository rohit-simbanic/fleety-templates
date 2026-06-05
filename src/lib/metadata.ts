import type { Metadata } from "next";

interface MetadataInput {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
}

export function getSiteMetadata({
  title = "Next-Gen Fleet Management & Smart Logistics",
  description = "Accelerate your fleet operations. We blend strategy, design, and AI to create impactful logistics solutions that drive growth.",
  keywords = ["fleet management", "logistics SaaS", "smart routing", "driver tracking", "telemetry analytics"],
  path = "",
}: MetadataInput = {}): Metadata {
  const formattedTitle = title.includes("Fleety") ? title : `${title} | Fleety`;
  const url = `https://fleety-saas.com${path}`;

  return {
    title: formattedTitle,
    description,
    keywords,
    openGraph: {
      title: formattedTitle,
      description,
      type: "website",
      siteName: "Fleety SaaS",
      locale: "en_US",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
    },
  };
}
