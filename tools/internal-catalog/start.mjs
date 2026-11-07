import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile, chmod } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCatalogServer, listenCatalogServer } from "./server.mjs";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../internal-catalog-data",
);
const tokenFile = path.join(root, ".token");
const referenceFile = path.join(root, "reference.json");
const assetsDir = path.join(root, "assets");

async function token() {
  if (process.env.RTC_INTERNAL_TOKEN) return process.env.RTC_INTERNAL_TOKEN;
  try {
    const existing = (await readFile(tokenFile, "utf8")).trim();
    if (existing) return existing;
  } catch {
    /* Create a token below. */
  }
  await mkdir(root, { recursive: true });
  const created = randomBytes(32).toString("hex");
  await writeFile(tokenFile, `${created}\n`, { mode: 0o600 });
  await chmod(tokenFile, 0o600);
  return created;
}

const accessToken = await token();
await mkdir(assetsDir, { recursive: true });
const server = createCatalogServer({
  token: accessToken,
  referenceFile,
  assetsDir,
});
const address = await listenCatalogServer(server, {
  host: "127.0.0.1",
  port: Number(process.env.PORT || 4317),
});
console.log(
  `Internal catalog listening on http://127.0.0.1:${address.port} (loopback only).`,
);
console.log(`Token file: ${tokenFile}`);
console.log("The token is not printed. Read that file locally to sign in.");
