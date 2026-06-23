import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- ENSURE THIS LINE IS EXACTLY HERE
  images: {
    unoptimized: true,
  },
  /* keep any other configuration lines you have here unchanged */
};

export default nextConfig;


//import type { NextConfig } from "next";

//const nextConfig: NextConfig = {
//  output: 'export', // <-- ENSURE THIS LINE IS EXACTLY HERE
//  /* keep any other configuration lines you have here unchanged */
//};

//export default nextConfig;

------------------------------------

//import type { NextConfig } from "next";

//const nextConfig: NextConfig = {
//  images: {
//    remotePatterns: [
//      { protocol: "https", hostname: "images.unsplash.com" },
//    ],
//  },
//};

//export default nextConfig;
