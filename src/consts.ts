import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "PdeP Lunes Mañana",
  // EMAIL: "markhorn.dev@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 4,
  // NUM_WORKS_ON_HOMEPAGE: 2,
  // NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "PdeP Lunes Mañana",
};

export const BLOG: Metadata = {
  TITLE: "Bitácora",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
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
