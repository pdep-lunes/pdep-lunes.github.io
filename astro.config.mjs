import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const wollokGrammar = JSON.parse(
  readFileSync(join(__dirname, "src/shiki/wollok.tmLanguage.json"), "utf-8")
);

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      langs: [wollokGrammar],
      wrap: true,
      transformers: [
        {
          name: "language-tag",
          pre(node) {
            const lang = this.options.lang;
            if (lang && lang !== "plaintext" && lang !== "text" && lang !== "") {
              node.properties["data-language"] = lang;
            }
          },
        },
      ],
    },
  },
});
