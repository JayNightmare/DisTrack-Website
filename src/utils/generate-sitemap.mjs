/**
 * Generates sitemap.xml for a React SPA using ES Modules and static route list.
 * Output is saved in /public/sitemap.xml for GitHub Pages.
 */

import { writeFile } from "fs/promises";
import { resolve } from "path";
import { readdir } from "fs/promises";

const BASE_URL = "https://distrack.nexusgit.info/DisTrack-Website";

const pagesDir = resolve("../pages");
const pageFiles = await readdir(pagesDir);

const routes = pageFiles
    .filter(
        (file) =>
            file.endsWith(".js") ||
            file.endsWith(".jsx") ||
            file.endsWith(".ts") ||
            file.endsWith(".tsx")
    )
    .map((file) => {
        const routeName = file.replace(/\.(js|jsx|ts|tsx)$/, "");
        return routeName === "index" ? "" : routeName;
    })
    .sort();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
      .map((route) => {
          return `
  <url>
    <loc>${BASE_URL}/${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.7"}</priority>
  </url>`;
      })
      .join("")}
</urlset>`;

const filePath = resolve("../../public", "sitemap.xml");

await writeFile(filePath, sitemap.trim(), { encoding: "utf8" });

console.log("✅ sitemap.xml created at:", filePath);
