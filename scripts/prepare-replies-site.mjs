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
const guestRegistry = readFileSync(resolve(project, "lib/guests.json"), "utf8");
const invitations = readFileSync(resolve(project, "services/invitations.mjs"), "utf8").replace(/import partyGuests[^;]*;/, "const partyGuests = " + guestRegistry + ";").replace("export async function handleInvitations", "async function handleInvitations");
const relay = readFileSync(resolve(project, "services/replies-relay.mjs"), "utf8").replace(`import { handleInvitations } from "./invitations.mjs";`, "");
writeFileSync(join(output, "worker/index.js"), "const siteAssets = " + JSON.stringify(assets) + ";\n" + invitations + "\n" + relay);
function copyMigrations(directory, target) { mkdirSync(target, { recursive: true }); for (const entry of readdirSync(directory, { withFileTypes: true })) { const from = join(directory, entry.name), to = join(target, entry.name); if (entry.isDirectory()) copyMigrations(from, to); else copyFileSync(from, to); } }
copyMigrations(resolve(project, "drizzle"), join(output, "drizzle"));
console.log("Prepared public preview and shared replies from docs/.");
