import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const readPageData = (pageNumber) => {
  const filePath = path.join(__dirname, '..', 'data', `${pageNumber}.json`);
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  }
  return null;
};


router.get('/:page', (req, res) => {
  const paintingId = req.params.page;

  const painting = readPageData(paintingId);

  if (painting) {
    res.json(painting);
  } else {
    res.status(404).json({ message: 'vocab tidak ditemukan' });
  }
});

// Endpoint default (mengarah ke halaman 1)
// Contoh: /paintings
router.get('/', (req, res) => {
  const data = readPageData(1);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'Data halaman pertama tidak ditemukan.' });
  }
});

export default router;
