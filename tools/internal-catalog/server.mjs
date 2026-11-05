import { createServer } from "node:http";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const COOKIE = "rtc_internal";
const PRICE_LABEL = "Slice of Life Homes reference price — not an RTC quote";

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <title>Internal reference sign-in</title>
</head>
<body>
  <h1>Internal reference</h1>
  <p>This catalog is for local study. It is not a public Rising Tide quote.</p>
  <form id="login">
    <label>Access token <input name="token" type="password" autocomplete="current-password" required></label>
    <button type="submit">Continue</button>
  </form>
  <p id="error" role="alert"></p>
  <script>
    document.getElementById("login").addEventListener("submit", async (event) => {
      event.preventDefault();
      const token = new FormData(event.currentTarget).get("token");
      const response = await fetch("/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        document.getElementById("error").textContent = "That token was not accepted.";
        return;
      }
      location.assign("/");
    });
  </script>
</body>
</html>`;

function parseCookies(header) {
  const cookies = {};
  for (const part of String(header || "").split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    cookies[part.slice(0, index).trim()] = part.slice(index + 1).trim();
  }
  return cookies;
}

function tokensMatch(given, expected) {
  const left = Buffer.from(String(given));
  const right = Buffer.from(String(expected));
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

function readBody(request, limit = 4096) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("body too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function unauthorized(response) {
  response.writeHead(401, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify({ error: "unauthorized" }));
}

export function createCatalogServer({ token, referenceFile, assetsDir }) {
  if (!token) throw new Error("Internal catalog token is required");
  const sessions = new Set();
  const assetsRoot = path.resolve(assetsDir);

  function isSignedIn(request) {
    const sessionId = parseCookies(request.headers.cookie)[COOKIE];
    return Boolean(sessionId && sessions.has(sessionId));
  }

  return createServer(async (request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    try {
      if (request.method === "POST" && url.pathname === "/session") {
        const raw = await readBody(request);
        let given = "";
        try {
          given = JSON.parse(raw).token || "";
        } catch {
          given = "";
        }
        if (!tokensMatch(given, token)) {
          unauthorized(response);
          return;
        }
        const sessionId = randomBytes(32).toString("hex");
        sessions.add(sessionId);
        response.writeHead(204, {
          "set-cookie": `${COOKIE}=${sessionId}; HttpOnly; SameSite=Strict; Path=/`,
          "cache-control": "no-store",
        });
        response.end();
        return;
      }

      if (!isSignedIn(request)) {
        if (
          request.method === "GET" &&
          (url.pathname === "/login" || url.pathname === "/")
        ) {
          response.writeHead(200, {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-store",
          });
          response.end(LOGIN_HTML);
          return;
        }
        unauthorized(response);
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/reference") {
        const data = await readFile(referenceFile);
        response.writeHead(200, {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        });
        response.end(data);
        return;
      }

      if (request.method === "GET" && url.pathname.startsWith("/assets/")) {
        const relative = decodeURIComponent(url.pathname.slice("/assets/".length));
        const full = path.resolve(assetsRoot, relative);
        if (full !== assetsRoot && !full.startsWith(`${assetsRoot}${path.sep}`)) {
          response.writeHead(404, { "cache-control": "no-store" });
          response.end();
          return;
        }
        try {
          const file = await readFile(full);
          response.writeHead(200, { "cache-control": "private, no-store" });
          response.end(file);
        } catch {
          response.writeHead(404, { "cache-control": "no-store" });
          response.end();
        }
        return;
      }

      if (request.method === "GET" && url.pathname === "/") {
        response.writeHead(200, {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        });
        response.end(appHtml());
        return;
      }

      response.writeHead(404, { "cache-control": "no-store" });
      response.end();
    } catch {
      response.writeHead(400, { "cache-control": "no-store" });
      response.end();
    }
  });
}

function appHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <title>Internal floor-plan reference</title>
</head>
<body>
  <h1>Internal floor-plan reference</h1>
  <p>${PRICE_LABEL}</p>
  <p>Not a Rising Tide quote. Images and prices, when present, are copied from the cited public page for internal study only. This copy does not grant permission to publish them.</p>
  <p id="status">Loading.</p>
  <div id="list"></div>
  <script>
    fetch("/api/reference", { credentials: "same-origin" }).then(async (response) => {
      if (response.status === 401) {
        location.assign("/login");
        return;
      }
      const data = await response.json();
      const records = data.records || [];
      const priced = records.filter((item) => item.referencePrice != null).length;
      document.getElementById("status").textContent =
        records.length + " reference records. " + priced + " have a retrieved reference price.";
      document.getElementById("list").textContent = JSON.stringify(records, null, 2);
    });
  </script>
</body>
</html>`;
}

export function assertLoopback(host) {
  if (host !== "127.0.0.1" && host !== "::1") {
    throw new Error("Internal catalog server refuses non-loopback hosts");
  }
}

export function listenCatalogServer(server, { host = "127.0.0.1", port = 0 } = {}) {
  assertLoopback(host);
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      resolve(server.address());
    });
  });
}
