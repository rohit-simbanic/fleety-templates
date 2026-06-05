import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fleety-saas.com";
  const routes = [
    "",
    "/about",
    "/admin",
    "/blog",
    "/blog/recurving-logic",
    "/blog/parsing-can-telemetry",
    "/blog/gamifying-driver-ops",
    "/blog/reducing-deadhead-miles",
    "/contact",
    "/demo-logistics",
    "/demo-safety",
    "/demo-telematics",
    "/docs",
    "/features",
    "/login",
    "/pricing",
    "/register",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/demo") ? 0.4 : 0.8,
  }));
}
