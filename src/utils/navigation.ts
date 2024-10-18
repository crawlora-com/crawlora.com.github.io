// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Apps", url: "/apps" },
  { name: "Services", url: "/services" },
  { name: "Pricing", url: "/pricing" },
  { name: "Blog", url: "/blog" },
  { name: "Contact", url: "/contact" },
  {
    name: "Login",
    url: "https://app.crawlora.com?cta=homepage-header-login-btn",
  },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Ecosystem",
    links: [
      { name: "Documentation", url: "/welcome-to-docs/" },
      { name: "Apps", url: "/apps" },
      {
        name: "Api Doc",
        url: "https://apidoc.crawlora.com/?cta=homepage-footer",
      },
    ],
  },
  {
    section: "Info",
    links: [
      { name: "Use Cases", url: "#" },
      { name: "Blog", url: "/blog" },
      { name: "FAQs", url: "/faq" },
      { name: "Customers", url: "#" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  // facebook: "https://www.facebook.com/",
  x: "https://x.com/crawlora",
  github: "https://github.com/crawlora-com",
  // google: "https://www.google.com/",
  slack:
    "https://join.slack.com/t/dataminer-site/shared_invite/zt-2lvmboppf-FPPVWGwXDz6YAaLC5aYGTg",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
