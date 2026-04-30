import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Custom proxy endpoint for koma extensions
  app.get("/api/koma/repo/index.min.json", async (req, res) => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch from keiyoushi: ${response.statusText}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch extensions repostiory" });
    }
  });

  // Proxy the icon folder so Koma can load image from relative path
  app.get("/api/koma/repo/icon/:apkname", (req, res) => {
    const { apkname } = req.params;
    const redirectUrl = `https://raw.githubusercontent.com/keiyoushi/extensions/repo/icon/${apkname}`;
    res.redirect(302, redirectUrl);
  });

  // Proxy the apk folder so Koma can download from relative path
  app.get("/api/koma/repo/apk/:apkname", (req, res) => {
    const { apkname } = req.params;
    const redirectUrl = `https://raw.githubusercontent.com/keiyoushi/extensions/repo/apk/${apkname}`;
    res.redirect(302, redirectUrl);
  });

  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
