import express from 'express';
// Mengimpor data dari db.js
import db from '../db.js';

// Membuat router baru
const router = express.Router();

// Rute untuk mendapatkan SEMUA resep
// Endpoint: GET /recipes
router.get('/', (req, res) => {
  res.json(db);
});

// Rute untuk mendapatkan SATU resep berdasarkan ID
// Endpoint: GET /recipes/1, /recipes/2, dst.
router.get('/:id', (req, res) => {
  // Mengambil ID dari parameter URL dan mengubahnya menjadi angka
  const recipeId = parseInt(req.params.id, 10);
  
  // Mencari resep di dalam database
  const recipe = db.data.find(r => r.id === recipeId);

  if (recipe) {
    // Jika resep ditemukan, kirim sebagai respons
    res.json(recipe);
  } else {
    // Jika tidak ditemukan, kirim status 404 Not Found
    res.status(404).json({ message: 'Resep tidak ditemukan' });
  }
});

// Mengekspor router agar bisa digunakan di server.js
export default router;
