import express from "express";
import multer from "multer";
import sharp from "sharp";
import fetch from "node-fetch";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
const app = express();

// Convert / Compress
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const file = req.file.path;
    const format = req.body.format || "webp";
    const quality = parseInt(req.body.quality || 80);
    const buffer = await sharp(file).toFormat(format, { quality }).toBuffer();
    res.type("image/" + format).send(buffer);
    fs.unlinkSync(file);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error converting file");
  }
});

// Placeholder routes (for now)
app.post("/remove-bg", upload.single("file"), (req, res) => {
  res.status(501).send("Remove BG feature coming soon");
});

app.post("/upscale", upload.single("file"), (req, res) => {
  res.status(501).send("Upscale feature coming soon");
});

app.get("/", (req, res) => res.send("Image Tools API Running ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
