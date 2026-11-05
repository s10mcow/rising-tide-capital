import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import {
  assertLoopback,
  createCatalogServer,
  listenCatalogServer,
} from "./server.mjs";

const SENTINEL = "SENTINEL-PRICE-991";

test("refuses a public bind address", () => {
  assert.throws(() => assertLoopback("0.0.0.0"), /loopback/);
});

test("withholds reference data until the token is accepted", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "rtc-internal-"));
  const referenceFile = path.join(dir, "reference.json");
  const assetsDir = path.join(dir, "assets");
  await writeFile(
    referenceFile,
    JSON.stringify({
      records: [
        {
          model: "Example",
          referencePrice: SENTINEL,
          referencePriceLabel:
            "Slice of Life Homes reference price — not an RTC quote",
        },
      ],
    }),
  );
  const server = createCatalogServer({
    token: "test-token",
    referenceFile,
    assetsDir,
  });
  const address = await listenCatalogServer(server, {
    host: "127.0.0.1",
    port: 0,
  });
  const base = `http://127.0.0.1:${address.port}`;
  try {
    const denied = await fetch(`${base}/api/reference`);
    const deniedBody = await denied.text();
    assert.equal(denied.status, 401);
    assert.equal(deniedBody.includes(SENTINEL), false);
    assert.equal(deniedBody.includes("Example"), false);

    const loginPage = await fetch(base);
    assert.equal(loginPage.status, 200);
    assert.equal((await loginPage.text()).includes(SENTINEL), false);

    const wrong = await fetch(`${base}/session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "nope" }),
    });
    assert.equal(wrong.status, 401);
    assert.equal((await wrong.text()).includes(SENTINEL), false);

    const signedIn = await fetch(`${base}/session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: "test-token" }),
    });
    assert.equal(signedIn.status, 204);
    const cookie = (signedIn.headers.get("set-cookie") || "").split(";")[0];
    assert.match(signedIn.headers.get("set-cookie") || "", /HttpOnly/);

    const allowed = await fetch(`${base}/api/reference`, {
      headers: { cookie },
    });
    assert.equal(allowed.status, 200);
    assert.equal((await allowed.text()).includes(SENTINEL), true);

    const outside = await fetch(`${base}/assets/../reference.json`, {
      headers: { cookie },
    });
    assert.equal(outside.status, 404);
    assert.equal((await outside.text()).includes(SENTINEL), false);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await rm(dir, { recursive: true, force: true });
  }
});
