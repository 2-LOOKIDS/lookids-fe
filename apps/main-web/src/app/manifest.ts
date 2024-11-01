import type { MetadataRoute } from "next";

export default function mainfest(): MetadataRoute.Manifest {
  return {
    name: "반려인을 위한 SNS, Lookids",
    short_name: "Lookids",
    description: "반려인을 위한 SNS, Lookids",
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    icons: [
      {
        src: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
