import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import AdmZip from "adm-zip";

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("✅ Image Tool API is Running Successfully!");
});

// 🧠 Image Format Convert (JPG ⇄ PNG)
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const outputPath = `converted-${Date.now()}.png`;
    await sharp(filePath).png().toFile(outputPath);
    res.download(outputPath, () => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    res.status(500).send("❌ Conversion Failed");
  }
});

// 📦 File Compress
app.post("/compress", upload.single("file"), async (req, res) => {
  try {
    const zip = new AdmZip();
    zip.addLocalFile(req.file.path);
    const output = `compressed-${Date.now()}.zip`;
    zip.writeZip(output);
    res.download(output, () => {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(output);
    });
  } catch (err) {
    res.status(500).send("❌ Compression Failed");
  }
});

// 🌄 Background Remove (Demo placeholder)
app.post("/remove-bg", upload.single("file"), async (req, res) => {
  res.json({ message: "Background remove feature coming soon 🚀" });
});

// 🖼️ Upscale Image (Demo placeholder)
app.post("/upscale", upload.single("file"), async (req, res) => {
  res.json({ message: "Upscale feature coming soon 🚀" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
