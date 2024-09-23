import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Crawlora",
  tagline: "Find data from at scale",
  description: "Crawlora provides powerful web scraping solutions to quickly and efficiently gather data from websites. Streamline your data collection process with our easy-to-use tools.",
  description_short: "Efficient web scraping made simple with Crawlora’s robust data extraction tools.",
  url: "https://Crawlora.com",
  author: "Dharmendra Soni",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: : Find data at scale`,
  description: SITE.description,
  image: ogImageSrc,
};
