import type { ManifestOptions } from "vite-plugin-pwa";
import { getLandingData } from "../services/data.service";

/**
 * Defines the configuration for PWA webmanifest.
 */
export const manifest = async (): Promise<Partial<ManifestOptions>> => {
  const data = await getLandingData();
  return {
    name: data.meta.title, // Change this to your website's name.
    short_name: data.meta.shortname, // Change this to your website's short name.
    description: data.meta.description, // Change this to your websites description.
    theme_color: "#ffffff", // Change this to your primary color.
    background_color: "#ffffff", // Change this to your background color.
    display: "standalone",
	screenshots: [
		{
			src: "/landing_page.webp",
			type: "image/webp",
			sizes: "1922x957"
		}
	],
    icons: [
      {
        src: "/favicons/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/favicons/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicons/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/favicons/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicons/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
};
