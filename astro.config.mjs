import partytown from '@astrojs/partytown';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from 'astro-compress';
import robotsTxt from "astro-robots-txt";
import {
	defineConfig
} from "astro/config";
import {
	VitePWA
} from "vite-plugin-pwa";
import {
	manifest
} from './src/utils/seoConfig';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				minify: true,
				manifest: await manifest(),
				workbox: {
					globDirectory: 'dist',
					globPatterns: [
						'**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}',
					],
					// Don't fallback on document based (e.g. `/some-page`) requests
					// This removes an errant console.log message from showing up.
					navigateFallback: null,
				},
			})
		]
	},
	site: import.meta.env.DEV ? "http://localhost:4321" : "https://dataminer.site/",
	integrations: [tailwind(), sitemap(), robotsTxt(), partytown({
		config: {
			forward: ["dataLayer.push"]
		}
	}), react(), compress(), ]
});