import type { Plugin } from "vite";
import { loadEnv } from "vite";

export function apiPlugin(): Plugin {
  return {
    name: "vite-plugin-api",
    configureServer(server) {
      // Load environment variables - loadEnv with empty prefix loads all vars
      const env = loadEnv(server.config.mode, process.cwd(), "");

      // Also try loading with explicit prefix to catch all variations
      const envWithPrefix = loadEnv(server.config.mode, process.cwd(), "VITE_");

      // Merge all environment variables
      const allEnv = { ...env, ...envWithPrefix };

      // Set environment variables globally for the API handler
      Object.keys(allEnv).forEach((key) => {
        process.env[key] = allEnv[key];
      });

      // Log to verify API key is loaded (remove in production)
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (apiKey) {
        // Remove quotes if present
        const cleanKey = apiKey.replace(/^["']|["']$/g, "");
        process.env.ANTHROPIC_API_KEY = cleanKey;
        console.log(
          "✓ ANTHROPIC_API_KEY loaded (length:",
          cleanKey.length,
          ")",
        );
      } else {
        console.warn("⚠ ANTHROPIC_API_KEY not found in environment variables");
        console.warn(
          "Available env keys:",
          Object.keys(allEnv).filter(
            (k) => k.includes("API") || k.includes("KEY"),
          ),
        );
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/")) {
          try {
            // Ensure env vars are set before loading module (re-set to be safe)
            Object.keys(allEnv).forEach((key) => {
              const value = allEnv[key];
              // Remove quotes if present
              process.env[key] =
                typeof value === "string"
                  ? value.replace(/^["']|["']$/g, "")
                  : value;
            });

            // Use Vite's SSR module loader to properly handle TypeScript
            const apiModule = await server.ssrLoadModule(
              "/api/generate-recipe.ts",
            );

            // Create a Request-like object
            const url = new URL(req.url, `http://${req.headers.host}`);
            const body = await new Promise<string>((resolve) => {
              let data = "";
              req.on("data", (chunk) => {
                data += chunk.toString();
              });
              req.on("end", () => resolve(data));
            });

            // Convert Node.js headers to Web API format
            const headers: Record<string, string> = {};
            Object.entries(req.headers).forEach(([key, value]) => {
              if (value !== undefined) {
                headers[key] = Array.isArray(value) ? value.join(", ") : value;
              }
            });

            const request = new Request(url.toString(), {
              method: req.method || "GET",
              headers: headers,
              body: body || undefined,
            });

            let response: Response;
            if (req.method === "POST") {
              response = await apiModule.POST(request);
            } else if (req.method === "OPTIONS") {
              response = await apiModule.OPTIONS();
            } else {
              res.writeHead(405);
              res.end("Method not allowed");
              return;
            }

            // Send response
            res.writeHead(
              response.status,
              Object.fromEntries(response.headers),
            );
            const text = await response.text();
            res.end(text);
          } catch (error) {
            console.error("API error:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
          }
        } else {
          next();
        }
      });
    },
  };
}
