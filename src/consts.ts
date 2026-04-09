import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "PdeP Lunes Mañana",
  // EMAIL: "markhorn.dev@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 4,
  // NUM_WORKS_ON_HOMEPAGE: 2,
  // NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Inicio",
  DESCRIPTION: "Bitácora de clases de Paradigmas de Programación - UTN FRBA.",
};

export const BLOG: Metadata = {
  TITLE: "Bitácora",
  DESCRIPTION: "Registro de las clases de Paradigmas de Programación.",
};

// export const WORK: Metadata = {
//   TITLE: "Work",
//   DESCRIPTION: "Where I have worked and what I have done.",
// };

// export const PROJECTS: Metadata = {
//   TITLE: "Projects",
//   DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
// };

export const SOCIALS: Socials = [
  // { 
  //   NAME: "twitter-x",
  //   HREF: "https://twitter.com/markhorn_dev",
  // },
  { 
    NAME: "github",
    HREF: "https://github.com/pdep-lunes"
  },
  {
    NAME: "discord",
    HREF: "https://discord.com",
  },
  { 
    NAME: "pdep.com.ar",
    HREF: "https://www.pdep.com.ar",
  }
];
