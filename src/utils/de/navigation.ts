
const navBarLinks = [
  { name: "Accueil", url: "/de" },
  { name: "Produits", url: "/de/products" },
  { name: "Services", url: "/de/services" },
  { name: "Blog", url: "/de/blog" },
  { name: "Contact", url: "/de/contact" },
];

const footerLinks = [
  {
    section: "Écosystème",
    links: [
      { name: "Documentation", url: "/de/welcome-to-docs/" },
      { name: "Outils et Équipements", url: "/de/products" },
      { name: "Services de Construction", url: "/de/services" },
    ],
  },
  {
    section: "Société",
    links: [
      { name: "À propos de nous", url: "#" },
      { name: "Blog", url: "/de/blog" },
      { name: "Carrières", url: "#" },
      { name: "Clients", url: "#" },
    ],
  },
];

const socialLinks = {
  facebook: "#",
  x: "#",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "#",
  slack: "#",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};