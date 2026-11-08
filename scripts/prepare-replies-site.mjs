import { mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, relative, extname, join } from "node:path";

const project = process.cwd();
const output = resolve(project, "outputs/reponses-relay");
const docs = resolve(project, "docs");
const assets = {};
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml" };
function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (types[extname(file)]) assets["/" + relative(docs, file).replaceAll("\\", "/")] = { content: readFileSync(file, "utf8"), type: types[extname(file)] };
  }
}
collect(docs);
mkdirSync(join(output, "worker"), { recursive: true });
mkdirSync(join(output, ".openai"), { recursive: true });
copyFileSync(resolve(project, "services/replies-hosting.json"), join(output, ".openai/hosting.json"));
writeFileSync(join(output, "worker/index.js"), "const siteAssets = " + JSON.stringify(assets) + ";\n" + readFileSync(resolve(project, "services/replies-relay.mjs"), "utf8"));
console.log("Prepared public preview and shared replies from docs/.");
