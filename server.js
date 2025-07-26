// Mengimpor modul 'path' dan 'url' untuk menangani path file
import path from 'path';
import { fileURLToPath } from 'url';


import express from 'express';
import cors from 'cors';
// Mengimpor file rute resep
import recipeRoutes from './routes/recipes.js';

// Inisialisasi aplikasi Express
const app = express();
const port = 3001;
// Trik untuk mendapatkan __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // Mengizinkan permintaan dari domain lain (Penting!)
app.use(express.json()); // Mem-parsing body request JSON

// Rute Utama
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Menggunakan rute resep
// Semua permintaan ke /recipes akan ditangani oleh recipeRoutes
app.use('/api', recipeRoutes);

// Menjalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
