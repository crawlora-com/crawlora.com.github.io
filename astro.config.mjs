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

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ["en"],
		defaultLocale: "en"
	},
	prefetch: true,
	defaultStrategy: "viewport",
	vite: {
		plugins: [VitePWA({
			registerType: "autoUpdate",
			minify: true,
			manifest: await manifest(),
			workbox: {
				globDirectory: 'dist',
				globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
				// Don't fallback on document based (e.g. `/some-page`) requests
				// This removes an errant console.log message from showing up.
				navigateFallback: null
			}
		})]
	},
	site: import.meta.env.DEV ? "http://localhost:4321/" : "https://crawlora.com/",
	integrations: [tailwind(), sitemap(), robotsTxt(), partytown({
		config: {
			forward: ["dataLayer.push"]
		}
	}), react(), compress(), starlight({
		title: "One-Click Website Crawler | Crawlora",
		description: "Effortlessly Crawle from any website with Crawlora. AI-powered, perfect for tech & startups. Get started now!"
	})]
});