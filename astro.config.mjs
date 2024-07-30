import partytown from '@astrojs/partytown';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from 'astro-compress';
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.DEV ? "http://localhost:4321" : "https://dataminer.site/",
  integrations: [tailwind(), sitemap(), robotsTxt(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), react(), compress(),]
});