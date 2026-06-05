declare module "next-pwa" {
  import { NextConfig } from "next";

  function withPWA(config: any): (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}

declare module "next-pwa/cache" {
  const cache: any[];
  export default cache;
}
